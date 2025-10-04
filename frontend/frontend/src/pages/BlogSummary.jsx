import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlog } from "../api/api";
import Seo from "../components/Seo";
import LazyImage from "../components/LazyImage";

export default function BlogSummary() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlog(id).then(setBlog).catch(console.error);
  }, [id]);

  if (!blog) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="site-container py-10">
      <Seo title={blog.title} description={blog.title} />
      {blog.image && (
        <LazyImage
          src={`${window.location.origin}${blog.image}`}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-lg shadow-card mb-6"
        />
      )}
      <h1 className="text-3xl font-heading font-bold mb-6">{blog.title}</h1>
      <Link
        to={`/blogs/${blog._id}`}
        className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition"
      >
        Read Full Blog →
      </Link>
    </div>
  );
}
