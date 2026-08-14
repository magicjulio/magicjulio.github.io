import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Download } from "lucide-react";

const MotionDiv = motion.div;

/** Small helper so every string carries both languages next to each other. */
const L = (en, de) => ({ en, de });

const profile = {
  name: "Julius Grosserode",
  born: "19.06.2006",
  city: "Hannover",
  mail: "julius@grossero.de",
  role: L("Computer Science student", "Informatikstudent"),
  intro: L(
    "Born 2006 in Hannover. I study computer science at LUH. I want to help make AI safe.",
    "2006 in Hannover geboren. Ich studiere Informatik an der LUH. Ich möchte helfen KI sicher zu gestalten."
  ),
};

const labels = {
  cv: L("Curriculum Vitae", "Lebenslauf"),
  pdf: L("PDF", "PDF"),
  home: L("Home", "Startseite"),
  education: L("Education", "Bildungsweg"),
  work: L("Experience", "Arbeit"),
  contests: L("Seminars & competitions", "Seminare & Wettbewerbe"),
  courses: L("Courses", "Weiterbildung"),
  engagement: L("Engagement", "Ehrenamt"),
  other: L("Besides that", "Nebenbei"),
  languages: L("Languages", "Sprachen"),
  links: L("Links", "Links"),
  contact: L("Contact", "Kontakt"),
};

const education = [
  {
    when: "2025 —",
    title: L("B.Sc. Computer Science", "B.Sc. Informatik"),
    meta: L("Leibniz University Hannover", "Leibniz Universität Hannover"),
  },
  {
    when: "2010 – 2024",
    title: L("Abitur · GPA 1.8", "Abitur · Notendurchschnitt 1,8"),
    meta: L("Johannes-Kepler-Gymnasium Garbsen", "Johannes-Kepler-Gymnasium Garbsen"),
    detail: L(
      "Focus in mathematics, physics and chemistry. Awarded for the best Abitur in mathematics and for outstanding results in physics and philosophy.",
      "Leistungskurse Mathematik, Physik und Chemie. Ausgezeichnet für das beste Abitur im Fach Mathematik sowie für hervorragende Leistungen in Physik und Philosophie."
    ),
  },
];

const work = [
  {
    title: L("Research assistant (HiWi) · IFUM", "Hilfswissenschaftler (HiWi) · IFUM"),
    meta: L("Material characterisation", "Materialcharakterisierung"),
    detail: L(
      "Institute of Forming Technology and Machines at LUH.",
      "Institut für Umformtechnik und Umformmaschinen der LUH."
    ),
  },
  {
    title: L("Mywish.ai · DevOps", "Mywish.ai · DevOps"),
    meta: L("LLM orchestration · CI/CD", "LLM-Orchestrierung · CI/CD"),
    link: { href: "https://mywish.ai", label: "mywish.ai" },
  },
  {
    title: L("TK Maxx · Sales assistant", "TK Maxx · Aushilfe"),
    meta: L("Service · logistics · team", "Service · Warenlogistik · Team"),
  },
];

const contests = [
  {
    title: L("German Hacking Championship", "Deutsche Hackermeisterschaft"),
    meta: L("Qualified via CSCG", "Qualifikation über CSCG"),
    detail: L(
      "Qualified through the Cyber Security Challenge Germany and took part in the national finals.",
      "Über die Cyber Security Challenge Germany qualifiziert und am Bundesfinale teilgenommen."
    ),
    images: ["/dhm2.png"],
    link: { href: "https://hacking-meisterschaft.de/", label: "hacking-meisterschaft.de" },
  },
  {
    title: L("Orpheus seminars", "Orpheus Seminare"),
    meta: L("Physics olympiad preparation", "Vorbereitung Physik-Olympiade"),
    detail: L(
      "Preparation seminars for the International Physics Olympiad in Göttingen, Würzburg, Frankfurt am Main and Jena — lectures and exchange.",
      "Vorbereitungsseminare für die Internationale Physik-Olympiade in Göttingen, Würzburg, Frankfurt am Main und Jena — Vorlesungen und Austausch."
    ),
    images: ["/orpheus.JPG"],
    link: {
      href: "https://www.orpheus-verein.de/de/uber-uns/veranstaltungen/",
      label: "orpheus-verein.de",
    },
  },
  {
    title: L("OpenAI Parameter Golf", "OpenAI Parameter Golf"),
  },
  {
    title: L("Battlesnake Blackout", "Battlesnake Blackout"),
  },
  {
    title: L("Europe project", "Europaprojekt"),
    meta: L("German-Italian exchange", "Deutsch-italienischer Austausch"),
    images: ["/europa.png", "/europa_c.jpg"],
    link: {
      href: "https://www.jkg-garbsen.de/portal/meldungen/deutsch-italienisches-europa-projekt-2023-1244-22.html?rubrik=900000004",
      label: "jkg-garbsen.de",
    },
  },
  {
    title: L("Language trip to England", "Sprachreise England"),
    meta: L("Two weeks in Brighton", "Zwei Wochen in Brighton"),
    detail: L(
      "Two weeks of intensive language practice and everyday life in Brighton.",
      "Zwei Wochen intensive Sprachpraxis und Alltag in Brighton."
    ),
    images: [{ src: "/en_c1.jpg", portrait: true }, { src: "/newton.png" }],
  },
  {
    title: L("Youth media camp Nordwest", "Jugend Medien Camp Nordwest"),
    meta: L("Media production · AI in journalism", "Medienproduktion · KI im Journalismus"),
    detail: L(
      "Workshops on media production, technology and how AI is changing journalism.",
      "Workshops zu Medienproduktion, Technik und dazu, wie KI den Journalismus verändert."
    ),
    link: { href: "https://jugendmediencamp.de/", label: "jugendmediencamp.de" },
  },
  {
    title: L("Berlin trip with the school paper", "Berlinfahrt mit der Schülerzeitung"),
    meta: L("Political institutions · editorial networking", "Politische Institutionen · Redaktionen"),
    detail: L(
      "Visiting political institutions in Berlin and meeting editorial teams from all over Germany.",
      "Besuch politischer Institutionen in Berlin mit Redaktionen aus ganz Deutschland."
    ),
    images: [
      { src: "/unz.png" },
      { src: "/berlin.png" },
      { src: "/berlin2.png", portrait: true },
    ],
    link: {
      href: "https://www.ndr.de/kultur/Die-Ellipse-Beste-Schuelerzeitung-Deutschlands-kommt-aus-Garbsen,ellipse100.html",
      label: "ndr.de",
    },
  },
];

const courses = [
  {
    title: L("Harvard CS50x", "Harvard CS50x"),
    meta: L("Algorithms · data structures · C/Python", "Algorithmen · Datenstrukturen · C/Python"),
    detail: L(
      "Harvard's introduction to computer science, taken online and finished with the final project.",
      "Harvards Einführung in die Informatik, online belegt und mit dem Abschlussprojekt beendet."
    ),
    images: ["/certs/CS50x.png"],
    link: { href: "https://cs50.harvard.edu/x", label: "cs50.harvard.edu" },
  },
  {
    title: L("Udemy courses", "Udemy Kurse"),
    meta: L("Ethical hacking · machine learning · web dev", "Ethical Hacking · Machine Learning · Web Dev"),
    detail: L(
      "Several hands-on courses on ethical hacking, machine learning and web development.",
      "Mehrere praxisnahe Kurse zu Ethical Hacking, Machine Learning und Webentwicklung."
    ),
    images: ["/certs/UC-55d68018-1884-4d7d-a9ab-4b176f7ad429.jpg"],
  },
  {
    title: L("CTFs", "CTFs"),
    meta: L("CSCG · Fetch the Flag · SWAMP · NahamCon", "CSCG · Fetch the Flag · SWAMP · NahamCon"),
    link: { href: "/certifications", label: L("Certificates", "Zertifikate") },
  },
];

const engagement = [
  {
    title: L("Founder of the CTF team at LUH", "Gründer des CTF-Teams an der LUH"),
    meta: L("Leibniz University Hannover", "Leibniz Universität Hannover"),
    detail: L(
      "I started a Capture the Flag team at Leibniz University Hannover: organising meeting, picking competitions to play and getting new members started with web, crypto and reversing challenges.",
      "Ich habe an der Leibniz Universität Hannover ein Capture-the-Flag-Team gegründet: Treffen organisieren, ctfs auswählen und neue Mitglieder an Web-, Crypto- und Reversing-Challenges heranführen."
    ),
  },
  {
    title: L("School paper „Die Ellipse“", "Schülerzeitung „Die Ellipse“"),
    meta: L("Editor", "Redaktionsmitglied"),
    detail: L(
      "During my time in the editorial team the paper won several awards — among them best school newspaper in Germany.",
      "Während meiner Zeit in der Redaktion wurde die Zeitung mehrfach ausgezeichnet — unter anderem als beste Schülerzeitung Deutschlands in der Kategorie Gymnasium."
    ),
    images: [{ src: "/sz.png", portrait: true }],
  }
];

const other = [
  {
    title: L("Author", "Autor"),
    meta: L("Two books on philosophy", "Zwei Bücher über Philosophie"),
    images: [{ src: "/cover1.jpg", portrait: true }, { src: "/cover2.jpg", portrait: true }],
    link: { href: "/books", label: L("More about the books", "Mehr zu den Büchern") },
  },
  {
    title: L("Magician", "Zauberer"),
    meta: L("A lockdown hobby that got out of hand", "Ein Corona-Hobby, das eskaliert ist"),
    images: ["/magic.png"],
    link: { href: "https://youtu.be/H_jV_IhDBBI", label: "Music Video YouTube" },
  },
  {
    title: L("Poetry slam", "Poetry Slam"),
    meta: L("#SPAM by macht_worte", "#SPAM von macht_worte"),
    link: { href: "https://youtu.be/O1BormhwNB4", label: "YouTube" },
  },
];

const languages = [
  {
    title: L("German", "Deutsch"),
    meta: L("Native", "Muttersprache"),
  },
  {
    title: L("English", "Englisch"),
    meta: L("Fluent · C1", "Fließend · C1"),
    detail: L(" ", " "),
    images: [{ src: "/en_c1.jpg", portrait: true }],
  },
  {
    title: L("Spanish", "Spanisch"),
    meta: L("Basics", "Grundkenntnisse"),
    detail: L("Me llamo Julio.", "Me llamo Julio."),
  },
];



const links = [
  { label: "GitHub", href: "https://github.com/magicjulio", meta: "magicjulio" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/julius-grosserode-20219b222/",
    meta: "julius-grosserode",
  },
  {
    label: "Medium",
    href: "https://medium.com/@julius.grosserode.19",
    meta: L("Technical blog", "Technischer Blog"),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/juliuss.py/",
    meta: L("Private, on request", "Privat, auf Anfrage"),
  },
  
  {
    label: "Substack",
    href: "https://juliuspy.substack.com/",
    meta: L("Philosophy and Politics", "Philosophie und Politik"),
  },


];

export default function Cv() {
  const [lang, setLang] = useState("en");
  const [detail, setDetail] = useState(null);

  const t = (value) => (value && typeof value === "object" && "en" in value ? value[lang] : value);

  useEffect(() => {
    if (!detail) return undefined;
    const onKey = (event) => event.key === "Escape" && setDetail(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detail]);

  const Section = ({ label, children }) => (
    <section className="border-t border-zinc-800/80 pt-6">
      <h2 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{t(label)}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );

  /** One row of the CV. Clickable when it carries a note. */
  const Entry = ({ item, dated }) => {
    const openable = Boolean(item.detail || item.images);
    const body = (
      <>
        <span className="text-[15px] text-zinc-100 group-hover:text-cyan-300">
          {t(item.title)}
        </span>
        {item.meta && (
          <span className="mt-0.5 block text-sm text-zinc-500">{t(item.meta)}</span>
        )}
      </>
    );

    return (
      <div
        className={`group grid gap-x-5 py-3 ${
          dated ? "grid-cols-[4.5rem_1fr] sm:grid-cols-[7rem_1fr]" : "grid-cols-1"
        }`}
      >
        {dated && (
          <span className="pt-1 text-xs tabular-nums text-zinc-600 sm:text-right">
            {item.when || ""}
          </span>
        )}
        {openable ? (
          <button
            type="button"
            onClick={() => setDetail(item)}
            className="btn-plain leading-normal"
          >
            {body}
          </button>
        ) : (
          <div>{body}</div>
        )}
      </div>
    );
  };

  const List = ({ items }) => {
    const dated = items.some((item) => item.when);

    return (
      <div className="divide-y divide-zinc-900">
        {items.map((item) => (
          <Entry key={t(item.title)} item={item} dated={dated} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 antialiased">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-14 sm:px-8">
        {/* Masthead */}
        <header className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-5">
            <img
              src="/me.jpg"
              alt={profile.name}
              className="h-20 w-20 shrink-0 rounded-md object-cover object-[50%_22%] grayscale-[0.15] sm:h-24 sm:w-24"
            />
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                {t(labels.cv)}
              </p>
              <h1 className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-zinc-50 sm:text-4xl">
                {profile.name}
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                {t(profile.role)} · {profile.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="inline-flex items-center rounded-full border border-zinc-800 p-[3px] text-[11px] leading-none">
              {["en", "de"].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`btn-plain !rounded-full !px-2 !py-1 font-medium uppercase tracking-wider transition ${
                    lang === code
                      ? "!bg-zinc-200 text-zinc-900"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 px-3 py-1.5 text-xs !text-zinc-300 transition hover:border-zinc-600 hover:!text-zinc-100"
            >
              <Download size={13} /> {t(labels.pdf)}
            </a>
          </div>
        </header>

        {/* Intro */}
        <p className="mt-10 max-w-2xl text-[15px] leading-7 text-zinc-400">
          {t(profile.intro)}
        </p>
      
    

        {/* Body */}
        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_15rem] lg:gap-16">
          <div className="space-y-12">
            <Section label={labels.education}>
              <List items={education} />
            </Section>
            <Section label={labels.work}>
              <List items={work} />
            </Section>
            <Section label={labels.contests}>
              <List items={contests} />
            </Section>
            <Section label={labels.courses}>
              <List items={courses} />
            </Section>
            <Section label={labels.engagement}>
              <List items={engagement} />
            </Section>
            <Section label={labels.other}>
              <List items={other} />
            </Section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10 lg:sticky lg:top-24 lg:self-start">
            <div className="border-t border-zinc-800/80 pt-6">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                {t(labels.languages)}
              </h2>
              <ul className="mt-4 space-y-3">
                {languages.map((item) => (
                  <li key={t(item.title)}>
                    {item.detail ? (
                      <button
                        type="button"
                        onClick={() => setDetail(item)}
                        className="btn-plain text-zinc-200 hover:text-cyan-300"
                      >
                        <span className="text-sm">{t(item.title)}</span>
                        <span className="block text-xs text-zinc-500">{t(item.meta)}</span>
                      </button>
                    ) : (
                      <div className="text-sm text-zinc-200">
                        {t(item.title)}
                        <span className="block text-xs text-zinc-500">{t(item.meta)}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-zinc-800/80 pt-6">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                {t(labels.links)}
              </h2>
              <ul className="mt-4 space-y-3">
                {links.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-1 text-sm !text-zinc-200 hover:!text-cyan-300"
                    >
                      {item.label}
                      <ArrowUpRight
                        size={12}
                        className="translate-y-px text-zinc-600 group-hover:text-cyan-300"
                      />
                    </a>
                    <span className="block text-xs text-zinc-500">{t(item.meta)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-zinc-800/80 pt-6">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                {t(labels.contact)}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                <li>
                  <a
                    href={`mailto:${profile.mail}`}
                    className="!text-zinc-200 hover:!text-cyan-300"
                  >
                    {profile.mail}
                  </a>
                </li>
                <li>{profile.city}</li>
                <li className="tabular-nums">{profile.born}</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Detail overlay */}
      <AnimatePresence>
        {detail && (
          <MotionDiv
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
              onClick={() => setDetail(null)}
            />
            <MotionDiv
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-serif text-xl text-zinc-50">{t(detail.title)}</h3>
                  {detail.meta && (
                    <p className="mt-1 text-sm text-zinc-500">{t(detail.meta)}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setDetail(null)}
                  aria-label="Close"
                  className="btn-plain -mt-1 text-zinc-500 hover:text-zinc-200"
                >
                  <X size={18} />
                </button>
              </div>

              {detail.detail && (
                <p className="mt-4 text-[15px] leading-7 text-zinc-300">{t(detail.detail)}</p>
              )}

              {detail.images?.length > 0 && (
                <div
                  className={`mt-5 grid gap-3 ${
                    detail.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                  }`}
                >
                  {detail.images.map((image, index) => {
                    const src = typeof image === "string" ? image : image.src;
                    const portrait = typeof image === "object" && image.portrait;
                    return (
                      <div
                        key={src ?? index}
                        className={`overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 ${
                          portrait ? "aspect-[3/4]" : "aspect-video"
                        }`}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </div>
                    );
                  })}
                </div>
              )}

              {detail.link && (
                <a
                  href={detail.link.href}
                  target={detail.link.href.startsWith("/") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-sm !text-cyan-400 hover:underline"
                >
                  {t(detail.link.label)} <ArrowUpRight size={14} />
                </a>
              )}
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}
