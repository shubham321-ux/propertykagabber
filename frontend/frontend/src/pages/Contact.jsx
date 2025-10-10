import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getContact } from "../api/api";
import Seo from "../components/Seo";
import PageWrapper from "../components/PageWrapper";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMapPin, FiClock, FiMail, FiPhone } from "react-icons/fi";
import homeBg from "../assets/homePic.jpg";
import { demoContact } from "../data/contactData";

// Demo fallback contact


export default function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContact()
      .then((res) => setContact(res?.contact || demoContact))
      .catch((err) => {
        console.error("Error loading contact:", err);
        setContact(demoContact);
      });
  }, []);

  if (!contact) return null;

  return (
    <PageWrapper bgImage={homeBg} overlayOpacity={0.8}>
      <Seo pageName="contact" />

      {/* Hero Section */}
      <motion.section
        className="text-center text-white px-4 max-w-3xl mx-auto py-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-heading font-bold mb-2 text-white">
          Contact Us
        </h1>
        <p className="text-base text-neutral-200 leading-relaxed">
          Have questions or want to discuss your next project? Get in touch —
          our team is happy to assist you!
        </p>
      </motion.section>

      {/* Contact Details Section */}
      <motion.section
        className="text-white px-4 py-8 max-w-md mx-auto text-left space-y-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl shadow-md space-y-3">
          <h2 className="text-2xl font-heading font-bold mb-4 text-center text-white">
            Get in Touch
          </h2>

          {/* About Text */}
          {contact.aboutText && (
            <p className="text-neutral-200 text-sm">{contact.aboutText}</p>
          )}

          {/* Phone */}
          {contact.phone?.length > 0 && (
            <p className="flex items-center gap-2 text-sm text-neutral-100">
              <FiPhone /> <strong>Phone:</strong> {contact.phone.join(", ")}
            </p>
          )}

          {/* Email */}
          {contact.email?.length > 0 && (
            <p className="flex items-center gap-2 text-sm text-neutral-100">
              <FiMail /> <strong>Email:</strong> {contact.email.join(", ")}
            </p>
          )}

          {/* Address */}
          {contact.address?.length > 0 && (
            <p className="flex items-center gap-2 text-sm text-neutral-100">
              <FiMapPin /> <strong>Address:</strong> {contact.address.join(", ")}
            </p>
          )}

          {/* Working Hours */}
          {contact.workingHours && (
            <p className="flex items-center gap-2 text-sm text-neutral-100">
              <FiClock /> <strong>Working Hours:</strong> {contact.workingHours}
            </p>
          )}

          {/* Map Link */}
          {contact.mapLink && (
            <p className="flex items-center gap-2 text-sm text-neutral-100">
              <FiMapPin /> <strong>Map:</strong>{" "}
              <a href={contact.mapLink} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                View Map
              </a>
            </p>
          )}

          {/* YouTube */}
          {contact.youtube && (
            <p className="flex items-center gap-2 text-sm text-neutral-100">
              <FiYoutube /> <strong>YouTube:</strong>{" "}
              <a href={contact.youtube} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                Watch
              </a>
            </p>
          )}

          {/* Social Links */}
          {contact.socialLinks?.length > 0 && (
            <div className="flex gap-4 mt-2">
              {contact.socialLinks.map((link, idx) => {
                const Icon =
                  link.platform.toLowerCase() === "facebook"
                    ? FiFacebook
                    : link.platform.toLowerCase() === "instagram"
                    ? FiInstagram
                    : FiTwitter;
                return (
                  <a
                    key={idx}
                    href={link.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent text-2xl"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* Closing Section */}
      <motion.section
        className="text-center text-white px-4 py-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-heading font-semibold mb-2 text-white">
          Let's Build Something Great Together
        </h3>
        <p className="text-base text-neutral-200 leading-relaxed">
          Whether it’s a new project, partnership, or inquiry, we’re excited to
          hear from you. Your vision deserves the best.
        </p>
      </motion.section>
    </PageWrapper>
  );
}
