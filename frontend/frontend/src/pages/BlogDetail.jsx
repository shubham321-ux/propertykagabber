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
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="py-20 text-center text-neutral text-lg">
        Loading blog...
      </div>
    );

  if (!blog)
    return (
      <div className="py-20 text-center text-neutral text-lg">
        Blog not found.
      </div>
    );

  const imageUrl = blog._id ? `${blog.image}` : blog.image;

  return (
    <div className="bg-white text-neutral-dark mt-20">
      <Seo pageName="Blog Details" />

      {/* HEADER */}
      <motion.section
        className="max-w-4xl mx-auto px-4 text-center py-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary-dark mb-2 leading-snug">
          {blog.title}
        </h1>

        <p className="text-neutral text-sm mb-2">
          by <span className="font-semibold text-primary-dark">Property ka Gabbar</span> &nbsp;•&nbsp;
          {blog.date ? new Date(blog.date).toLocaleDateString() : "Oct 2025"}
        </p>

        <p className="max-w-2xl mx-auto text-neutral  text-sm md:text-base">
          Get expert insights and real-world advice on property trends, design ideas, and smart investments.
        </p>
      </motion.section>

      {/* IMAGE */}
      <motion.div
        className="max-w-4xl mx-auto px-4 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {!imgError && imageUrl ? (
          <LazyImage
            src={imageUrl}
            alt={blog.title}
            className="w-full h-[250px] md:h-[300px] object-cover rounded-lg shadow-md"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-[250px] flex items-center justify-center rounded-lg bg-neutral-light border border-neutral text-neutral">
            No Image Available
          </div>
        )}
      </motion.div>

      {/* CONTENT */}
      <motion.section
        className="max-w-3xl mx-auto px-4 pb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <article className="text-neutral-dark leading-relaxed">
          <p className="mb-4 text-base md:text-lg">
            {blog.intro ||
              "In today’s evolving real estate landscape, understanding market shifts and modern architectural trends is more important than ever. Here’s what our experts have to say."}
          </p>

          <h2 className="text-xl md:text-2xl font-semibold text-primary-dark mt-8 mb-3">
            Key Takeaways
          </h2>
          <ul className="list-disc ml-5 mb-4 space-y-1 text-base md:text-lg">
            <li>Smart investment begins with understanding location dynamics.</li>
            <li>Design trends are shifting toward energy-efficient materials.</li>
            <li>Transparency and quality remain at the heart of good construction.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-semibold text-primary-dark mt-8 mb-3">
            Full Article
          </h2>
          <p className="text-base md:text-lg whitespace-pre-line break-words">
            {blog.content ||
              "Our vision for real estate is rooted in trust and transparency. Whether you’re a buyer, investor, or homeowner, staying informed helps you make smarter, more confident decisions."}
          </p>

          <h2 className="text-xl md:text-2xl font-semibold text-primary-dark mt-10 mb-3">
            Conclusion
          </h2>
          <p className="text-base md:text-lg">
            The real estate world continues to evolve — and at Property Ka Gabbar,
            we’re committed to guiding you through every step of the journey.
            Stay tuned for more expert blogs and insights.
          </p>
        </article>
      </motion.section>
    </div>
  );
}
