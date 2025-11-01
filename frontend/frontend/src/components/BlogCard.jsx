import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function BlogCard({ blog }) {
  const [imgError, setImgError] = useState(false);

  const imageUrl = blog?.image || "";
  const blogId = blog?._id || blog?.id;
  const title = blog?.title || "Untitled Blog";
  const content = blog?.content || blog?.desc || "No content available.";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative group overflow-hidden h-80 bg-neutral-800 rounded-md shadow-md hover:shadow-lg"
    >
      {/* Background Image */}
      {!imgError && imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-start bg-neutral-700 text-neutral-200">
          No Image
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>

      {/* Text content */}
      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-6 z-10 text-white text-left">
        <h3 className="text-2xl font-semibold mb-2 text-white leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-200 mb-4 line-clamp-2">
          {content}
        </p>

   <Link
  to={blogId ? `/blogs/${blogId}` : "/blogs"}
  className="inline-block text-orange-400 font-semibold text-sm hover:text-orange-300 underline underline-offset-4 transition-all drop-shadow-md"
>
  Read More →
</Link>


      </div>
    </motion.div>
  );
}
