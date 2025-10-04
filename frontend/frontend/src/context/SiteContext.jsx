import { createContext, useContext, useEffect, useState } from "react";
import { getPages, getContact } from "../api/api";

const SiteContext = createContext();

export function SiteProvider({ children }) {
  const [pages, setPages] = useState([]);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [pagesData, contactData] = await Promise.all([
          getPages(),
          getContact(),
        ]);

        setPages(pagesData || []);
        setContact(contactData || null);

        console.log("Pages Data:", pagesData);
        console.log("Contact Data:", contactData);
      } catch (err) {
        console.error("Error preloading site data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  console.log("Context Data:", { pages, contact, loading });

  return (
    <SiteContext.Provider value={{ pages, contact, loading }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
