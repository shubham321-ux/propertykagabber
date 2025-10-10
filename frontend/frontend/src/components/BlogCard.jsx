import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BlogCard({ blog }) {
  const [imgError, setImgError] = useState(false);

  const imageUrl = blog._id
    ? `${window.location.origin}${blog.image}`
    : blog.image;

  return (
    <motion.div
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl overflow-hidden 
                 flex flex-col hover:bg-white/20 hover:shadow-lg transition duration-300"
      whileHover={{ scale: 1.03 }}
    >
      {/* Blog Image */}
      {!imgError && imageUrl ? (
        <img
          src={imageUrl}
          alt={blog.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-44 object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full h-44 bg-neutral-800 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Blog Content */}
      <div className="p-5 flex flex-col flex-1 text-white">
        <h3 className="text-xl font-semibold mb-2 text-white">
          {blog.title}
        </h3>
        <p className="text-sm text-neutral-200 mb-3 line-clamp-3">
          {(blog.content || blog.desc)?.slice(0, 120) ||
            "No content available."}
        </p>

        {/* Button */}
        {blog._id ? (
          <Link
            to={`/blogs/${blog._id}`}
            className="mt-auto inline-block px-4 py-2 rounded-lg border border-white/20 
                       bg-white/10 text-white text-sm font-medium
                       hover:bg-white/20 hover:border-white/40 
                       transition duration-300"
          >
            Read More →
          </Link>
        ) : (
          <Link
            to="/blogs"
            className="mt-auto inline-block px-4 py-2 rounded-lg border border-white/20 
                       bg-white/10 text-white text-sm font-medium
                       hover:bg-white/20 hover:border-white/40 
                       transition duration-300"
          >
            Explore Blogs →
          </Link>
        )}
      </div>
    </motion.div>
  );
}
