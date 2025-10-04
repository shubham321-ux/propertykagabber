import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-heading font-bold">
          MySite
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-accent transition">Home</Link>
          <Link to="/blogs" className="hover:text-accent transition">Blogs</Link>
          <Link to="/contact" className="hover:text-accent transition">Contact</Link>
          <Link to="/pages/about-us" className="hover:text-accent transition">About</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-primary-dark px-4 py-3 space-y-3">
          <Link to="/" onClick={() => setOpen(false)} className="block hover:text-accent">Home</Link>
          <Link to="/blogs" onClick={() => setOpen(false)} className="block hover:text-accent">Blogs</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block hover:text-accent">Contact</Link>
          <Link to="/pages/about-us" onClick={() => setOpen(false)} className="block hover:text-accent">About</Link>
        </div>
      )}
    </header>
  );
}
