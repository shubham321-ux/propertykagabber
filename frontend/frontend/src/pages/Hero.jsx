import { motion } from "framer-motion";
import homeBg from "../assets/homePic.jpg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-white text-neutral-dark overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-20 md:py-28 gap-10">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left space-y-6"
        >
          <h1 className="text-2.5xl md:text-2xl font-heading font-bold text-primary-dark leading-tight">
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-primary-dark leading-tight"> Property Ka Gabbar </h1>
        
            <span className="text-accent">No Commission. No Brokerage. Direct Deals from Owners</span>
          </h1>
          <p className="text-lg text-neutral text-balance max-w-md mx-auto md:mx-0">
            Buying or selling a home is one of the biggest decisions in life — but why should it come with heavy brokerage fees? At Property Ka Gabbar, we connect buyers directly with genuine property owners so you can find your dream home without paying a single rupee in brokerage.
          </p>
          <Link
            to="/properties"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-light transition-all duration-300 font-medium"
          >
            Get Started →
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <div className="relative w-full max-w-lg mx-auto">
            <img
              src={homeBg}
              alt="Modern Home"
              className="rounded-3xl shadow-card w-full h-[400px] object-cover object-center"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
