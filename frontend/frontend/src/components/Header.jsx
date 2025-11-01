import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../components/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/properties", label: "Properties" },
    { path: "/blogs", label: "Blog" },
    { path: "/about-us", label: "About" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0f172a]/95 shadow-md backdrop-blur-sm" : "bg-[#0f172a]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-3 flex justify-between items-center text-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo size={45} />
          <span className="text-2xl font-bold text-orange-500">Gabber</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group transition ${
                location.pathname === item.path
                  ? "text-orange-400 font-semibold"
                  : "hover:text-orange-400"
              }`}
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-400 transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-4 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-sm font-medium shadow-sm transition"
          >
          Contact
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-orange-400"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0f172a] border-t border-gray-700 px-6 py-4 space-y-4 text-white">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block text-lg font-medium transition ${
                location.pathname === item.path
                  ? "text-orange-400 font-semibold"
                  : "hover:text-orange-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
