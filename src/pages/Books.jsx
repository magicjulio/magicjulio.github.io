export default function Books() {
  return (
    <div className="px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-cyan-400">Books</h1>
      <p className="text-gray-300 mt-4">I wrote these Books</p>
      <div className="mt-10 flex flex-col items-center gap-8">
        {/* Book 1 */}
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
          <img
            src="/cover1.jpg"
            alt="Book 1 Cover"
            className="mx-auto mb-4 rounded-md w-40 h-56 object-cover"
          />
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">Gedanken um 3 Uhr nachts</h2>
          <p className="text-gray-300">
            Eine sammlung von Philosophischen essays über eine große breite an Themen. Order on <a href="https://amzn.eu/d/4QYHuPu" className="href">Amazon</a>
          </p>
        </div>
        {/* Book 2 */}
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
          <img
            src="/cover2.jpg"
            alt="Book 2 Cover"
            className="mx-auto mb-4 rounded-md w-40 h-56 object-cover"
          />
          <h2 className="text-xl font-semibold text-cyan-300 mb-2">Alles was nichts bedeutet</h2>
          <p className="text-gray-300">
            Eine Philosophische Kurzgeschichte über den Sinn des Lebens. Order on <a href="https://www.thalia.de/shop/home/artikeldetails/A1069583813">Thalia</a>
          </p>
        </div>
      </div>
    </div>
  );
}
