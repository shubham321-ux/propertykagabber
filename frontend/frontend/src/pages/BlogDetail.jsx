import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../api/api";
import Seo from "../components/Seo";
import LazyImage from "../components/LazyImage";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlog(id).then(setBlog).catch(console.error);
  }, [id]);

  if (!blog) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="site-container py-10">
      <Seo title={blog.title} description={blog.content.slice(0, 150)} />

      {blog.image && (
        <LazyImage
          src={`${window.location.origin}${blog.image}`}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg shadow-card mb-6"
        />
      )}

      <h1 className="text-4xl font-heading font-bold mb-6">{blog.title}</h1>
      <p className="text-neutral text-lg leading-relaxed">{blog.content}</p>
    </div>
  );
}
