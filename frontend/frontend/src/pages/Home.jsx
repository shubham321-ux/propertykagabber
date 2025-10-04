import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🏠 Welcome to Builder Jyanti</h1>
      <p>Your trusted real estate platform.</p>

      <nav style={{ marginTop: "20px" }}>
        <Link to="/login" style={{ margin: "0 15px" }}>Login</Link>
        <Link to="/properties" style={{ margin: "0 15px" }}>View Properties</Link>
      </nav>
    </div>
  );
}
