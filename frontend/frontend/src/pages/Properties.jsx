import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProperties } from "../api/api";
import PropertyCard from "../components/PropertyCard";
import Seo from "../components/Seo";
import SectionHeader from "../components/SectionHeader";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Demo fallback data
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
      desc: "Spacious villa surrounded by lush greenery.",
      image: "https://source.unsplash.com/600x400/?villa",
      price: 35000000,
    },
    {
      id: "demo3",
      title: "Commercial Tower",
      desc: "High-rise office space designed for modern enterprises.",
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
      <Seo pageName="Properties" />

      {/* Section Wrapper */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-neutral-light min-h-screen py-24 px-6 mt-20"
      >
        {/* Header */}
        <SectionHeader
          subtitle="Featured Listings"
          title="Explore Our Premium Properties"
          description="Browse through our curated collection of residential and commercial spaces — 
          handpicked for design, comfort, and long-term value."
        />

        {/* Grid / Content */}
        <div className="max-w-6xl mx-auto mt-16">
          {loading ? (
            <div className="text-center text-gray-600 text-lg py-20">
              Loading properties...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 text-lg py-20">{error}</div>
          ) : properties.length === 0 ? (
            <div className="text-center text-gray-600 text-lg py-20">
              No properties available at the moment.
            </div>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <PropertyCard key={p._id || p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </>
  );
}
