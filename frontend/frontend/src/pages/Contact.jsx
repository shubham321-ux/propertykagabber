import { useEffect, useState } from "react";
import { getContact } from "../api/api";
import Seo from "../components/Seo";

export default function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContact()
      .then(setContact)
      .catch((err) => console.error("Error loading contact:", err));
  }, []);

  if (!contact) return <p>Loading contact info...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <Seo
        title="Contact Us - MySite"
        description="Get in touch with us via phone, email, or visit our office address."
        keywords="contact, phone, email, address, support"
      />

      <h2>Contact Us</h2>
      <p><b>Phone:</b> {contact.phone || "N/A"}</p>
      <p><b>Email:</b> {contact.email || "N/A"}</p>
      <p><b>Address:</b> {contact.address || "N/A"}</p>
    </div>
  );
}
