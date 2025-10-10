import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

export default function Logo({ size = 40 }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={logo}
        alt="MySite Logo"
        className="object-contain"
        style={{ height: size, width: "auto" }}
      />
      {/* <span className="text-xl font-heading font-bold text-white tracking-wide">
        MySite
      </span> */}
    </Link>
  );
}
