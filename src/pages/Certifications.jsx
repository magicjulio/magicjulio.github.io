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
		title: "Ethical Hacking",
		img: "/certs/UC-55d68018-1884-4d7d-a9ab-4b176f7ad429.jpg",
		back: "I did this on udemy.",
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
		title: "Certificate 6",
		img: "/certs/UC-28085c15-a9e0-409c-b5a3-8c4dbda928d8.jpg",
		back: "Check out his Youtube videos! Hes amazing",
	},
];

export default function Certifications() {
	const [flipped, setFlipped] = useState(Array(6).fill(false));

	const handleFlip = (idx) => {
		setFlipped((prev) => prev.map((f, i) => (i === idx ? !f : f)));
	};

	return (
		<div className="px-6 py-16 text-center">
			<h1 className="text-3xl font-bold text-cyan-400">Certifications</h1>
			<p className="text-gray-300 mt-4">
				Here are my certifications and achievements.
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
							<div className="card-back absolute w-full h-full bg-gray-800 text-cyan-300 rounded-lg shadow-lg flex items-center justify-center px-4">
								<span>{cert.back}</span>
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
