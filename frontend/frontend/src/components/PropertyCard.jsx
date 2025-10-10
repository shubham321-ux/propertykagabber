import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PropertyCard({ property }) {
  const [imgError, setImgError] = useState(false);

  const imageUrl = property.images
    ? `${window.location.origin}${property.images[0]}`
    : property.image;

  return (
    <motion.div
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl overflow-hidden 
                 flex flex-col hover:bg-white/20 hover:shadow-lg transition duration-300"
      whileHover={{ scale: 1.03 }}
    >
      {/* Property Image */}
      {!imgError && imageUrl ? (
        <img
          src={imageUrl}
          alt={property.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-56 object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full h-56 bg-neutral-800 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Property Content */}
      <div className="p-5 flex flex-col flex-1 text-white">
        <h3 className="text-xl font-semibold mb-2 text-white">
          {property.title}
        </h3>
        <p className="text-sm text-neutral-200 mb-3 line-clamp-3">
          {property.description || property.desc || "No description available."}
        </p>

        {property.price && (
          <p className="text-accent font-bold text-lg mb-4">
            ₹ {property.price.toLocaleString()}
          </p>
        )}

        {/* Button */}
        {property._id ? (
          <Link
            to={`/properties/${property._id}`}
            className="mt-auto inline-block px-4 py-2 rounded-lg border border-white/20 
                       bg-white/10 text-white text-sm font-medium
                       hover:bg-white/20 hover:border-white/40 
                       transition duration-300"
          >
            View Details →
          </Link>
        ) : (
          <Link
            to="/properties"
            className="mt-auto inline-block px-4 py-2 rounded-lg border border-white/20 
                       bg-white/10 text-white text-sm font-medium
                       hover:bg-white/20 hover:border-white/40 
                       transition duration-300"
          >
            Explore More →
          </Link>
        )}
      </div>
    </motion.div>
  );
}
