import { motion } from "framer-motion";
import Seo from "../components/Seo";
import aboutBg from "../assets/homePic.jpg"; // your existing hero image

export default function About() {
  const story = {
    heading: "Our Story",
    description: `Founded over a decade ago, MySite has grown into a trusted name in real estate and construction.
    With a commitment to excellence and customer satisfaction, we have delivered premium homes, commercial spaces, and landmark projects that redefine quality and innovation.`,
  };

  const mission = {
    heading: "Our Mission",
    description: `To create sustainable, high-quality spaces that enrich lives. 
    We believe in designing structures that combine aesthetics, functionality, and eco-conscious development.`,
  };

  const values = [
    { title: "Integrity", desc: "We value honesty and transparency in every project and partnership." },
    { title: "Innovation", desc: "Our approach blends modern architecture with smart technologies for future-ready spaces." },
    { title: "Commitment", desc: "Delivering on our promises with unwavering dedication to quality and timelines." },
    { title: "Customer Focus", desc: "Your satisfaction drives us to craft better, smarter living and working environments." },
  ];

  const achievements = [
    "10+ years of excellence in real estate and construction.",
    "Over 50 successful residential and commercial projects completed.",
    "Award-winning designs recognized for innovation and sustainability.",
    "A strong community of happy homeowners and satisfied clients.",
  ];

  return (
    <div className="bg-white text-neutral-dark">
      <Seo pageName="aboutUs" />

      {/* HERO SECTION */}
      <motion.section
        className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto py-20 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left Text */}
        <div className="md:w-1/2 text-center md:text-left space-y-5">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark">
            About Us
          </h1>
          <p className="text-lg text-neutral leading-relaxed">
            Building trust, one project at a time — discover who we are and what drives our passion for construction excellence.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-end">
          <img
            src={aboutBg}
            alt="About us"
            className="rounded-2xl shadow-card w-full md:w-[85%] object-cover"
          />
        </div>
      </motion.section>

      {/* STORY SECTION */}
      <motion.section
        className="max-w-5xl mx-auto py-16 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">{story.heading}</h2>
        <p className="text-neutral text-lg leading-relaxed">{story.description}</p>
      </motion.section>

      {/* MISSION SECTION */}
      <motion.section
        className="max-w-5xl mx-auto py-16 px-6 text-center bg-neutral-light/40 rounded-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">{mission.heading}</h2>
        <p className="text-neutral text-lg leading-relaxed">{mission.description}</p>
      </motion.section>

      {/* VALUES SECTION */}
      <motion.section
        className="max-w-6xl mx-auto py-20 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-10">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white border border-neutral-light p-6 rounded-xl shadow-card hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">{v.title}</h3>
              <p className="text-neutral">{v.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ACHIEVEMENTS SECTION */}
      <motion.section
        className="max-w-5xl mx-auto py-20 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-8">
          Our Achievements
        </h2>
        <ul className="space-y-4 text-neutral text-lg">
          {achievements.map((item, i) => (
            <li
              key={i}
              className="bg-neutral-light/50 p-4 rounded-lg border border-neutral-light hover:bg-neutral-light transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.section>
    </div>
  );
}
