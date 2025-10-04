import { useEffect, useState } from "react";
import { getBlogs } from "../api/api";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(setBlogs).catch(console.error);
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      <Seo
        title="Blogs - MySite"
        description="Latest news and articles"
        keywords="blogs, news, articles"
      />
      <h2>Latest Blogs</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {blogs.map((b) => (
          <li key={b._id} style={{ marginBottom: "20px" }}>
            <h3>{b.title}</h3>
            {b.image && (
              <img
                src={`${window.location.origin}${b.image}`}
                alt={b.title}
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
              />
            )}
            <p>{b.content.slice(0, 150)}...</p>
            <Link to={`/blogs/${b._id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
