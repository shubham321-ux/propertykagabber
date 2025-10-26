import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getContact } from "../api/api";
import Seo from "../components/Seo";
import { FiFacebook, FiInstagram, FiTwitter, FiMapPin, FiClock, FiMail, FiPhone } from "react-icons/fi";
import homeBg from "../assets/homePic.jpg";
import { demoContact } from "../data/contactData";
import property1 from "../assets/propert1.jpg"

export default function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContact()
      .then((res) => setContact(res?.contact || demoContact))
      .catch(() => setContact(demoContact));
  }, []);

  if (!contact) return null;

  return (
    <div className="bg-white text-neutral-dark">
      <Seo pageName="contact" />

      {/* HERO */}
      <motion.section
        className="max-w-7xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center justify-between gap-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left Text */}
        <div className="md:w-1/2 space-y-5 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark">
            Contact Us
          </h1>
          <p className="text-lg text-neutral leading-relaxed">
            Have questions or want to discuss your next project? Get in touch — our team is happy to assist you!
          </p>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src={property1 }
            alt="Contact"
            className="rounded-2xl shadow-card w-full object-cover"
          />
        </div>
      </motion.section>

      {/* CONTACT CARD */}
      <motion.section
        className="max-w-3xl mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white border border-neutral-light rounded-2xl shadow-card p-8 space-y-4">
          <h2 className="text-3xl font-heading font-bold text-primary text-center mb-4">
            Get in Touch
          </h2>

          {contact.aboutText && <p className="text-neutral text-sm mb-4">{contact.aboutText}</p>}

          {contact.phone?.length > 0 && (
            <p className="flex items-center gap-2 text-neutral text-sm">
              <FiPhone className="text-primary" /> <b>Phone:</b> {contact.phone.join(", ")}
            </p>
          )}
          {contact.email?.length > 0 && (
            <p className="flex items-center gap-2 text-neutral text-sm">
              <FiMail className="text-primary" /> <b>Email:</b> {contact.email.join(", ")}
            </p>
          )}
          {contact.address?.length > 0 && (
            <p className="flex items-center gap-2 text-neutral text-sm">
              <FiMapPin className="text-primary" /> <b>Address:</b> {contact.address.join(", ")}
            </p>
          )}
          {contact.workingHours && (
            <p className="flex items-center gap-2 text-neutral text-sm">
              <FiClock className="text-primary" /> <b>Working Hours:</b> {contact.workingHours}
            </p>
          )}

          {/* Social Links */}
          {contact.socialLinks?.length > 0 && (
            <div className="flex gap-4 justify-center pt-4 text-2xl">
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
                    className="hover:text-primary transition"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="max-w-3xl mx-auto text-center py-16 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-3xl font-heading font-semibold text-primary mb-3">
          Let’s Build Something Great Together
        </h3>
        <p className="text-neutral text-lg leading-relaxed">
          Whether it’s a new project, partnership, or inquiry, we’re excited to hear from you.  
          Your vision deserves the best.
        </p>
      </motion.section>
    </div>
  );
}
