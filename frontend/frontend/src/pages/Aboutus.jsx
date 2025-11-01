import { motion } from "framer-motion";
import Seo from "../components/Seo";
import property2 from "../assets/property2.jpg";
import LazyImage from "../components/LazyImage";

export default function About() {
  const story = {
    heading: "Our Story",
    description: `PropertyKaGabbar began with one mission — to make real estate simple, transparent, and commission-free. 
    What started as a small team in Mohali with deep local expertise has grown into a trusted platform for direct property transactions across Tricity — Mohali, Zirakpur, and Kharar. 
    We empower property owners and buyers to connect directly, eliminating brokers and ensuring that every deal is transparent, verified, and secure.`,
  };

  const mission = {
    heading: "Our Mission",
    description: `To redefine how people buy, sell, and rent properties by offering a platform that is direct, verified, and trustworthy. 
    Our mission is to empower every property owner and buyer with the tools, transparency, and support they need to make confident real estate decisions.`,
  };

  const values = [
    {
      title: "Integrity",
      desc: "We operate with transparency and honesty, ensuring our clients receive complete clarity at every step.",
    },
    {
      title: "Innovation",
      desc: "We leverage modern technology and verified data to make property discovery and management easier than ever.",
    },
    {
      title: "Commitment",
      desc: "Our team is dedicated to quality, professionalism, and reliability — building long-term trust with every interaction.",
    },
    {
      title: "Customer Focus",
      desc: "Your satisfaction drives us. We prioritize your needs to deliver a seamless and genuine real estate experience.",
    },
  ];

  const achievements = [
    "10+ years of combined experience in real estate and consulting.",
    "1000+ verified listings across Mohali, Zirakpur, and Kharar.",
    "Introduced zero-brokerage property transactions in Tricity.",
    "Trusted by thousands for secure, transparent property dealings.",
  ];

  return (
    <div className="bg-neutral-light text-neutral-dark min-h-screen mt-28">
      <Seo
        pageName="About Us"
        title="About – PropertyKaGabbar | Redefining Real Estate in Tricity"
        description="Discover how PropertyKaGabbar is transforming real estate in Mohali, Zirakpur, and Kharar — with verified listings, zero brokerage, and direct owner connections."
        keywords="PropertyKaGabbar, about PropertyKaGabbar, real estate Mohali, zero brokerage, verified property, buy home Zirakpur, Kharar real estate"
      />

      {/* HERO SECTION */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Left Text */}
        <div className="md:w-1/2 space-y-6 text-left">
          <h5 className="text-orange-500 font-semibold tracking-wide uppercase">
            About Us
          </h5>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
            Building Trust, One Home at a Time
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            At PropertyKaGabbar, we’re reshaping real estate through verified
            listings, direct owner connections, and complete transparency —
            ensuring every transaction is fair, fast, and stress-free.
          </p>
        </div>

        {/* Right Image (Lazy Loaded) */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <LazyImage
            src={property2}
            alt="About PropertyKaGabbar"
            className="rounded-1xl w-full object-cover h-[360px] md:h-[420px] shadow-lg"
          />
        </motion.div>
      </motion.section>

      {/* STORY SECTION */}
      <motion.section
        className="max-w-5xl mx-auto py-16 px-6 text-left md:text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          {story.heading}
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          {story.description}
        </p>
      </motion.section>

      {/* MISSION SECTION */}
      <motion.section
        className="max-w-5xl mx-auto py-16 px-6 text-left md:text-center bg-white rounded-2xl border border-neutral-200 shadow-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          {mission.heading}
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          {mission.description}
        </p>
      </motion.section>

      {/* VALUES SECTION */}
      <motion.section
        className="max-w-6xl mx-auto py-20 px-6 text-left md:text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white border border-neutral-200 p-6 rounded-xl hover:shadow-md transition text-left"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {v.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ACHIEVEMENTS SECTION */}
      <motion.section
        className="max-w-5xl mx-auto py-20 px-6 text-left md:text-center mb-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Our Achievements
        </h2>
        <ul className="space-y-4 text-gray-700 text-lg max-w-3xl mx-auto">
          {achievements.map((item, i) => (
            <li
              key={i}
              className="bg-white p-5 rounded-xl border border-neutral-200 hover:bg-neutral-light transition text-left md:text-center"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.section>
    </div>
  );
}
