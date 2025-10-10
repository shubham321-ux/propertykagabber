import { Helmet } from "react-helmet";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSite } from "../context/SiteContext"; // adjust path if different

export default function Seo({ pageName, title, description, keywords, image }) {
  const { pages } = useSite();
  const location = useLocation();

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const slug = location.pathname;
  const pageUrl = `${siteUrl}${slug}`;

  // Find SEO data for this page
  const pageData = useMemo(() => {
    if (!pages || pages.length === 0 || !pageName) return null;
    return pages.find(
      (item) => item.name.toLowerCase() === pageName.toLowerCase()
    );
  }, [pages, pageName]);

  // Merge context + fallback props
  const metaTitle = pageData?.title || title || "MySite - Trusted Builders";
  const metaDesc =
    pageData?.description ||
    description ||
    "Explore premium properties and modern construction projects.";
  const metaKeywords =
    pageData?.keywords ||
    keywords ||
    "builder, real estate, apartments, construction, blogs";
  const metaImage = image || `${siteUrl}/logo192.png`;

  // ✅ Log SEO meta data whenever it changes
  useEffect(() => {
    console.group("%c[SEO Update]", "color:#00c853;font-weight:bold;");
    console.log("Page Name:", pageName);
    console.log("Slug:", slug);
    console.log("Title:", metaTitle);
    console.log("Description:", metaDesc);
    console.log("Keywords:", metaKeywords);
    console.log("Canonical URL:", pageUrl);
    console.groupEnd();
  }, [slug, metaTitle, metaDesc, metaKeywords, pageName]);

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}
