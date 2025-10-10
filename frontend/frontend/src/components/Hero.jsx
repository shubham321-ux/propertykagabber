import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const sentences = [
  "Building Dreams into Reality...",
  "Crafting Spaces with Excellence...",
  "Your Trusted Partner in Construction...",
];

export default function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [offsetY, setOffsetY] = useState(0); // ✅ for parallax

  // Typing effect
  useEffect(() => {
    const currentSentence = sentences[sentenceIndex];
    let typingSpeed = deleting ? 50 : 120;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < currentSentence.length) {
        setCurrentText((prev) => prev + currentSentence[charIndex]);
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setCurrentText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      } else if (!deleting && charIndex === currentSentence.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setSentenceIndex((prev) => (prev + 1) % sentences.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, sentenceIndex]);

  // ✅ Parallax effect
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80')`,
          transform: `translateY(${offsetY * 0.9}px)`, // ✅Parallax depth
          transition: "transform 0.1s linear",
        }}
      ></div>

      {/* Dark Glass Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      {/* Centered Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl sm:text-6xl font-heading font-bold text-white mb-6">
          {currentText}
          <span className="animate-pulse">|</span>
        </h1>
        <p className="text-neutral-light text-lg sm:text-xl max-w-2xl mx-auto">
          We create modern spaces that inspire, innovate, and elevate lifestyles.  
          From residential to commercial, we build with passion and precision.
        </p>
         <Link
                              to={`/properties`}
                             
                            >
                              <button className="mt-8 px-6 py-3 bg-accent text-white font-medium rounded-lg shadow-lg hover:bg-accent-light transition">
          Explore Our Projects →
        </button>
                            </Link>
       
      </div>
    </section>
  );
}
