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

  // ✅ SEO metadata
  const seoContent = {
    title: "Blogs - MySite",
    description:
      "Explore inspiring articles, construction insights, and modern architecture trends curated by MySite.",
    keywords: "blogs, construction news, real estate, architecture, design, MySite",
  };

  // ✅ Demo fallback (only if no backend data)
  const demoBlogs = [
    {
      id: "demo1",
      title: "Inspiring Architecture",
      content: "Explore ideas shaping the future of modern design.",
      image: "https://source.unsplash.com/600x400/?architecture,1",
    },
    {
      id: "demo2",
      title: "Smart Homes Trend",
      content: "How technology is changing the way we live.",
      image: "https://source.unsplash.com/600x400/?smart-home,2",
    },
    {
      id: "demo3",
      title: "Urban Development",
      content: "Cities of tomorrow: what will they look like?",
      image: "https://source.unsplash.com/600x400/?city,3",
    },
  ];

  // ✅ Fetch Blogs
  useEffect(() => {
    let isMounted = true;
    getBlogs()
      .then((data) => {
        if (!isMounted) return;
        const realBlogs = Array.isArray(data)
          ? data
          : data?.blogs || [];

        // ✅ Only show demo if backend has no data
        if (realBlogs.length === 0) {
          setBlogs(demoBlogs);
        } else {
          setBlogs(realBlogs);
        }
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
        setBlogs(demoBlogs); // fallback to demo only on error
      })
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageWrapper bgImage={homeBg} overlayOpacity={0.75}>
      <Seo pageName="blog" />


      {/* Header */}
      <motion.section
        className="text-center text-white px-6 py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-heading font-bold mb-4 text-white">
          Latest Blogs
        </h1>
        <p className="max-w-3xl mx-auto text-neutral-300 text-lg">
          Stay updated with the latest trends, construction insights, and modern
          living ideas from our experts.
        </p>
      </motion.section>

      {/* Blog Grid */}
      <motion.section
        className="px-6 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {loading ? (
          <div className="text-center text-neutral-300 text-lg py-20">
            Loading blogs...
          </div>
        ) : error ? (
          <div className="text-center text-red-400 text-lg py-20">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-neutral-300 text-lg py-20">
            No blogs available.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {blogs.map((blog) => (
              <BlogCard key={blog._id || blog.id} blog={blog} />
            ))}
          </div>
        )}
      </motion.section>
    </PageWrapper>
  );
}
