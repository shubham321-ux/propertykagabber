import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlog } from "../api/api";
import Seo from "../components/Seo";
import LazyImage from "../components/LazyImage";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    getBlog(id)
      .then((data) => setBlog(data))
      .catch((err) => console.error("Error fetching blog:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="py-20 text-center text-neutral text-lg">Loading blog...</div>
    );

  if (!blog)
    return (
      <div className="py-20 text-center text-neutral text-lg">Blog not found.</div>
    );

  const imageUrl = blog._id ? `${blog.image}` : blog.image;

  return (
    <div className="bg-white text-neutral-dark">
      <Seo pageName="blog details" />

      {/* Header */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3">
          {blog.title}
        </h1>
        <p className="text-neutral-dark text-lg">
          Insights, architecture, and lifestyle from our experts.
        </p>
      </motion.section>

      {/* Blog Image */}
      <motion.div
        className="max-w-6xl mx-auto px-6 mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {!imgError && imageUrl ? (
          <LazyImage
            src={imageUrl}
            alt={blog.title}
            className="w-full h-[480px] object-cover rounded-2xl shadow-card"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-[480px] flex items-center justify-center rounded-2xl bg-neutral-light border border-neutral text-neutral">
            No Image Available
          </div>
        )}
      </motion.div>

      {/* Blog Content */}
      <motion.section
        className="max-w-5xl mx-auto px-6 pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-neutral-light border border-neutral/30 shadow-card p-8 rounded-2xl">
          <p className="text-neutral-dark leading-relaxed text-lg whitespace-pre-line break-words">
            {blog.content || "No content available."}
          </p>
        </div>
      </motion.section>
    </div>
  );
}
