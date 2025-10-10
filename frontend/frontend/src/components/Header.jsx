import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../components/Logo"; 

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 mb-10${
        scrolled
          ? "backdrop-blur-md bg-black/50 border-b border-white/10 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 py-4 mb-15 flex justify-between items-center text-white">
        {/*  Reusable Logo */}
        <Logo size={50} />

        {/*  Desktop Menu */}
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
              className={`relative group transition ${
                location.pathname === item.path ? "text-accent" : "text-white"
              }`}
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-accent transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/*  Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl hover:text-accent transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/*  Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="backdrop-blur-md bg-black/60 border-t border-white/10 px-6 py-4 space-y-4 text-white">
          {[
            { path: "/", label: "Home" },
            { path: "/properties", label: "Properties" },
            { path: "/blogs", label: "Blogs" },
            { path: "/contact", label: "Contact" },
            { path: "/pages/about-us", label: "About" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block text-lg font-medium transition hover:text-accent ${
                location.pathname === item.path ? "text-accent" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
