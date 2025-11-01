import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
import houseImg from "../assets/3dHome.jpg";

const Hero = () => (
  <section className="flex flex-col md:flex-row items-center justify-between container mx-auto py-20 px-6">
    {/* LEFT CONTENT */}
    <motion.div
      className="max-w-lg md:w-1/2 text-left" // ✅ Always left aligned
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <p className="text-orange-500 font-semibold mb-3 uppercase tracking-wide">
        Trusted Real Estate Experts
      </p>
      <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight text-gray-800">
        Find Your Perfect Home with Confidence
      </h1>
      <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed">
        Explore verified residential and commercial properties directly from
        owners — no hidden fees, no brokerage. Begin your search for the ideal
        home in Mohali, Zirakpur, and Kharar today.
      </p>
      <Link to="/properties">
        <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
          Explore Properties
        </button>
      </Link>
    </motion.div>

    {/* RIGHT IMAGE */}
    <motion.div
      className="md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <LazyImage
        src={houseImg}
        alt="Modern Home"
        className="w-full max-w-2xl h-auto object-contain md:object-cover rounded-2xl shadow-lg"
      />
    </motion.div>
  </section>
);

export default Hero;
