import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import BlogCard from "../components/BlogCard";
import { getBlogs } from "../api/api";
import SectionHeader from "../components/SectionHeader";

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
      <Seo pageName="Blogs" />

      {/* MAIN SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-neutral-light min-h-screen py-24 px-6 mt-10"
      >
        {/* Header */}
        <SectionHeader
          subtitle="Our Insights"
          title="Latest Articles & Industry Trends"
          description="Stay inspired with stories and ideas from experts in architecture, interior design, and modern development."
        />

        {/* Content */}
        <div className="max-w-6xl mx-auto mt-16">
          {loading ? (
            <div className="text-center text-gray-600 text-lg py-20">
              Loading blogs...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-lg py-20">{error}</div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-gray-600 text-lg py-20">
              No blogs available at the moment.
            </div>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((b, index) => (
                <motion.div
                  key={b._id || b.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  <BlogCard blog={b} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </>
  );
}
