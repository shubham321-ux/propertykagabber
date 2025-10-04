import { Link, Outlet } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiSettings,
  FiPlusCircle,
  FiPhone,
} from "react-icons/fi";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "add-property", icon: <FiPlusCircle />, label: "Add Property" },
    { to: "properties", icon: <FiHome />, label: "Manage Properties" },
    { to: "blogs", icon: <FiFileText />, label: "Manage Blogs" },
    { to: "contact", icon: <FiPhone />, label: "Contact Info" },
    { to: "pages", icon: <FiSettings />, label: "Manage Pages" },
  ];

  return (
    <div className="min-h-screen bg-neutral-light flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto bg-white shadow-card lg:shadow-none
        transform transition-all duration-300 ease-in-out z-30
        ${sidebarOpen ? "w-64" : "w-16 lg:w-64"}`}
      >
        <div className="p-5">
          {/* Sidebar Title */}
          <h3
            className={`text-xl font-heading text-primary mb-6 transition-all duration-300 
            ${sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5 lg:opacity-100 lg:translate-x-0"}`}
          >
            Admin Dashboard
          </h3>

          {/* Nav Links */}
          <nav>
            <ul className="space-y-4">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-3 text-neutral-dark hover:text-primary transition"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span
                      className={`whitespace-nowrap transition-all duration-300 
                      ${sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5 lg:opacity-100 lg:translate-x-0"}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-[1400px] mx-auto">
        {/* Toggle Button for Mobile */}
        <button
          className="lg:hidden mb-4 bg-primary text-white px-4 py-2 rounded-md shadow hover:bg-primary-light transition"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Close Menu ✕" : "☰ Menu"}
        </button>

        <div className="bg-white shadow-card rounded-xl p-6 animate-fade">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
