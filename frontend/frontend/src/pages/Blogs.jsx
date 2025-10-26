import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import BlogCard from "../components/BlogCard";
import PageWrapper from "../components/PageWrapper";
import { getBlogs } from "../api/api";
import homeBg from "../assets/homePic.jpg";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const demoBlogs = [
    {
      id: "demo1",
      title: "Inspiring Architecture",
      content: "Explore ideas shaping the future of modern design.",
      image: "https://source.unsplash.com/600x400/?architecture",
    },
    {
      id: "demo2",
      title: "Smart Homes Trend",
      content: "How technology is changing the way we live.",
      image: "https://source.unsplash.com/600x400/?smart-home",
    },
    {
      id: "demo3",
      title: "Urban Development",
      content: "Cities of tomorrow: what will they look like?",
      image: "https://source.unsplash.com/600x400/?city",
    },
  ];

  useEffect(() => {
    let mounted = true;
    getBlogs()
      .then((data) => {
        if (!mounted) return;
        const realBlogs = Array.isArray(data) ? data : data?.blogs || [];
        setBlogs(realBlogs.length > 0 ? realBlogs : demoBlogs);
      })
      .catch(() => {
        setError("Failed to load blogs");
        setBlogs(demoBlogs);
      })
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Seo pageName="blog" />

      {/* HERO */}
      <motion.section
        className="max-w-6xl mx-auto text-center py-24 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-primary-dark">
          Our Latest Insights & Blogs
        </h1>
        <p className="max-w-3xl mx-auto text-neutral text-lg">
          Stay inspired with stories and ideas from experts in architecture,
          interior design, and construction.
        </p>
      </motion.section>

      {/* GRID */}
      <motion.section
        className="bg-white px-6 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {loading ? (
          <div className="text-center text-neutral text-lg py-20">
            Loading blogs...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg py-20">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-neutral text-lg py-20">
            No blogs available.
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {blogs.map((b) => (
              <BlogCard key={b._id || b.id} blog={b} />
            ))}
          </div>
        )}
      </motion.section>
    </>
  );
}
