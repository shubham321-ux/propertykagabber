import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../components/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-neutral-200"
          : "bg-white"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Logo size={50} />

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-medium items-center">
          {[
            { path: "/", label: "Home" },
            { path: "/properties", label: "Properties" },
            { path: "/blogs", label: "Blogs" },
            { path: "/contact", label: "Contact" },
            { path: "/about-us", label: "About" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group transition text-neutral-dark ${
                location.pathname === item.path ? "text-primary font-semibold" : ""
              }`}
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition font-medium shadow-sm"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl text-primary"
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
        <div className="bg-white border-t border-neutral-200 px-6 py-4 space-y-4 text-neutral-dark">
          {[
            { path: "/", label: "Home" },
            { path: "/properties", label: "Properties" },
            { path: "/blogs", label: "Blogs" },
            { path: "/contact", label: "Contact" },
            { path: "/about-us", label: "About" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block text-lg font-medium hover:text-primary transition ${
                location.pathname === item.path ? "text-primary font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block w-full text-center bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
