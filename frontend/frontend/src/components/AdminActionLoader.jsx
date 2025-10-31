import { motion } from "framer-motion";

export default function AdminActionLoader({ message = "Processing..." }) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
      {/* Loader Ring */}
      <motion.div
        className="relative w-16 h-16 mb-6"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      >
        <div className="absolute inset-0 border-4 border-primary-light border-t-accent rounded-full shadow-md"></div>
      </motion.div>

      {/* Message */}
      <motion.p
        className="text-primary-dark font-semibold text-lg tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
      >
        {message}
      </motion.p>
    </div>
  );
}
