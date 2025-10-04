// src/pages/PageView.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPage } from "../api/api";
import Seo from "../components/Seo";

export default function PageView() {
  const { name } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    getPage(name).then(setPage).catch(console.error);
  }, [name]);

  if (!page) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      <Seo
        title={page.title}
        description={page.description}
        keywords={page.keywords}
      />

      <h2>{page.title}</h2>
      {page.sections.map((sec, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <h3>{sec.heading}</h3>
          <div dangerouslySetInnerHTML={{ __html: sec.content }} />
        </div>
      ))}
    </div>
  );
}
