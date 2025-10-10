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

  // ✅ Demo fallback (only if backend has no data)
  const demoProperties = [
    {
      id: "demo1",
      title: "Luxury Apartment",
      desc: "Premium design with stunning facilities.",
      image: "https://source.unsplash.com/600x400/?apartment,1",
      price: 12500000,
    },
    {
      id: "demo2",
      title: "Modern Villa",
      desc: "Spacious villa with greenery views.",
      image: "https://source.unsplash.com/600x400/?villa,2",
      price: 35000000,
    },
    {
      id: "demo3",
      title: "Commercial Tower",
      desc: "High-rise office space for enterprises.",
      image: "https://source.unsplash.com/600x400/?building,3",
      price: 52000000,
    },
  ];

  // ✅ SEO content
  const seoContent = {
    title: "Properties - MySite",
    description:
      "Browse our curated selection of premium properties — apartments, villas, and commercial spaces, built with trust and excellence.",
    keywords:
      "properties, real estate, homes, villas, apartments, commercial buildings, MySite",
  };

  // ✅ Fetch Properties
  useEffect(() => {
    let isMounted = true;
    getProperties()
      .then((data) => {
        if (!isMounted) return;
        const realProps = Array.isArray(data)
          ? data
          : data?.properties || [];

        // ✅ Use demo only if backend empty
        if (realProps.length === 0) {
          setProperties(demoProperties);
        } else {
          setProperties(realProps);
        }
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties");
        setProperties(demoProperties); // fallback only on error
      })
      .finally(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageWrapper bgImage={homeBg} overlayOpacity={0.75}>
      <Seo pageName="properties" />


      {/* Header Section */}
      <motion.section
        className="text-center text-white px-6 py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-heading font-bold mb-4 text-white">
          Available Properties
        </h1>
        <p className="max-w-3xl mx-auto text-neutral-300 text-lg">
          Discover beautifully designed spaces that blend elegance, comfort, and
          functionality — crafted by MySite.
        </p>
      </motion.section>

      {/* Property Grid */}
      <motion.section
        className="px-6 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {loading ? (
          <div className="text-center text-neutral-300 text-lg py-20">
            Loading properties...
          </div>
        ) : error ? (
          <div className="text-center text-red-400 text-lg py-20">{error}</div>
        ) : properties.length === 0 ? (
          <div className="text-center text-neutral-300 text-lg py-20">
            No properties available.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {properties.map((p) => (
              <PropertyCard key={p._id || p.id} property={p} />
            ))}
          </div>
        )}
      </motion.section>
    </PageWrapper>
  );
}
