import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PropertyCard({ property }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = property.images ? `${property.images[0]}` : property.image;

  return (
    <motion.div
      className="bg-white border border-neutral/20 rounded-2xl shadow-card overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      {!imgError && imageUrl ? (
        <img
          src={imageUrl}
          alt={property.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-56 object-cover"
        />
      ) : (
        <div className="w-full h-56 bg-neutral-light flex items-center justify-center text-neutral">
          No Image
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2 text-primary-dark">
          {property.title}
        </h3>
        <p className="text-sm text-neutral mb-3 line-clamp-3">
          {property.description || property.desc || "No description available."}
        </p>

        {property.price && (
          <p className="text-accent font-bold text-lg mb-4">
            ₹ {property.price.toLocaleString()}
          </p>
        )}

        <Link
          to={property._id ? `/properties/${property._id}` : "/properties"}
          className="mt-auto inline-block px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition"
        >
          {property._id ? "View Details →" : "Explore More →"}
        </Link>
      </div>
    </motion.div>
  );
}
