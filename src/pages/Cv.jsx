import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileDown } from "lucide-react";
import { label, link } from "framer-motion/client";

export default function Cv() {
  const [modal, setModal] = useState({
    open: false,
    title: "",
    content: "",
    link: null,
    images: [],
  });

  const open = (payload) => setModal({ open: true, ...payload });
  const close = () =>
    setModal({ open: false, title: "", content: "", link: null, images: [] });

  // Quick helpers for reusable UI bits
  const Tag = ({ children }) => (
    <span className="text-xs px-2 py-1 rounded-full bg-cyan-900/40 text-cyan-300 border border-cyan-700/40">
      {children}
    </span>
  );

  const Card = ({ title, children }) => (
    <div className="bg-gray-900/70 rounded-2xl p-5 shadow-lg border border-gray-800 hover:border-cyan-700/30 transition">
      <h3 className="text-lg font-semibold text-cyan-300 mb-3">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen overflow-x-hidden">
      {/* Header / Actions */}
        <header className="max-w-6xl mx-auto px-4 pt-24 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="text-cyan-400">JULIUS</span> GROSSERODE
            </h1>
            <p className="text-gray-400 mt-1">Informatiker · Interactive CV</p>
          </div>
          <div className="flex items-center gap-3">
            <a
          href="cv.pdf"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition shadow !text-white"
          target="_blank"
          rel="noopener noreferrer"
            >
          <FileDown size={18} /> Als PDF herunterladen
            </a>
            <a
          href="/"
          
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition"
            >
          <ExternalLink size={18} /> Home
            </a>
          </div>
        </header>

        {/* Content */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="About me">
              <p className="text-gray-300 leading-relaxed">
                Geboren{" "}
                <mybutton
                  className="underline decoration-dotted hover:text-cyan-300 background-color: None"
                  onClick={() =>
                    open({
                      title: "Geburtsdatum",
                      content: "Juni 2006 in Hannover.",
                      
                    })
                  }
                >
                  2006.
                </mybutton>
                 &nbsp; Passionate about Coding, Machne Learning & IT-Security. Click on any element to find out more.
              </p>
            </Card>

            <Card title="Bildungsweg">
              <ul className="space-y-3">
                <li className="flex items-start justify-between gap-3">
                  <div>
                    <mybutton
                      onClick={() =>
                        open({
                          title: "Abitur (1,8)",
                          content:
                            "Johannes-Kepler-Gymnasium Garbsen, 2010–2024. Leistungskurse Mathematik, Physik und Chemie. Ich erhielt Auszeichnugen für das beste Abitur im Fach Mathemathik sowie für Hervoragende Leistungen in den Fächern Physik und Philosophie ",
                          images: [],
                        })
                      }
                      className="text-left hover:text-cyan-300 transition"
                    >
                      Abitur – Notendurchschnitt 1,8.{" "}
                    </mybutton>
                    <div className="text-sm text-gray-400">
                      Johannes-Kepler-Gymnasium Garbsen · 2010–2025
                    </div>
                  </div>
                </li>
                <li className="flex items-start justify-between gap-3">
                  <div>
                    <mybutton
                      onClick={() =>
                        open({
                          title: "B.Sc. Informatik",
                          content:
                            "Leibniz Universität Hannover – Studium beginnt im Wintersemester.",
                          images: [],
                        })
                      }
                      className="text-left hover:text-cyan-300 transition"
                    >
                      B.Sc. Informatik (laufend)
                    </mybutton>
                    <div className="text-sm text-gray-400">
                      Leibniz Universität Hannover
                    </div>
                  </div>
                </li>
              </ul>
            </Card>

            <Card title="Online-Weiterbildung & Kurse">
              <div className="flex flex-wrap gap-2 mb-4">
                <Tag>CS50x</Tag>
                <Tag>Udemy: Ethical Hacking</Tag>
                <Tag>Udemy: Machine Learning</Tag>
                <Tag>Udemy: Web Dev</Tag>
                <Tag>CTFs</Tag>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <mybutton
                  onClick={() =>
                    open({
                      title: "Harvard CS50x",
                      content:
                        "Ich habe Havards Computer Science Kurs Online belegt!",
                      link: {
                        href: "https://cs50.harvard.edu/x",
                        label: "CS50x",
                      },
                      images: ["/certs/CS50x.png"],
                    })
                  }
                  className="text-left p-3 rounded-xl bg-gray-800/70 hover:bg-gray-800 border border-gray-700"
                >
                  <div className="font-medium">Harvard CS50x</div>
                  <div className="text-sm text-gray-400">
                    Algorithmen · Datenstrukturen · C/Python · Web
                  </div>
                </mybutton>

                <mybutton
                  onClick={() =>
                    open({
                      title: "Udemy",
                      content:
                        "Verschiedene Kurse zu Ethical Hacking, Machine Learning und Web Development.",
                      images: ["/certs/UC-55d68018-1884-4d7d-a9ab-4b176f7ad429.jpg"],
                    })
                  }
                  className="text-left p-3 rounded-xl bg-gray-800/70 hover:bg-gray-800 border border-gray-700"
                >
                  <div className="font-medium">
                    Udemy Kurse
                  </div>
                  <div className="text-sm text-gray-400">
                    Ethical Hacking · Machine Learning · Web Dev
                  </div>
                </mybutton>
              </div>
            </Card>

            <Card title="Seminare & Wettbewerbe">
              <ul className="space-y-3">
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Orpheus Seminare",
                        content:
                          "Ein Seminar zur Vorbereitung für die Internationale Physik Olympiade. Teilnahme in Göttingen, Würzburg, Frankfurt am Main und Jena. Wissenschaftlicher Austausch und Vorlesungen im Uni Style.",
                        images: ["/orpheus.JPG"],
                        link: {href:"https://www.orpheus-verein.de/de/uber-uns/veranstaltungen/", label:"Orpheus Verein Website"},
          
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Orpheus Seminare
                  </mybutton>
                </li>
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Deutsche Hackermeisterschaft",
                        content:
                          "Teilnahme an der Deutschen Hackermeisterschaft. Qualifizierung durch cscg.",
                        images: ["/dhm2.png"],
                        link: {href:"https://hacking-meisterschaft.de/", label:"DHM Website"},
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Deutsche Hackermeisterschaft
                  </mybutton>
                </li>
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Europaprojekt",
                        content:
                          "Interdisziplinäres Projekt mit internationalem Fokus. Präsentationen & Teamarbeit mit Italiänischen teilnehmern.",
                        images: ["/europa.png", "europa_c.jpg"],
                        link: {href:"https://www.jkg-garbsen.de/portal/meldungen/deutsch-italienisches-europa-projekt-2023-1244-22.html?rubrik=900000004", label:"Schulprojektseite"},
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Europaprojekt
                  </mybutton>
                </li>
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Sprachreise England",
                        content:
                          "Intensive Sprachpraxis und kulturelle Erfahrungen in Brighton England für 2 Wochen.",
                        images: [{src:"/en_c1.jpg", portrait: true},{src:"/newton.png"}],
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Sprachreise England
                  </mybutton>
                </li>
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Jugend Medien Camp Nordwest",
                        content:
                          "Workshops zu Medienproduktion, KI im Journalismus & Technik.",
                        link: {href:"https://jugendmediencamp.de/", label:"JMC Website"},
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Jugend Medien Camp Nordwest
                  </mybutton>
                </li>
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Berlinfahrt mit Schülerzeitung",
                        content:
                          "Besuch politischer Institutionen, Netzwerken mit anderen Redaktionen.",
                        images: [{src:"/unz.png"},{src:"/berlin.png"},{src:"/berlin2.png", portrait: true}],
                        link: {href:"https://www.ndr.de/kultur/Die-Ellipse-Beste-Schuelerzeitung-Deutschlands-kommt-aus-Garbsen,ellipse100.html", label:"NDR Bericht"},
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Berlinfahrt mit Schülerzeitung
                  </mybutton>
                </li>
              </ul>
            </Card>

            <Card title="Arbeitserfahrung">
              <div className="grid sm:grid-cols-2 gap-3">
                <mybutton
                  onClick={() =>
                    open({
                      title: "TK Maxx – Aushilfe",
                      content:
                        "Kundenbetreuung, Warenlogistik, Teamarbeit – Soft Skills in Praxis.",
                    })
                  }
                  className="text-left p-3 rounded-xl bg-gray-800/70 hover:bg-gray-800 border border-gray-700"
                >
                  TK Maxx – Aushilfe
                  <div className="text-sm text-gray-400">
                    Service · Organisation · Team
                  </div>
                </mybutton>
                <mybutton
                  onClick={() =>
                    open({
                      title: "Mywish.ai – DevOps CD / CI",
                      content:
                        "Startup-Erfahrung: Automatisierung, Deployment, Monitoring. Stack: GitHub Actions + SonarCloud.",
                        link: {href:"https://mywish.ai", label:"mywish.ai"},
                      
                    })
                  }
                  className="text-left p-3 rounded-xl bg-gray-800/70 hover:bg-gray-800 border border-gray-700"
                >
                  Startup Mywish.ai – DevOps
                  <div className="text-sm text-gray-400">
                    CI/CD · GitHub Actions
                  </div>
                </mybutton>
              </div>
            </Card>

            <Card title="Das bin ich sonst noch...">
              <ul className="space-y-3">
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Meine Bücher",
                        content:
                          "Zwei veröffentlichte Bücher über Philosophie.",
                        images: [{src: "/cover1.jpg", portrait: true}, {src: "/cover2.jpg", portrait: true}],
                        link: {href:"/Books", label:"Mehr dazu"},
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Autor
                  </mybutton>
                </li>

                 <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Musikvideo",
                        content:
                          "Zaubertricks lernen war mein Corona-Hobby. Daraus entstand dieses absolute Banger Musikvideo.",
                        images: ["/magic.png"],
                        link: {href:"https://youtu.be/H_jV_IhDBBI?si=5J4lBjAH1_8EXrp6", label:"YouTube Video"},
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Zauberer
                  </mybutton>
                </li>

                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Poetry Slam – SPAM",
                        content:
                          "Teilnahme bei Poetry slam #SPAM von macht_worte",
                        link: {href:"https://youtu.be/O1BormhwNB4?si=2zzUVwiHYwGW_Qa0/", label:"YouTube Video"},
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Dichter
                  </mybutton>
                </li>
               
                
              </ul>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Card title="Sprachen">
              <ul className="space-y-2">
                <li>
                  <mybutton
                    className="hover:text-cyan-300"
                  >
                    Deutsch – Muttersprache
                  </mybutton>
                </li>
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Englisch",
                        content:
                          "C1 Niveau zertifiziert.",
                        images: [{src: "/en_c1.jpg", portrait: true}],
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Englisch – fließend
                  </mybutton>
                </li>
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Español",
                        content: "Me llamo Julio.",
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Spanisch – Grundkenntnisse
                  </mybutton>
                </li>
              </ul>
            </Card>

            <Card title="Soft Skills">
              <div className="flex flex-wrap gap-2">
                {[
                  "Eigeninitiative",
                  "Logisches Denken",
                  "Problemlösung",
                  "Strukturierte Arbeitsweise",
                  "Teamfähigkeit",
                  
                ].map((s) => (
                  <mybutton
                    className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm hover:bg-gray-750 hover:text-cyan-300"
                  >
                    {s}
                  </mybutton>
                ))}
              </div>
            </Card>

            <Card title="Engagement">
              <ul className="space-y-2">
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Seminarfach – Balu und Du",
                        content:
                          "Mentoring-Programm: Verantwortung & Sozialkompetenz für dein Mogli.",

                        link: {href:"https://www.balu-und-du.de/", label:"Balu und Du Website"},
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Balu und Du (Seminarfach)
                  </mybutton>
                </li>
                <li>
                  <mybutton
                    onClick={() =>
                      open({
                        title: "Schülerzeitung – Die Ellipse",
                        content:
                          "Während ich teil der Redation unserer Schülerzeitung die Ellipse war wurden wir mehrfach ausgezeichnet. Unter anderem als beste Schülerzeitung Deutschlands.",
                        images: [{src: "/sz.png", portrait: true}],
                      })
                    }
                    className="hover:text-cyan-300"
                  >
                    Mitglied Schülerzeitung „Die Ellipse“
                  </mybutton>
                </li>
              </ul>
            </Card>

            <Card title="Links">
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/magicjulio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-cyan-300"
                  >
                    GitHub <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/@julius.grosserode.19"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-cyan-300"
                  >
                    Technischer Blog (Medium) <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/juliuss.py/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-cyan-300"
                  >
                    Privat Instagram (Nur auf Anfrage) <ExternalLink size={16} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/julius-grosserode-20219b222/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-cyan-300"
                  >
                    LinkedIn <ExternalLink size={16} />
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {modal.open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70" onClick={close} />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative w-full max-w-xl bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-xl font-semibold text-cyan-300">
                  {modal.title}
                </h4>
                <mybutton
                  onClick={close}
                  className="p-2 rounded-lg hover:bg-gray-800"
                >
                  <X />
                </mybutton>
              </div>
              <p className="mt-3 text-gray-200 leading-relaxed">
                {modal.content}
              </p>

              {modal.images && modal.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {modal.images.map((img, i) => {
                    // Support both string and object for backward compatibility
                    const src = typeof img === "string" ? img : img.src;
                    const isPortrait = typeof img === "object" && img.portrait;
                    return (
                      <div
                        key={i}
                        className={
                          isPortrait
                            ? "aspect-[3/4] bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex items-center justify-center"
                            : "aspect-video bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex items-center justify-center"
                        }
                      >
                        <img
                          src={src}
                          alt=""
                          className={
                            // Use object-cover to fill the container
                            "object-cover w-full h-full"
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {modal.link && (
                <a
                  href={modal.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-cyan-300 hover:underline"
                >
                  {modal.link.label} <ExternalLink size={16} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

