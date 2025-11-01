import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import SectionHeader from "../components/SectionHeader";
import PropertyCard from "../components/PropertyCard";
import BlogCard from "../components/BlogCard";
import LazyImage from "../components/LazyImage"; 
import { getProperties, getBlogs } from "../api/api";
import Hero from "../components/Hero";

import livingRoom from "../assets/propert1.jpg";
import "./css/typewriter.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};



// SEARCH BAR
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
    <Link to="/properties">
      <button className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition">
        Find Now
      </button>
    </Link>
  </div>
);

// ABOUT SECTION
const AboutSection = () => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="container mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-10"
  >
    <div className="w-full md:w-[45%] flex justify-center">
      <LazyImage
        src={livingRoom}
        alt="Modern Living Room"
        className="w-full max-w-sm rounded-md shadow-md object-cover"
      />
    </div>

    <div className="w-full md:w-[55%]">
      <p className="text-orange-500 font-semibold mb-2">About Us</p>
      <h2 className="text-3xl font-bold mb-4">
        Redefining Real Estate with Trust & Transparency
      </h2>
      <p className="text-gray-500 mb-4">
        We are a new-age real estate platform that simplifies property buying,
        selling, and renting — bringing verified listings directly from owners
        across Mohali, Zirakpur, and Kharar. Our mission is to deliver a
        seamless, transparent, and commission-free experience to every client.
      </p>

      <ul className="text-gray-600 mb-6 space-y-2">
        <li> Smart, modern home designs for comfortable living</li>
        <li> Peaceful and well-connected neighborhoods</li>
        <li> Luxury amenities for a refined lifestyle</li>
        <li> Full support and verified documentation</li>
      </ul>

      <Link to="/about-us">
        <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition">
          Learn More
        </button>
      </Link>
    </div>
  </motion.section>
);

// COUNT-UP HOOK
function useCountUpOnView(target, options = { duration: 1.2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const end = target;
        const duration = options.duration * 1000;
        const stepTime = 10;
        const increment = (end - start) / (duration / stepTime);
        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            clearInterval(counter);
            setCount(end);
          } else {
            setCount(Math.floor(start));
          }
        }, stepTime);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, options.duration, hasAnimated]);

  return [count, ref];
}

// STATS SECTION
const StatsSection = () => {
  const stats = [
    { number: 560, label: "Total Area (sq. ft.)" },
    { number: 197, label: "Homes Sold" },
    { number: 268, label: "Projects Completed" },
    { number: 340, label: "Happy Families" },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto flex flex-wrap justify-center gap-12 md:gap-16 px-4">
        {stats.map((item, idx) => {
          const [count, ref] = useCountUpOnView(item.number, { duration: 1 });
          return (
            <motion.div
              key={idx}
              ref={ref}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="w-36 sm:w-44 md:w-48 bg-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-center p-6"
            >
              <h3 className="text-3xl font-extrabold text-orange-500 mb-2">
                {count}
                <span className="text-orange-400">+</span>
              </h3>
              <p className="text-gray-600 text-sm font-medium">{item.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

// WHY CHOOSE US
const WhyChooseUs = () => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="bg-white py-20 px-6 text-center"
  >
    <SectionHeader
      label="Why Choose Us"
      title="Your Trusted Real Estate Partner"
      subtitle="We prioritize your trust and satisfaction through transparent, verified, and seamless property services."
    />
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
      {[
        {
          title: "Zero Brokerage",
          desc: "Connect directly with property owners — no middlemen, no hidden costs.",
        },
        {
          title: "Verified Listings",
          desc: "Each property is checked for authenticity, documents, and ownership clarity.",
        },
        {
          title: "Expert Guidance",
          desc: "Our team supports you through every step — from search to final transaction.",
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className="bg-neutral-light rounded-xl p-6 shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {item.title}
          </h3>
          <p className="text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  </motion.section>
);

// TESTIMONIALS
const Testimonials = () => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="bg-neutral-light py-20 px-6 text-center"
  >
    <SectionHeader
      label="Testimonials"
      title="What Our Clients Say"
      subtitle="We’re proud to have earned the trust of thousands of property owners and buyers."
    />
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
      {[
        {
          name: "Ravi Sharma",
          feedback:
            "I sold my property in Mohali within a week! Transparent process and no brokerage at all.",
        },
        {
          name: "Neha Verma",
          feedback:
            "The listings were genuine and verified. It saved me a lot of time and effort while buying.",
        },
        {
          name: "Amit Singh",
          feedback:
            "Fantastic service! I found my dream home in Zirakpur without any middlemen.",
        },
      ].map((client, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6"
        >
          <p className="text-gray-600 italic mb-4">“{client.feedback}”</p>
          <h4 className="font-semibold text-gray-800">{client.name}</h4>
        </div>
      ))}
    </div>
  </motion.section>
);

// FINAL CTA
const FinalCTA = () => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="bg-orange-500 text-white py-20 px-6 text-left md:text-center"
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Join PropertyKaGabbar Today
    </h2>
    <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">
      Experience real estate the smart way — verified properties, zero
      brokerage, and complete transparency.
    </p>
    <Link to="/contact">
      <button className="bg-white text-orange-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
        Contact Us
      </button>
    </Link>
  </motion.section>
);




// MAIN HOME PAGE
export default function Home() {
  const [featuredProps, setFeaturedProps] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  const demoProperties = [
    {
      id: "demo1",
      title: "2BHK Modern Apartment",
      desc: "Affordable, well-designed homes in Mohali ideal for small families.",
      image: "https://source.unsplash.com/600x400/?apartment,home",
    },
    {
      id: "demo2",
      title: "3BHK Premium Villa",
      desc: "Elegant villa surrounded by greenery and open space in Zirakpur.",
      image: "https://source.unsplash.com/600x400/?villa,interior",
    },
    {
      id: "demo3",
      title: "5BHK Luxury Kothi",
      desc: "Spacious, modern architecture offering comfort and exclusivity.",
      image: "https://source.unsplash.com/600x400/?house,luxury",
    },
  ];

  const demoBlogs = [
    {
      id: "demo1",
      title: "Why Choose Direct Owner Deals?",
      content:
        "Save brokerage and connect directly with verified property owners for secure transactions.",
      image: "https://source.unsplash.com/600x400/?real-estate,owner",
    },
    {
      id: "demo2",
      title: "Steps to Verify a Property Legally",
      content:
        "Learn how to validate ownership documents before making your investment.",
      image: "https://source.unsplash.com/600x400/?documents,home",
    },
    {
      id: "demo3",
      title: "Top Locations to Buy Homes in Tricity",
      content:
        "Explore Mohali, Zirakpur, and Kharar — the fastest-growing real estate hubs.",
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

  return (
    <>
      <Seo
        pageName="home"
        title="PropertyKaGabbar – Verified Real Estate in Tricity"
        description="Buy or rent verified properties directly from owners — zero brokerage, complete transparency."
        keywords="PropertyKaGabbar, real estate, zero brokerage, Mohali, Zirakpur, Kharar, direct owner property"
      />

      <Hero />
      <SearchBar />
      <AboutSection />
      <StatsSection />

      {/* Featured Properties */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-neutral-light py-20 px-6 text-center"
      >
        <SectionHeader
          label="Featured Listings"
          title="Explore Our Top Properties"
          subtitle="Handpicked residential and commercial properties tailored to your lifestyle."
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
        className="bg-neutral-light py-20 px-6 text-center"
      >
        <SectionHeader
          label="Our Blog"
          title="Latest Insights & Real Estate Tips"
          subtitle="Stay informed with our expert advice, market updates, and home-buying guides."
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {featuredBlogs.map((b) => (
            <BlogCard key={b._id || b.id} blog={b} />
          ))}
        </div>
      </motion.section>

      {/* Static Sections */}
      <WhyChooseUs />

   {/* Contact Section */}
<motion.section
  variants={fadeInUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="bg-neutral-light py-20 px-6 text-left md:text-center"
>
  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
    Get in Touch
  </h2>

  <p className="text-gray-500 text-base md:text-lg mb-10 md:max-w-2xl md:mx-auto">
    Looking for your next property in{" "}
    <span className="text-orange-500 font-semibold">Mohali</span>,{" "}
    <span className="text-orange-500 font-semibold">Zirakpur</span>, or{" "}
    <span className="text-orange-500 font-semibold">Kharar</span>? Reach out to
    our team today — we’ll help you make the right move with confidence.
  </p>

  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 max-w-lg mx-auto py-10 px-8 text-left md:text-center">
    <div className="space-y-4 text-gray-700 text-base md:text-lg">
      <p>
        <strong className="text-gray-800">Call Us:</strong>{" "}
        <a href="tel:7710110100" className="text-orange-500 hover:underline">
          7710110100
        </a>
      </p>
      <p>
        <strong className="text-gray-800">Email:</strong>{" "}
        <a
          href="mailto:info@propertykagabbar.com"
          className="text-orange-500 hover:underline"
        >
          info@propertykagabbar.com
        </a>
      </p>
      <p>
        <strong className="text-gray-800">Website:</strong>{" "}
        <a
          href="https://www.propertykagabbar.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:underline"
        >
          www.propertykagabbar.com
        </a>
      </p>
    </div>
  </div>
</motion.section>


      <Testimonials />
      <FinalCTA />
    </>
  );
}
