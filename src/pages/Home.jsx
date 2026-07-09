import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitFork, Github, Pause, Play, Star } from "lucide-react";

const MotionButton = motion.button;
const MotionDiv = motion.div;
const MotionH1 = motion.h1;

const GITHUB_REPOS_URL =
  "https://api.github.com/users/magicjulio/repos?sort=updated&per_page=100";

const hiddenRepoNames = new Set(["magicjulio", "magicjulio.github.io"]);
const CELL_SIZE = 10;
const CONWAY_TICK_MS = 140;
const NAME_RANDOM_FILL = 0.08;

const letterPatterns = {
  J: ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
};

function formatRepoName(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function cellKey(col, row) {
  return `${col},${row}`;
}

function parseCellKey(key) {
  return key.split(",").map(Number);
}

function createJuliusSeed(cols, rows) {
  const name = "JULIUS";
  const scale = cols > 90 ? 3 : 2;
  const letterWidth = 5 * scale;
  const letterHeight = 7 * scale;
  const letterGap = scale;
  const nameWidth = name.length * letterWidth + (name.length - 1) * letterGap;
  const startCol = Math.floor((cols - nameWidth) / 2);
  const startRow = Math.floor((rows - letterHeight) / 2);
  const cells = new Set();

  [...name].forEach((letter, letterIndex) => {
    const pattern = letterPatterns[letter];
    const letterOffset = letterIndex * (letterWidth + letterGap);

    pattern.forEach((line, y) => {
      [...line].forEach((value, x) => {
        if (value !== "1") return;

        for (let dy = 0; dy < scale; dy += 1) {
          for (let dx = 0; dx < scale; dx += 1) {
            cells.add(
              cellKey(
                startCol + letterOffset + x * scale + dx,
                startRow + y * scale + dy
              )
            );
          }
        }
      });
    });
  });

  const noisePadding = 7 * scale;
  for (let row = startRow - noisePadding; row < startRow + letterHeight + noisePadding; row += 1) {
    for (let col = startCol - noisePadding; col < startCol + nameWidth + noisePadding; col += 1) {
      if (
        col >= 0 &&
        row >= 0 &&
        col < cols &&
        row < rows &&
        Math.random() < NAME_RANDOM_FILL
      ) {
        cells.add(cellKey(col, row));
      }
    }
  }

  return cells;
}

function getNextGeneration(cells, cols, rows) {
  const neighborCounts = new Map();

  cells.forEach((key) => {
    const [col, row] = parseCellKey(key);

    for (let y = row - 1; y <= row + 1; y += 1) {
      for (let x = col - 1; x <= col + 1; x += 1) {
        if ((x === col && y === row) || x < 0 || y < 0 || x >= cols || y >= rows) {
          continue;
        }

        const neighborKey = cellKey(x, y);
        neighborCounts.set(neighborKey, (neighborCounts.get(neighborKey) || 0) + 1);
      }
    }
  });

  const nextCells = new Set();

  neighborCounts.forEach((count, key) => {
    if (count === 3 || (count === 2 && cells.has(key))) {
      nextCells.add(key);
    }
  });

  return nextCells;
}

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const [conwayRunning, setConwayRunning] = useState(false);
  const [conwayStarted, setConwayStarted] = useState(false);
  const [conwayGeneration, setConwayGeneration] = useState(0);
  const canvasRef = useRef(null);
  const conwayCellsRef = useRef(new Set());
  const conwaySizeRef = useRef({ cols: 0, rows: 0 });

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const drawConway = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const { width, height } = canvas.getBoundingClientRect();

    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(34, 211, 238, 0.62)";

    conwayCellsRef.current.forEach((key) => {
      const [col, row] = parseCellKey(key);
      context.fillRect(col * CELL_SIZE + 1, row * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });
  }, []);

  const resizeConwayCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const context = canvas.getContext("2d");
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.ceil(width / CELL_SIZE);
    const rows = Math.ceil(height / CELL_SIZE);
    conwaySizeRef.current = { cols, rows };

    if (conwayStarted) {
      conwayCellsRef.current = createJuliusSeed(cols, rows);
      setConwayGeneration(0);
    }

    drawConway();
  }, [conwayStarted, drawConway]);

  const startConway = useCallback(() => {
    const { cols, rows } = conwaySizeRef.current;
    conwayCellsRef.current = createJuliusSeed(cols, rows);
    setConwayGeneration(0);
    setConwayStarted(true);
    setConwayRunning(true);
    requestAnimationFrame(drawConway);
  }, [drawConway]);

  const toggleConway = () => {
    if (conwayRunning) {
      setConwayRunning(false);
      return;
    }

    if (!conwayStarted) {
      startConway();
      return;
    }

    setConwayRunning(true);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProjects() {
      try {
        const response = await fetch(GITHUB_REPOS_URL, {
          signal: controller.signal,
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!response.ok) {
          throw new Error("GitHub repositories could not be loaded.");
        }

        const repos = await response.json();
        const visibleRepos = repos
          .filter(
            (repo) =>
              !repo.archived && !repo.fork && !hiddenRepoNames.has(repo.name)
          )
          .map((repo) => ({
            id: repo.id,
            title: formatRepoName(repo.name),
            name: repo.name,
            description: repo.description || "Open source project on GitHub.",
            language: repo.language,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updatedAt: repo.pushed_at || repo.updated_at,
            repoUrl: repo.html_url,
            homepage: repo.homepage,
          }));

        setProjects(visibleRepos);
      } catch (error) {
        if (error.name !== "AbortError") {
          setProjectsError("Could not load GitHub projects right now.");
        }
      } finally {
        setProjectsLoading(false);
      }
    }

    fetchProjects();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    resizeConwayCanvas();
    window.addEventListener("resize", resizeConwayCanvas);

    return () => window.removeEventListener("resize", resizeConwayCanvas);
  }, [resizeConwayCanvas]);

  useEffect(() => {
    if (!conwayRunning) return undefined;

    const interval = window.setInterval(() => {
      const { cols, rows } = conwaySizeRef.current;
      const nextCells = getNextGeneration(conwayCellsRef.current, cols, rows);
      conwayCellsRef.current =
        nextCells.size > 0 ? nextCells : createJuliusSeed(cols, rows);
      setConwayGeneration((generation) => generation + 1);
      drawConway();
    }, CONWAY_TICK_MS);

    return () => window.clearInterval(interval);
  }, [conwayRunning, drawConway]);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden flex flex-col justify-center items-center text-center px-4">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-80"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gray-950/20" />
        <div className="relative z-10 flex flex-col items-center">
        <MotionH1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-cyan-400"
        >
          Hi, I'm <span className="text-white">Julius</span>
        </MotionH1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl">
          I Study <span className="text-cyan-400">Computer Science</span> at LUH .
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <MotionButton
      onClick={() => scrollToSection("projects")}
      className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl shadow-lg transition"
    >
      View My Work
</MotionButton>
          <MotionButton
            onClick={toggleConway}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-700/60 bg-gray-900/80 px-6 py-3 text-cyan-100 shadow-lg backdrop-blur-sm transition hover:border-cyan-400 hover:bg-gray-800"
            whileTap={{ scale: 0.98 }}
            aria-pressed={conwayRunning}
          >
            {conwayRunning ? <Pause size={18} /> : <Play size={18} />}
            {conwayRunning ? "Pause Conway" : "Play Conway"}
          </MotionButton>
        </div>
        {conwayStarted && (
          <span className="mt-4 text-sm text-gray-400">
            Generation {conwayGeneration}
          </span>
        )}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen bg-gray-900 px-6 py-16 flex items-center"
      >
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
            About Me
          </h2>
          <div className="space-y-5 text-left text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
            <p>
              Hi, Ich bin Julius, 19 Jahre alt. Ich finde Computer interessant
              und außerdem das Konzept von About Me seiten merkwürdig. Ich soll
              hier in ein paar sätzen einfach meine gesamte Exsitenz
              zusammenfassen? Ist das nicht etwas reduktionistisch?
            </p>
            <div>
              <p>
                Hier ist eine Liste an anderen Dingen außer Computern die ich
                Interessant finde:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-cyan-400">
                <li>Friedrich Nietzsche</li>
                <li>Filme von Christopher Nolan</li>
                <li>
                  Die Tatsache das Algorithmen Pizza und Sushi unterscheiden
                  können
                </li>
                <li>Katzen</li>
                <li>Terror Managment Theorie und Psychoanalyse</li>
                <li>Den Urknall</li>
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-cyan-400">
              Open Todos for this Website
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-300 sm:text-base marker:text-cyan-400">
              <li>Add Dark/Light Mode Toggle</li>
              <li>Englisch Deutsch Mode Toggle</li>
              <li>Convert Images to .webp</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen px-6 py-16 scroll-mt-16">
        <div className="mx-auto mb-10 flex max-w-6xl flex-col gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">Projects</h2>
            <p className="mt-2 text-gray-400">
              Public GitHub repositories, loaded automatically.
            </p>
          </div>
          <a
            href="https://github.com/magicjulio?tab=repositories"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm hover:border-cyan-700 hover:text-cyan-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} /> All repos
          </a>
        </div>

        {projectsLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-h-64 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg"
              >
                <div className="h-6 w-2/3 rounded bg-gray-800" />
                <div className="mt-5 space-y-3">
                  <div className="h-4 rounded bg-gray-800" />
                  <div className="h-4 w-5/6 rounded bg-gray-800" />
                  <div className="h-4 w-3/4 rounded bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {projectsError && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6 text-center">
            <p className="text-gray-300">{projectsError}</p>
            <a
              href="https://github.com/magicjulio?tab=repositories"
              className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open GitHub repositories <ExternalLink size={16} />
            </a>
          </div>
        )}

        {!projectsLoading && !projectsError && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {projects.map((project) => (
            <MotionDiv
              key={project.id}
              whileHover={{ y: -4 }}
              className="flex min-h-64 flex-col rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition hover:border-cyan-700/40 hover:shadow-cyan-500/20"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-gray-100">{project.title}</h3>
                {project.language && (
                  <span className="shrink-0 rounded-full border border-cyan-700/40 bg-cyan-900/30 px-2 py-1 text-xs text-cyan-200">
                    {project.language}
                  </span>
                )}
              </div>
              <p className="mt-3 flex-1 text-gray-400">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <Star size={15} /> {project.stars}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork size={15} /> {project.forks}
                </span>
                <span>Updated {formatDate(project.updatedAt)}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={project.repoUrl}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Code <ExternalLink size={16} />
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-cyan-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </MotionDiv>
          ))}
        </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-900 px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">Contact Me</h2>
        <p className="text-gray-300 mb-4">Open to Work</p>
        <a
          href="mailto:julius@grossero.de"
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 !text-white rounded-2xl shadow-lg transition"
        >
          Send Email
        </a>
        <div className="flex space-x-6 mt-6">
          <a href="https://github.com/magicjulio" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">GitHub</a>
          <a href="https://www.linkedin.com/in/julius-grosserode-20219b222/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">LinkedIn</a>
        </div>
      </section>
    </>
  );
}
