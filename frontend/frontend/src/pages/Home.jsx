import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import Hero from "./Hero"; // keep your Hero section with clean light background
import PropertyCard from "../components/PropertyCard";
import BlogCard from "../components/BlogCard";
import { getProperties, getBlogs } from "../api/api";
import homeBg from "../assets/homePic.jpg";
import "./css/typewriter.css";

export default function Home() {
  const [featuredProps, setFeaturedProps] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

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
      content: "Explore Mohali, Zirakpur, and Kharar’s most promising locations.",
      image: "https://source.unsplash.com/600x400/?city,realestate",
    },
  ];

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      <Seo
      pageName={'home'}
        title="Property Ka Gabbar – No Commission. No Brokerage. Direct Deals from Owners"
        description="Buy or sell homes directly from owners in Mohali, Zirakpur, and Kharar — 100% transparent, zero brokerage property platform."
        keywords="Property Ka Gabbar, no brokerage homes, direct owner properties Mohali, property in Zirakpur, buy home without commission, real estate Tricity"
      />

      {/* ✅ Hero Section */}
      <Hero />

      {/* ✅ About Property Ka Gabbar */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center text-neutral-dark px-6 py-20"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary-dark">
          Property Ka Gabbar
        </h2>
        <p className="max-w-3xl mx-auto text-neutral text-lg leading-relaxed mb-6">
          <strong>No Commission. No Brokerage. Direct Deals from Owners.</strong>
          <br />
          Buying or selling a home is one of the biggest decisions in life —
          but why should it come with heavy brokerage fees? At Property Ka
          Gabbar, we’ve made real estate simple, transparent, and
          commission-free.
        </p>
        <p className="max-w-3xl mx-auto text-neutral text-lg leading-relaxed">
          We connect buyers directly with genuine property owners so you can
          find your dream home without paying a single rupee in brokerage.
          Whether you’re looking for a 2BHK, 3BHK, or luxurious 5BHK kothi in
          Mohali, Zirakpur, or Kharar — we make sure your experience is smooth,
          safe, and rewarding.
        </p>
      </motion.section>

      {/* ✅ About / Vision Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-neutral-light py-20 text-neutral-dark"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-primary-dark">
            About Property Ka Gabbar
          </h2>
          <p className="max-w-4xl mx-auto text-lg mb-6 leading-relaxed text-neutral">
            Property Ka Gabbar was born with one simple idea — to end the
            culture of high commissions and hidden charges in real estate. For
            too long, buyers have been paying huge fees to middlemen for
            something that should be a direct, honest deal.
          </p>
          <p className="max-w-4xl mx-auto text-lg mb-6 leading-relaxed text-neutral">
            Our platform connects buyers and sellers directly, helping you
            discover verified listings, save thousands in brokerage, and enjoy
            transparent communication with property owners.
          </p>
          <h3 className="text-3xl font-bold text-primary-dark mt-10 mb-4">
            Our Vision
          </h3>
          <p className="max-w-4xl mx-auto text-lg text-neutral">
            To create a transparent and fair real estate ecosystem where every
            buyer and seller can deal directly — without fear of fraud, inflated
            prices, or hidden fees.
          </p>
        </div>
      </motion.section>

      {/* ✅ Why Choose Property Ka Gabbar */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-6 bg-white text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-10 text-primary-dark">
          Why Choose <span className="text-accent">Property Ka Gabbar</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            "Zero Commission – You pay only for your home, not someone’s commission.",
            "Verified Listings – Every property is personally verified by our team.",
            "Local Expertise – Specialists in Mohali, Zirakpur, and Kharar.",
            "Direct Owner Communication – No agents, no manipulation, just honest deals.",
            "End-to-End Support – Assistance with documentation, visits, and verification.",
            "Wide Range – From 2BHK to luxury 5BHK kothis and plots.",
          ].map((reason, i) => (
            <div
              key={i}
              className="bg-neutral-light border border-neutral-200 rounded-xl p-6 shadow-card hover:shadow-lg transition"
            >
              <p className="text-lg text-neutral-dark">{reason}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ✅ Featured Properties */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-neutral-light py-20 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-10">
          Explore Properties
        </h2>
        <p className="max-w-3xl mx-auto mb-12 text-neutral text-lg">
          Find real homes, real prices, and real owners — no fake listings, no
          hidden costs.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {featuredProps.map((p) => (
            <PropertyCard key={p._id || p.id} property={p} />
          ))}
        </div>
      </motion.section>

      {/* ✅ Blogs Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-white py-20 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-10">
          Latest Blogs
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {featuredBlogs.map((b) => (
            <BlogCard key={b._id || b.id} blog={b} />
          ))}
        </div>
      </motion.section>

      {/* ✅ Contact Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-neutral-light py-20 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary-dark">
          Get in Touch
        </h2>
        <p className="text-neutral text-lg mb-8 max-w-3xl mx-auto">
          Ready to find your dream property in Mohali, Zirakpur, or Kharar?  
          Let’s make it happen — the direct and honest way.
        </p>
        <div className="text-lg text-neutral-dark space-y-3">
          <p>📱 <strong>Call Us:</strong> 7710110100</p>
          <p>📧 <strong>Email:</strong> info@propertykagabbar.com</p>
          <p>🌐 <strong>Visit:</strong> www.propertykagabbar.com</p>
        </div>
        <p className="mt-10 text-primary-dark font-semibold text-xl">
          Property Ka Gabbar – Real Homes. Real People. Real Deals.
        </p>
      </motion.section>
    </>
  );
}
