import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-primary-dark">
      {/* Logo or Text Animation */}
      <motion.h1
        className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary-dark"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Property Ka <span className="text-accent">Gabbar</span>
      </motion.h1>

      {/* Spinning Accent Ring */}
      <motion.div
        className="relative w-16 h-16"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-primary-light border-t-accent" />
      </motion.div>

      {/* Subtext / Loading Message */}
      <motion.p
        className="mt-6 text-neutral text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.6,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        Loading, please wait...
      </motion.p>
    </div>
  );
}
