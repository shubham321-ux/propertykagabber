import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import PageWrapper from "../components/PageWrapper";
import PropertyCard from "../components/PropertyCard";
import BlogCard from "../components/BlogCard";
import homeBg from "../assets/homePic.jpg";
import { useEffect, useState } from "react";
import { getProperties, getBlogs } from "../api/api";
import "./css/typewriter.css";

export default function Home() {
  const seoContent = {
    title: "Home - MySite",
    description:
      "Explore premium properties, read inspiring blogs, and discover more about our builder services. Quality construction, modern design, and trust you can rely on.",
    keywords:
      "real estate, builder, properties, blogs, construction, home, apartments",
  };

  const aboutContent = {
    heading: "Who We Are",
    description: `At MySite, we specialize in creating spaces that combine innovation and quality. 
    From residential buildings to large commercial projects, our vision is to deliver excellence in every brick.`,
  };

  const visionContent = {
    heading: "Our Vision",
    description: `We aim to redefine the urban landscape through sustainable, innovative, and community-driven projects. 
    Every structure we create reflects our core values — trust, creativity, and long-term quality.`,
  };

  const processSteps = [
    {
      step: "01",
      title: "Planning & Design",
      desc: "We analyze your needs and craft bespoke designs that maximize both functionality and beauty.",
    },
    {
      step: "02",
      title: "Execution & Construction",
      desc: "Our expert engineers and craftsmen bring your vision to life with precision and reliability.",
    },
    {
      step: "03",
      title: "Quality & Handover",
      desc: "Each project undergoes thorough inspections to ensure safety, durability, and satisfaction.",
    },
  ];

  const reasons = [
    "Over a decade of trusted expertise in real estate and construction.",
    "Modern designs blending innovation with comfort and practicality.",
    "Dedicated project management with transparent communication.",
    "Sustainable, energy-efficient construction for the future.",
  ];

  const testimonials = [
    {
      name: "Rohit Verma",
      review:
        "MySite made my dream home a reality — timely delivery, great design, and complete professionalism throughout!",
    },
    {
      name: "Sneha Iyer",
      review:
        "The attention to detail and quality craftsmanship were impressive. The team truly understands modern living.",
    },
    {
      name: "Arjun Patel",
      review:
        "Superb experience from start to finish. Transparent pricing, great support, and fantastic finishing quality!",
    },
  ];

  // Demo properties
  const demoProperties = [
    { id: "demo1", title: "Luxury Apartment", desc: "Premium design with stunning facilities.", image: "https://source.unsplash.com/600x400/?apartment,1" },
    { id: "demo2", title: "Modern Villa", desc: "Spacious villa with greenery views.", image: "https://source.unsplash.com/600x400/?villa,2" },
    { id: "demo3", title: "Commercial Tower", desc: "High-rise office space for enterprises.", image: "https://source.unsplash.com/600x400/?building,3" },
  ];

  // Demo blogs
  const demoBlogs = [
    { id: "demo1", title: "Inspiring Architecture", content: "Explore ideas shaping the future of modern design.", image: "https://source.unsplash.com/600x400/?architecture,1" },
    { id: "demo2", title: "Smart Homes Trend", content: "How technology is changing the way we live.", image: "https://source.unsplash.com/600x400/?smart-home,2" },
    { id: "demo3", title: "Urban Development", content: "Cities of tomorrow: what will they look like?", image: "https://source.unsplash.com/600x400/?city,3" },
  ];

  const [featuredProps, setFeaturedProps] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  // Load data
  useEffect(() => {
    getProperties()
      .then((data) => {
        const realProps = Array.isArray(data) ? data : data.properties || [];
        const combined = [
          ...realProps.slice(0, 3),
          ...demoProperties.slice(realProps.length, 3),
        ];
        setFeaturedProps(combined);
      })
      .catch(() => setFeaturedProps(demoProperties));
  }, []);

  useEffect(() => {
    getBlogs()
      .then((data) => {
        const realBlogs = Array.isArray(data) ? data : data.blogs || [];
        const combined = [
          ...realBlogs.slice(0, 3),
          ...demoBlogs.slice(realBlogs.length, 3),
        ];
        setFeaturedBlogs(combined);
      })
      .catch(() => setFeaturedBlogs(demoBlogs));
  }, []);

  return (
    <PageWrapper bgImage={homeBg} overlayOpacity={0.75}>
     <Seo pageName="home" />

      <Hero />

      {/* About Section */}
      <motion.section
        className="text-center text-white px-6 max-w-5xl mx-auto py-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold mb-4 text-white">
          {aboutContent.heading}
        </h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-neutral-200">
          {aboutContent.description}
        </p>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        className="text-center text-white px-6 max-w-5xl mx-auto py-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold mb-4 text-white">
          {visionContent.heading}
        </h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-neutral-200">
          {visionContent.description}
        </p>
      </motion.section>

      {/* Our Process */}
      <motion.section
        className="px-6 py-12 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold text-center mb-8 text-white">
          Our Process
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {processSteps.map((step) => (
            <motion.div
              key={step.step}
              className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-accent text-5xl font-bold mb-3">{step.step}</div>
              <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-neutral-200 text-base">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="text-white px-6 py-12 max-w-5xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold mb-6 text-white">
          Why Choose Us
        </h2>
        <ul className="space-y-3 text-lg text-neutral-200">
          {reasons.map((r, i) => (
            <li
              key={i}
              className="backdrop-blur-sm bg-white/10 border border-white/10 p-4 rounded-lg hover:bg-white/20 transition"
            >
              {r}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Featured Properties */}
      <motion.section
        className="px-6 py-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold text-white text-center mb-6">
          Featured Properties
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProps.map((p) => (
            <PropertyCard key={p._id || p.id} property={p} />
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="px-6 py-12 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold mb-8 text-white">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition"
            >
              <p className="text-neutral-100 italic mb-3">“{t.review}”</p>
              <h4 className="text-accent font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Latest Blogs */}
      <motion.section
        className="px-6 pb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold text-white text-center mb-6">
          Latest Blogs
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBlogs.map((b) => (
            <BlogCard key={b._id || b.id} blog={b} />
          ))}
        </div>
      </motion.section>
    </PageWrapper>
  );
}
