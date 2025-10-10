import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlog } from "../api/api";
import Seo from "../components/Seo";
import PageWrapper from "../components/PageWrapper";
import LazyImage from "../components/LazyImage";
import homeBg from "../assets/homePic.jpg";

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
      <PageWrapper bgImage={homeBg}>
        <p className="text-center text-neutral-300 text-lg py-20">
          Loading blog...
        </p>
      </PageWrapper>
    );

  if (!blog)
    return (
      <PageWrapper bgImage={homeBg}>
        <p className="text-center text-neutral-300 text-lg py-20">
          Blog not found.
        </p>
      </PageWrapper>
    );

  const imageUrl = blog._id
    ? `${window.location.origin}${blog.image}`
    : blog.image;

  return (
    <PageWrapper bgImage={homeBg} overlayOpacity={0.75}>
      <Seo pageName="blog details" />

      <motion.section
        className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 max-w-5xl mx-auto text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Blog Image */}
        {!imgError && imageUrl ? (
          <LazyImage
            src={imageUrl}
            alt={blog.title}
            className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover rounded-xl mb-6 sm:mb-8 backdrop-blur-md bg-white/10 border border-white/20"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] flex items-center justify-center rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-neutral-300 mb-6 sm:mb-8">
            No Image Available
          </div>
        )}

        {/* Blog Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6 text-center text-white leading-snug">
          {blog.title}
        </h1>

        {/* Blog Content */}
        <motion.div
          className="backdrop-blur-md bg-white/10 border border-white/20 p-4 sm:p-6 md:p-8 rounded-xl hover:bg-white/20 transition duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-neutral-100 leading-relaxed text-base sm:text-lg whitespace-pre-line break-words">
            {blog.content || "No content available."}
          </p>
        </motion.div>
      </motion.section>
    </PageWrapper>
  );
}
