import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getContact } from "../api/api";
import Seo from "../components/Seo";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMapPin,
  FiClock,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { demoContact } from "../data/contactData";
import property1 from "../assets/propert1.jpg";

export default function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContact()
      .then((res) => setContact(res?.contact || demoContact))
      .catch(() => setContact(demoContact));
  }, []);

  if (!contact) return null;

  return (
    <div className="bg-white text-neutral-dark mt-16">
      <Seo pageName="Contact" />

      {/* CONTACT INFO CARD */}
      <motion.section
        className="max-w-4xl mx-auto px-4 sm:px-6 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-neutral-light/60 rounded-2xl shadow-card border border-neutral-light p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-800 text-left sm:text-center mb-4">
            Contact Information
          </h2>

          <p className="text-neutral text-left sm:text-center text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            Reach us directly via phone or email, or visit our office during
            working hours. We look forward to hearing from you.
          </p>

          <div className="space-y-5 text-left">
            {contact.phone?.length > 0 && (
              <div className="flex flex-col sm:flex-row items-start gap-2 text-neutral text-base break-words">
                <div className="flex items-center gap-3">
                  <FiPhone className="text-primary text-lg shrink-0" />
                  <b>Phone:</b>
                </div>
                <span className="sm:ml-1 text-gray-700">{contact.phone.join(", ")}</span>
              </div>
            )}

            {contact.email?.length > 0 && (
              <div className="flex flex-col sm:flex-row items-start gap-2 text-neutral text-base break-words">
                <div className="flex items-center gap-3">
                  <FiMail className="text-primary text-lg shrink-0" />
                  <b>Email:</b>
                </div>
                <span className="sm:ml-1 text-gray-700 break-all">
                  {contact.email.join(", ")}
                </span>
              </div>
            )}

            {contact.address?.length > 0 && (
              <div className="flex flex-col sm:flex-row items-start gap-2 text-neutral text-base break-words">
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-primary text-lg shrink-0" />
                  <b>Address:</b>
                </div>
                <span className="sm:ml-1 text-gray-700">
                  {contact.address.join(", ")}
                </span>
              </div>
            )}

            {contact.workingHours && (
              <div className="flex flex-col sm:flex-row items-start gap-2 text-neutral text-base">
                <div className="flex items-center gap-3">
                  <FiClock className="text-primary text-lg shrink-0" />
                  <b>Working Hours:</b>
                </div>
                <span className="sm:ml-1 text-gray-700">
                  {contact.workingHours}
                </span>
              </div>
            )}
          </div>

          {/* SOCIAL LINKS */}
          {contact.socialLinks?.length > 0 && (
            <div className="flex flex-wrap justify-start sm:justify-center gap-6 pt-8 text-2xl text-gray-700">
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
                    className="hover:text-primary transition-colors duration-200"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* HERO / INTRO SECTION */}
      <motion.section
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-20 gap-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* LEFT CONTENT */}
        <div className="md:w-1/2 space-y-6 text-left">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-800">
            Get in Touch With Us
          </h1>
          <p className="text-neutral text-base md:text-lg leading-relaxed">
            Whether you’re planning your next real estate investment, looking
            for design consultation, or just have a question about our services
            — we’re here to assist you.
          </p>
          <p className="text-neutral text-base md:text-lg leading-relaxed">
            Our team of experts will get back to you promptly with the right
            guidance and support. Let’s turn your vision into a successful
            project.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="md:w-1/2 flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={property1}
            alt="Contact Office"
            className="rounded-2xl shadow-card w-full md:w-[85%] object-cover"
          />
        </motion.div>
      </motion.section>

      {/* CTA SECTION */}
      <motion.section
        className="max-w-3xl mx-auto text-left sm:text-center pb-24 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-3xl font-heading font-semibold text-gray-800 mb-4">
          Let’s Build Something Great Together
        </h3>
        <p className="text-neutral text-base md:text-lg leading-relaxed">
          We’re passionate about helping you achieve your goals — from concept
          to completion. Get in touch today and start your journey with us.
        </p>
      </motion.section>
    </div>
  );
}
