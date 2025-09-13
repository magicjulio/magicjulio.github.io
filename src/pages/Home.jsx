import { motion } from "framer-motion";

export default function Home() {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-cyan-400"
        >
          Hi, I'm <span className="text-white">Julius</span>
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl">
          I Study <span className="text-cyan-400">Computer Science</span> at LUH .
        </p>
        <motion.button
      onClick={() => scrollToSection("projects")}
      className="mt-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl shadow-lg transition"
    >
      View My Work
</motion.button>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex flex-col justify-center items-center px-6 py-16 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">About Me</h2>
        <p className="text-gray-300 max-w-2xl text-center text-lg">
          I'm passionate about Machine Learning, Ethical Hacking and much more.
          I love building projects that make a difference and continuously learning new technologies.
        </p>
        <ul><h3 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-cyan-400">Open Todos for this Website</h3>
          <li className="text-gray-300 text-lg">- Add Dark/Light Mode Toggle</li>
          <li className="text-gray-300 text-lg">- Englisch Deutsch Mode Toggle</li>
          <li className="text-gray-300 text-lg">- Add Projects</li>
          <li className="text-gray-300 text-lg">- Convert Images to .webp</li>
        </ul>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen px-6 py-16 scroll-mt-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-cyan-400 text-center">Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              title: "Chat App",
              description: "A group chat app for organizing one time events. Build with Node.js, React and Firebase.",
              codeLink: "https://tempy-six.vercel.app/"
            },
            {
              title: "Web Scrapping",
              description: "A web scraping tool to collect and analyze data.",
              codeLink: "https://github.com/magicjulio/web-scrapping"
            },
            {
              title: "Elgeoo UNO R3",
              description: "Arduino-based robotics project using UNO R3.",
              codeLink: "https://github.com/magicjulio/elgegoo-uno-r3"
            }
          ].map((project) => (
            <motion.div
              key={project.title}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-cyan-500/20 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">
                {project.description}
              </p>
              <a
                href={project.codeLink}
                className="text-cyan-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code →
              </a>
            </motion.div>
          ))}
        </div>
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
          <a href="https://github.com/magicjulio" target="_blamagicjuliooopener noreferrer" className="hover:text-cyan-400">GitHub</a>
          <a href="https://www.linkedin.com/in/julius-grosserode-20219b222/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">LinkedIn</a>
        </div>
      </section>
    </>
  );
}
