import { motion } from "framer-motion";
import homeBg from "../assets/homePic.jpg";
import { Link } from "react-router-dom";

 const Hero = () => (
  <section className="flex flex-col md:flex-row items-center justify-between container mx-auto py-20 px-6">
    <div className="max-w-lg md:w-1/2 text-center md:text-left">
      <p className="text-orange-500 font-semibold mb-3">
        Trusted Real Estate Experts
      </p>
      <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
        Find Your Perfect Home with Confidence
      </h1>
      <p className="text-gray-500 mb-8 text-base md:text-lg">
        Explore verified residential and commercial properties directly from
        owners — no hidden fees, no brokerage. Begin your search for the ideal
        home in Mohali, Zirakpur, and Kharar today.
      </p>
      <Link to="/properties">
        <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
          Explore Properties
        </button>
      </Link>
    </div>

    <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
      <LazyImage
        src={houseImg}
        alt="Modern Home"
        className="w-full max-w-2xl h-auto object-contain md:object-cover rounded-xl shadow-sm"
      />
    </div>
  </section>
);

export default Hero