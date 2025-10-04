import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-dark text-neutral-light mt-10">
      <div className="max-w-[1400px] mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Logo + About */}
        <div>
          <h3 className="text-xl font-heading font-bold mb-3 text-white">
            MySite
          </h3>
          <p className="text-sm text-neutral">
            The best platform to explore properties, blogs and company pages
            dynamically managed by admin.
          </p>
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
      <Link to="/pages/about-us" className="hover:text-accent">
        About
      </Link>
    </li>
  </ul>
</div>

{/* Social Media */}
<div className="flex flex-col items-start md:items-end">
  <h4 className="font-semibold mb-3 text-white">Follow Us</h4>
  <div className="flex space-x-4 text-2xl">
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noreferrer"
      className="hover:text-accent"
    >
      <FiFacebook />
    </a>
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noreferrer"
      className="hover:text-accent"
    >
      <FiInstagram />
    </a>
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noreferrer"
      className="hover:text-accent"
    >
      <FiTwitter />
    </a>
  </div>
</div>


      </div>

      {/* Bottom strip with social + copyright */}
      <div className="w-full bg-neutral-dark border-t border-neutral">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
          {/* Social again at bottom left */}
          <div className="flex space-x-4 text-xl mb-2 md:mb-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              <FiFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              <FiInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              <FiTwitter />
            </a>
          </div>

          {/* Copyright on right */}
          <div className="text-sm text-neutral text-center md:text-right">
            © {new Date().getFullYear()} MySite. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
