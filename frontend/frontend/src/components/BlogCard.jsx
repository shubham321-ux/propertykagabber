import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BlogCard({ blog }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = blog._id ? `${blog.image}` : blog.image;

  return (
    <motion.div
      className="bg-white border border-neutral/20 rounded-2xl shadow-card overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
    >
      {!imgError && imageUrl ? (
        <img
          src={imageUrl}
          alt={blog.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 bg-neutral-light flex items-center justify-center text-neutral">
          No Image
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2 text-primary-dark">
          {blog.title}
        </h3>
        <p className="text-sm text-neutral mb-3 line-clamp-3">
          {(blog.content || blog.desc)?.slice(0, 120) ||
            "No content available."}
        </p>

        <Link
          to={blog._id ? `/blogs/${blog._id}` : "/blogs"}
          className="mt-auto inline-block px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition"
        >
          {blog._id ? "Read More →" : "Explore Blogs →"}
        </Link>
      </div>
    </motion.div>
  );
}
