import { motion } from "framer-motion";
import Seo from "../components/Seo";
import PageWrapper from "../components/PageWrapper";
import aboutBg from "../assets/homePic.jpg"; // you can replace with a new about image

export default function About() {
  const seoContent = {
    title: "About Us - MySite",
    description:
      "Learn more about MySite — our story, mission, values, and the team dedicated to building exceptional real estate projects.",
    keywords:
      "about, real estate, builders, mission, team, company profile, construction",
  };

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
    {
      title: "Integrity",
      desc: "We value honesty and transparency in every project and partnership.",
    },
    {
      title: "Innovation",
      desc: "Our approach blends modern architecture with smart technologies for future-ready spaces.",
    },
    {
      title: "Commitment",
      desc: "Delivering on our promises with unwavering dedication to quality and timelines.",
    },
    {
      title: "Customer Focus",
      desc: "Your satisfaction drives us to craft better, smarter living and working environments.",
    },
  ];

  const achievements = [
    "10+ years of excellence in real estate and construction.",
    "Over 50 successful residential and commercial projects completed.",
    "Award-winning designs recognized for innovation and sustainability.",
    "A strong community of happy homeowners and satisfied clients.",
  ];

  return (
    <PageWrapper bgImage={aboutBg} overlayOpacity={0.8}>
     <Seo pageName="aboutUs" />


      {/* Hero / Intro Section */}
      <motion.section
        className="text-center text-white px-6 max-w-4xl mx-auto py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-heading font-bold mb-4 text-white">
          About Us
        </h1>
        <p className="text-lg text-neutral-200 leading-relaxed">
          Building trust, one project at a time — discover who we are and what
          drives our passion for construction excellence.
        </p>
      </motion.section>

      {/* Our Story */}
      <motion.section
        className="text-center text-white px-6 max-w-5xl mx-auto py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold mb-4 text-white">
          {story.heading}
        </h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-neutral-200">
          {story.description}
        </p>
      </motion.section>

      {/* Our Mission */}
      <motion.section
        className="text-center text-white px-6 max-w-5xl mx-auto py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold mb-4 text-white">
          {mission.heading}
        </h2>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-neutral-200">
          {mission.description}
        </p>
      </motion.section>

      {/* Our Values */}
      <motion.section
        className="px-6 py-12 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold text-center mb-8 text-white">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1 max-w-6xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={i}
              className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl text-center hover:bg-white/20 transition"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold mb-3">{v.title}</h3>
              <p className="text-neutral-200">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Achievements */}
      <motion.section
        className="text-white px-6 py-12 max-w-5xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-heading font-bold mb-6 text-white">
          Our Achievements
        </h2>
        <ul className="space-y-3 text-lg text-neutral-200">
          {achievements.map((item, i) => (
            <li
              key={i}
              className="backdrop-blur-sm bg-white/10 border border-white/10 p-4 rounded-lg hover:bg-white/20 transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.section>
    </PageWrapper>
  );
}
