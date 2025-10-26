import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { useSite } from "../context/SiteContext";
import Logo from "./Logo";
import { demoContact } from "../data/contactData";

export default function Footer() {
  const { contact, loading } = useSite();
  const c = !loading && contact ? contact : demoContact;

  return (
    <footer className="w-full bg-neutral-light text-neutral-dark border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        {/* 1️⃣ About */}
        <div>
          <Logo size={50} />
          <p className="text-sm text-neutral mt-3 max-w-sm">
            {c.aboutText || demoContact.aboutText}
          </p>

          <div className="mt-4 text-sm space-y-1">
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

        {/* 2️⃣ Quick Links */}
        <div className="flex flex-col md:items-center">
          <h4 className="font-semibold mb-4 text-primary-dark text-lg">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Home", path: "/" },
              { label: "Properties", path: "/properties" },
              { label: "Blogs", path: "/blogs" },
              { label: "Contact", path: "/contact" },
              { label: "About", path: "/about-us" },
              {label:"Login",path:"/login"}
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-primary transition font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3️⃣ Socials */}
        <div className="flex flex-col md:items-end">
          <h4 className="font-semibold mb-4 text-primary-dark text-lg">
            Follow Us
          </h4>
          <div className="flex space-x-4 text-2xl text-neutral-dark">
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
                  className="hover:text-primary transition"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-white border-t border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-neutral">
          <p>© {new Date().getFullYear()} Propertykagabber. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0 text-lg">
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
                  className="hover:text-primary transition"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
