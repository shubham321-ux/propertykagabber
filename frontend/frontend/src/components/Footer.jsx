import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { useSite } from "../context/SiteContext"; // ✅ import context
import Logo from "./Logo";
import { demoContact } from "../data/contactData";
// Demo fallback contact data


export default function Footer() {
  const { contact, loading } = useSite();

  // Use backend contact if available, otherwise fallback to demoContact
  const c = !loading && contact ? contact : demoContact;

  return (
    <footer className="w-full bg-neutral-dark text-neutral-light">
      <div className="max-w-[1400px] mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Logo + About */}
        <div>
          <Logo size={50} />
          <p className="text-sm text-neutral mt-2">
            {c.aboutText || demoContact.aboutText}
          </p>

          {/* Contact Info */}
          <div className="mt-4 text-sm space-y-1 text-neutral-light">
            {c.phone?.length > 0 && (
              <p>
                <b>Phone:</b> {c.phone.join(", ")}
              </p>
            )}
            {c.email?.length > 0 && (
              <p>
                <b>Email:</b> {c.email.join(", ")}
              </p>
            )}
            {c.address?.length > 0 && (
              <p>
                <b>Address:</b> {c.address.join(", ")}
              </p>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-start md:items-center">
          <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-accent">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-accent">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-start md:items-end">
          <h4 className="font-semibold mb-3 text-white">Follow Us</h4>
          <div className="flex space-x-4 text-2xl">
            {c.socialLinks?.map((link, idx) => {
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
                  className="hover:text-accent"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="w-full bg-neutral-dark border-t border-neutral">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
          {/* Social again */}
          <div className="flex space-x-4 text-xl mb-2 md:mb-0">
            {c.socialLinks?.map((link, idx) => {
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
                  className="hover:text-accent"
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-sm text-neutral text-center md:text-right">
            © {new Date().getFullYear()} Propertykagabber. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
