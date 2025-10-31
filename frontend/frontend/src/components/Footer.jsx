import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { useSite } from "../context/SiteContext";
import Logo from "./Logo";
import { demoContact } from "../data/contactData";

export default function Footer() {
  const { contact, loading } = useSite();
  const c = !loading && contact ? contact : demoContact;

  return (
    <footer className="bg-[#0f172a] text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 1️⃣ About / Contact Info */}
        <div>
          <Logo size={50} />
          <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-xs">
            {c.aboutText ||
              "We connect buyers and property owners directly — no commissions, no middlemen."}
          </p>

          <div className="mt-5 space-y-2 text-sm text-gray-300">
            {c.address?.length > 0 && (
              <p>📍 {c.address.join(", ")}</p>
            )}
            {c.phone?.length > 0 && (
              <p>📞 {c.phone.join(", ")}</p>
            )}
            {c.email?.length > 0 && (
              <p>📧 {c.email.join(", ")}</p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-5 text-xl text-gray-400">
            {c.socialLinks?.map((link, idx) => {
              const platform = link.platform.toLowerCase();
              const Icon =
                platform === "facebook"
                  ? FiFacebook
                  : platform === "instagram"
                  ? FiInstagram
                  : FiTwitter;
              return (
                <a
                  key={idx}
                  href={link.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-400 transition"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* 2️⃣ Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-orange-400">
            Quick Links
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {[
              { label: "Home", path: "/" },
              { label: "Properties", path: "/properties" },
              { label: "Blogs", path: "/blogs" },
              { label: "Contact", path: "/contact" },
              { label: "About Us", path: "/about-us" },
              { label: "Login", path: "/login" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-orange-400 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3️⃣ Newsletter */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-orange-400">
            Stay Updated
          </h4>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get our latest property updates and real estate news.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l bg-gray-800 text-gray-200 w-full focus:outline-none"
            />
            <button className="bg-orange-500 px-4 py-2 rounded-r font-medium hover:bg-orange-600 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* 4️⃣ Help / Legal Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-orange-400">
            Help & Support
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/faq" className="hover:text-orange-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-orange-400">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-orange-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} PropertyKaGabbar. All rights reserved.
          &nbsp;|&nbsp;
          <Link to="/terms" className="hover:text-orange-400">
            Terms of Use
          </Link>
          &nbsp;|&nbsp;
          <Link to="/privacy" className="hover:text-orange-400">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
