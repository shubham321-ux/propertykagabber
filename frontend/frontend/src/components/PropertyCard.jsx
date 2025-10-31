import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PropertyCard({ property }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = property.images ? property.images[0] : property.image;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-md shadow-md transition-all duration-300 hover:shadow-xl"
    >
      {/* Background Image with Shade */}
      <div
        className="relative h-[22rem] sm:h-[24rem] w-full bg-center bg-cover flex flex-col justify-end p-6 sm:p-8 transition-all duration-300"
        style={{
          backgroundImage: !imgError && imageUrl ? `url(${imageUrl})` : "none",
          backgroundColor: imgError ? "#ccc" : "transparent",
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/50 hover:bg-black/40 transition-all duration-300" />

        {/* Optional Location Tag */}
        {property.location && (
          <span className="absolute top-4 left-4 bg-white/90 text-gray-900 text-xs font-medium px-3 py-1 rounded-md z-10">
            📍 {property.location}
          </span>
        )}

        {/* Content */}
        <div className="relative z-10 text-left text-white sm:text-left">
          <h3 className="text-2xl font-semibold mb-2 text-white drop-shadow-md line-clamp-2">
            {property.title}
          </h3>
          <p className="text-sm mb-3 line-clamp-2 text-gray-100 opacity-90">
            {property.description || property.desc || "No description available."}
          </p>

          {property.price && (
            <p className="text-lg font-bold mb-4 text-white">
              ₹ {property.price.toLocaleString()}
            </p>
          )}

          <Link
            to={property._id ? `/properties/${property._id}` : "/properties"}
            className="inline-block px-4 py-2 bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 rounded-md transition"
          >
            {property._id ? "View Details →" : "Explore More →"}
          </Link>
        </div>
      </div>

      {/* Fallback if image fails */}
      {!imgError && !imageUrl && (
        <div className="h-[22rem] sm:h-[24rem] flex items-center justify-center bg-gray-200 text-gray-600">
          No Image Available
        </div>
      )}
    </motion.div>
  );
}
