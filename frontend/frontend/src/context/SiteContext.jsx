import { createContext, useContext, useEffect, useState } from "react";
import { getPages, getContact } from "../api/api";

const SiteContext = createContext();

export function SiteProvider({ children }) {
  const [pages, setPages] = useState([]);
  const [contact, setContact] = useState(null);
  const [form, setForm] = useState(null); // store contact form structure
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch pages and contact data in parallel
        const [pagesData, contactData] = await Promise.all([
          getPages(),
          getContact(),
        ]);

        // Set pages
        setPages(pagesData || []);

        // Set contact and prepare form
        if (contactData?.contact) {
          setContact(contactData.contact);

          setForm({
            phone: contactData.contact.phone?.length ? contactData.contact.phone : [""],
            email: contactData.contact.email?.length ? contactData.contact.email : [""],
            address: contactData.contact.address?.length ? contactData.contact.address : [""],
            socialLinks:
              contactData.contact.socialLinks?.length > 0
                ? contactData.contact.socialLinks
                : [{ platform: "", url: "" }],
            youtube: contactData.contact.youtube || "",
            mapLink: contactData.contact.mapLink || "",
            aboutText: contactData.contact.aboutText || "",
            workingHours: contactData.contact.workingHours || "",
          });
        } else {
          setContact(null);
          setForm(null);
        }
      } catch (err) {
        console.error("Error loading site data:", err);
        setContact(null);
        setForm(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Log the context data whenever it changes
  useEffect(() => {
    console.log("SiteContext Data:", { pages, contact, form, loading });
  }, [pages, contact, form, loading]);

  return (
    <SiteContext.Provider value={{ pages, contact, form, loading }}>
      {children}
    </SiteContext.Provider>
  );
}

// Hook to use site context
export function useSite() {
  return useContext(SiteContext);
}
