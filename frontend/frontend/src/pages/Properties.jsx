import { useEffect, useState } from "react";
import { getProperties } from "../api/api";

export default function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties()
      .then((data) => {
        console.log("Properties API response:", data);
        setProperties(Array.isArray(data) ? data : data.properties || []);
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Available Properties</h2>
      <ul>
        {Array.isArray(properties) && properties.length > 0 ? (
          properties.map((p) => (
            <li key={p._id}>
              <b>{p.title}</b> — {p.price} ₹
            </li>
          ))
        ) : (
          <p>No properties available</p>
        )}
      </ul>
    </div>
  );
}
