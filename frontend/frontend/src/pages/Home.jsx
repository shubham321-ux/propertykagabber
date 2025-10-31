import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Seo from "../components/Seo";
import PropertyCard from "../components/PropertyCard";
import BlogCard from "../components/BlogCard";
import { getProperties, getBlogs } from "../api/api";

import houseImg from "../assets/homePic.jpg";
import livingRoom from "../assets/propert1.jpg";
import "./css/typewriter.css";

// ========== Hook: Animated Counter ==========
const useCountUpOnView = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const progressPercent = Math.min(progress / duration, 1);
            setCount(Math.floor(progressPercent * target));
            if (progressPercent < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, started]);

  return [count, ref];
};

// ========== Animation Preset ==========
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// ========== Hero Section ==========
const HeroSection = () => (
  <section className="flex flex-col md:flex-row items-center justify-between container mx-auto py-16 px-4">
    <div className="max-w-lg">
      <p className="text-orange-500 font-semibold mb-2">Real Estate Agency</p>
      <h1 className="text-4xl font-bold mb-4">Find Your Dream House By Us</h1>
      <p className="text-gray-500 mb-6">
        Discover verified homes directly from property owners — no agents, no commissions.
      </p>
      <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition">
        View Properties
      </button>
    </div>
    <div>
      <img src={houseImg} alt="House" className="max-w-md w-full rounded-lg shadow-lg" />
    </div>
  </section>
);

// ========== Search Bar ==========
const SearchBar = () => (
  <div className="bg-white shadow-md rounded-lg p-5 -mt-8 z-10 relative container mx-auto flex flex-wrap justify-center gap-3">
    <select className="border p-2 rounded w-40">
      <option>Choose Area</option>
    </select>
    <select className="border p-2 rounded w-40">
      <option>Property Status</option>
    </select>
    <select className="border p-2 rounded w-40">
      <option>Property Type</option>
    </select>
    <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition">
      Find Now
    </button>
  </div>
);

// ========== About Section ==========
const AboutSection = () => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="container mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-8"
  >
    <div className="relative">
      <img src={livingRoom} alt="Living Room" className="rounded-lg shadow-lg" />
      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md">
        ▶
      </button>
    </div>
    <div>
      <p className="text-orange-500 font-semibold mb-2">About Us</p>
      <h2 className="text-3xl font-bold mb-4">
        The Leading Real Estate Rental Marketplace
      </h2>
      <p className="text-gray-500 mb-4">
        Over 39,000 people work for us in more than 70 countries all over the world.
      </p>
      <ul className="text-gray-600 mb-4 space-y-2">
        <li>🏠 Smart Home Design</li>
        <li>🌇 Beautiful Scene Around</li>
        <li>✨ Exceptional Lifestyle</li>
        <li>🛡️ Complete 24/7 Security</li>
      </ul>
      <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition">
        Know More
      </button>
    </div>
  </motion.section>
);

// ========== Stats Section ==========
const StatsSection = () => {
  const stats = [
    { number: 560, label: "Total Area Sq" },
    { number: 197, label: "Apartments Sold" },
    { number: 268, label: "Total Constructions" },
    { number: 340, label: "Apartio Rooms" },
  ];
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto flex flex-wrap justify-around">
        {stats.map((item, idx) => {
          const [count, ref] = useCountUpOnView(item.number);
          return (
            <div key={idx} className="text-center p-4" ref={ref}>
              <h3 className="text-3xl font-bold text-orange-500">{count}</h3>
              <p className="text-gray-600">{item.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ========== Main Home Page ==========
export default function Home() {
  const [featuredProps, setFeaturedProps] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  // Demo fallback data
  const demoProperties = [
    {
      id: "demo1",
      title: "2BHK Family Apartment",
      desc: "Affordable and cozy homes for small families in Mohali.",
      image: "https://source.unsplash.com/600x400/?apartment,home",
    },
    {
      id: "demo2",
      title: "3BHK Luxury Villa",
      desc: "Spacious and elegant villa with green surroundings.",
      image: "https://source.unsplash.com/600x400/?villa,interior",
    },
    {
      id: "demo3",
      title: "5BHK Premium Kothi",
      desc: "Grand living spaces with modern architecture in Zirakpur.",
      image: "https://source.unsplash.com/600x400/?house,luxury",
    },
  ];

  const demoBlogs = [
    {
      id: "demo1",
      title: "Why Choose Direct Owner Deals?",
      content:
        "Avoid commission and connect directly with genuine property owners.",
      image: "https://source.unsplash.com/600x400/?real-estate,owner",
    },
    {
      id: "demo2",
      title: "How to Verify Property Legally",
      content: "Simple steps to ensure you’re buying a verified property.",
      image: "https://source.unsplash.com/600x400/?documents,home",
    },
    {
      id: "demo3",
      title: "Top Areas to Buy Homes in Tricity",
      content:
        "Explore Mohali, Zirakpur, and Kharar’s most promising locations.",
      image: "https://source.unsplash.com/600x400/?city,realestate",
    },
  ];

  // Fetch data with fallback
  useEffect(() => {
    getProperties()
      .then((data) => {
        const realProps = Array.isArray(data) ? data : data.properties || [];
        setFeaturedProps([
          ...realProps.slice(0, 3),
          ...demoProperties.slice(realProps.length, 3),
        ]);
      })
      .catch(() => setFeaturedProps(demoProperties));
  }, []);

  useEffect(() => {
    getBlogs()
      .then((data) => {
        const realBlogs = Array.isArray(data) ? data : data.blogs || [];
        setFeaturedBlogs([
          ...realBlogs.slice(0, 3),
          ...demoBlogs.slice(realBlogs.length, 3),
        ]);
      })
      .catch(() => setFeaturedBlogs(demoBlogs));
  }, []);

  return (
    <>
      <Seo
        pageName="home"
        title="Quarter – Find Your Dream House With Zero Brokerage"
        description="Buy or rent verified properties directly from owners — no commission, no hidden fees."
        keywords="Quarter real estate, zero brokerage, direct owner properties, Mohali, Zirakpur, Kharar"
      />

      {/* Modern hero & top sections */}
      <HeroSection />
      <SearchBar />
      <AboutSection />
      <StatsSection />

      {/* Explore Properties */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-neutral-light py-20 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-10">
          Explore Properties
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {featuredProps.map((p) => (
            <PropertyCard key={p._id || p.id} property={p} />
          ))}
        </div>
      </motion.section>

      {/* Latest Blogs */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-white py-20 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-10">
          Latest Blogs
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {featuredBlogs.map((b) => (
            <BlogCard key={b._id || b.id} blog={b} />
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-gray-50 py-20 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-500">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
          Ready to find your dream property in Mohali, Zirakpur, or Kharar?
          Let’s make it happen — the direct and honest way.
        </p>
        <div className="text-lg text-gray-700 space-y-3">
          <p>📱 <strong>Call Us:</strong> 7710110100</p>
          <p>📧 <strong>Email:</strong> info@propertykagabbar.com</p>
          <p>🌐 <strong>Visit:</strong> www.propertykagabbar.com</p>
        </div>
      </motion.section>
    </>
  );
}
