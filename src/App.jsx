import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Certifications from "./pages/Certifications";
import Books from "./pages/Books";
import Blogs from "./pages/Blogs";
import Cv from "./pages/Cv";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="bg-gray-950 text-gray-100 min-h-screen font-sans overflow-x-hidden">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
            <h1 className="text-xl font-bold text-cyan-400">Julius.py</h1>
            {/* Desktop Links */}
            <ul className="hidden md:flex space-x-6">
              <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
              <li><Link to="/certifications" className="hover:text-cyan-400">Certifications</Link></li>
              <li><Link to="/books" className="hover:text-cyan-400">Books</Link></li>
              <li><Link to="/blogs" className="hover:text-cyan-400">Blogs</Link></li>
              <li><Link to="/cv" className="hover:text-cyan-400">CV</Link></li>
            </ul>
            {/* Hamburger Button */}
            <button
              className="md:hidden flex items-center px-3 py-2 border rounded text-cyan-400 border-cyan-400"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          {/* Mobile Menu */}
          {menuOpen && (
            <ul className="md:hidden flex flex-col bg-gray-900 px-4 pb-4 space-y-2">
              <li><Link to="/" className="hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/certifications" className="hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Certifications</Link></li>
              <li><Link to="/books" className="hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Books</Link></li>
              <li><Link to="/blogs" className="hover:text-cyan-400" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
              <li><Link to="/cv" className="hover:text-cyan-400" onClick={() => setMenuOpen(false)}>CV</Link></li>
            </ul>
          )}
        </nav>

        {/* Page Content */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/books" element={<Books />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/cv" element={<Cv />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
