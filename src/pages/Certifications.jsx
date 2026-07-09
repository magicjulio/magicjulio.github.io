import { useState } from "react";

const certificates = [
	{
		title: "DHM 2025",
    img: "/certs/DHM.jpg",
		back: "Ich hab mich über cscg für die Deutsche Hacking Meisterschaft 2025 qualifiziert.",
	},
	{
		title: "CS50x",
    img: "/certs/CS50x.png",
		back: "I did CS50x!",
	},
	{
		title: "Certificate 6",
		img: "/certs/UC-06faf300-9d2b-4f19-8f7b-b1e61e378894.jpg",
		back: "Deep Learning is so intresting. Like its it kinda wyld that you can teach a computer to understand what pizza looks like. You can try on of the models i build here: huggingface.co/spaces/julius-py/food101 ",
	},
	{
		title: "Ethical Hacking",
		img: "/certs/UC-55d68018-1884-4d7d-a9ab-4b176f7ad429.jpg",
		back: "This one was a good introduction to Ethical Hacking. I learned a lot hands on.",
	},
	{
		title: "Certificate 4",
		img: "/certs/UC-9f1f2f4b-3102-4715-a229-c4c1974183cf.jpg",
		back: "Probably no longer of use...",
	},
	{
		title: "Certificate 5",
		img: "/certs/36ebad6df0712e8e6be72dd06776bdd6232e8e9333cb295a2dd3e232db201f27.png",
		back: "Snyk Fetch the Flag with the Nahomies!",
	},
	{
		title: "Orpheus Seminar Jena",
		img: "/certs/orpheus-jena-preview.jpg",
		pdf: "/certs/Urkunde-Orpheus%20Seminar-Jena.pdf",
		back: "Urkunde vom Orpheus Seminar in Jena.",
	},
	{
		title: "Rietschen",
		img: "/certs/rietschen-preview.jpg",
		pdf: "/certs/rietschen.pdf",
		back: "Zertifikat aus Rietschen.",
	},
	{
		title: "Orpheus Seminar Würzburg",
		img: "/certs/orpheus-wuerzburg-preview.jpg",
		pdf: "/certs/Urkunde-Orpheus%20Seminar-Wu%CC%88rzburg.pdf",
		back: "Urkunde vom Orpheus Seminar in Würzburg.",
	},
	{
		title: "Coursera ZEQ6015ZH3DM",
		img: "/certs/coursera-zeq6015zh3dm-preview.jpg",
		pdf: "/certs/Coursera%20ZEQ6015ZH3DM.pdf",
		back: "Coursera Zertifikat.",
	},
	{
		title: "Orpheus Herbstseminar Frankfurt am Main",
		img: "/certs/orpheus-frankfurt-preview.jpg",
		pdf: "/certs/Urkunde-Orpheus%20Herbstseminar-Frankfurt%20am%20Main.pdf",
		back: "Urkunde vom Orpheus Herbstseminar in Frankfurt am Main.",
	},
];

export default function Certifications() {
	const [flipped, setFlipped] = useState(() =>
		Array(certificates.length).fill(false)
	);

	const handleFlip = (idx) => {
		setFlipped((prev) => prev.map((f, i) => (i === idx ? !f : f)));
	};

	return (
		<div className="px-6 py-16 text-center">
			<h1 className="text-3xl font-bold text-cyan-400">Certifications</h1>
			<p className="text-gray-300 mt-4">
				Here are my biggest certifications and achievements.
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 justify-items-center">
				{certificates.map((cert, idx) => (
					<div
						key={cert.title}
						className="w-64 h-40 sm:w-80 sm:h-52 lg:w-96 lg:h-64 perspective"
						onClick={() => handleFlip(idx)}
						style={{ cursor: "pointer" }}
					>
						<div
							className={`card-inner relative w-full h-full transition-transform duration-500 ${
								flipped[idx] ? "flipped" : ""
							}`}
						>
							{/* Front */}
							<div className="card-front absolute w-full h-full bg-cyan-900 text-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
								<img
									src={cert.img}
									alt={cert.title}
									className="object-cover w-full h-full rounded-lg"
								/>
							</div>
							{/* Back */}
							<div className="card-back absolute w-full h-full bg-gray-800 text-cyan-300 rounded-lg shadow-lg flex flex-col items-center justify-center gap-3 px-4">
								<span>{cert.back}</span>
								{cert.pdf && (
									<a
										href={cert.pdf}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(event) => event.stopPropagation()}
										className="rounded-lg border border-cyan-700/60 px-3 py-1 text-sm text-cyan-200 hover:bg-cyan-900/40"
									>
										PDF öffnen
									</a>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
			{/* Inline styles for flip effect */}
			<style>{`
        .perspective {
          perspective: 1000px;
        }
        .card-inner {
          transform-style: preserve-3d;
          position: relative;
        }
        .card-inner.flipped {
          transform: rotateY(180deg);
        }
        .card-front, .card-back {
          backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .card-back {
          transform: rotateY(180deg);
        }
      `}</style>
		</div>
	);
}
