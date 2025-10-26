import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProperties } from "../api/api";
import PropertyCard from "../components/PropertyCard";
import Seo from "../components/Seo";
import PageWrapper from "../components/PageWrapper";
import homeBg from "../assets/homePic.jpg";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Demo fallback
  const demoProperties = [
    {
      id: "demo1",
      title: "Luxury Apartment",
      desc: "Premium design with stunning facilities.",
      image: "https://source.unsplash.com/600x400/?apartment",
      price: 12500000,
    },
    {
      id: "demo2",
      title: "Modern Villa",
      desc: "Spacious villa with greenery views.",
      image: "https://source.unsplash.com/600x400/?villa",
      price: 35000000,
    },
    {
      id: "demo3",
      title: "Commercial Tower",
      desc: "High-rise office space for enterprises.",
      image: "https://source.unsplash.com/600x400/?building",
      price: 52000000,
    },
  ];

  useEffect(() => {
    let mounted = true;
    getProperties()
      .then((data) => {
        if (!mounted) return;
        const realProps = Array.isArray(data) ? data : data?.properties || [];
        setProperties(realProps.length > 0 ? realProps : demoProperties);
      })
      .catch(() => {
        setError("Failed to load properties");
        setProperties(demoProperties);
      })
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Seo pageName="properties" />

      {/* HERO / HEADER */}
      <motion.section
        className="max-w-6xl mx-auto text-center py-24 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-primary-dark">
          Explore Our Premium Properties
        </h1>
        <p className="max-w-3xl mx-auto text-neutral text-lg">
          Discover beautifully crafted homes and commercial spaces built with
          innovation, elegance, and trust.
        </p>
      </motion.section>

      {/* GRID SECTION */}
      <motion.section
        className="bg-white px-6 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {loading ? (
          <div className="text-center text-neutral text-lg py-20">
            Loading properties...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg py-20">{error}</div>
        ) : properties.length === 0 ? (
          <div className="text-center text-neutral text-lg py-20">
            No properties available.
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {properties.map((p) => (
              <PropertyCard key={p._id || p.id} property={p} />
            ))}
          </div>
        )}
      </motion.section>
   </>
  );
}
