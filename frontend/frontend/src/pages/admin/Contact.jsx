import { useEffect, useState } from "react";
import { getContact, createContact, updateContact } from "../../api/api";
import Modal from "../../components/Modal";

export default function AdminContact() {
  const [contact, setContact] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    email: "",
    address: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    extraText: "",
  });

  const loadContact = async () => {
    try {
      const data = await getContact();
      if (data) {
        setContact(data);
        setForm(data);
      }
    } catch (err) {
      console.error("Error loading contact:", err);
    }
  };

  useEffect(() => {
    loadContact();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contact?._id) {
        await updateContact(form);
      } else {
        await createContact(form);
      }
      await loadContact();
      setOpen(false);
    } catch (err) {
      console.error("Error saving contact:", err);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📞 Manage Contact Info</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {contact ? "Edit Contact" : "➕ Add Contact"}
        </button>
      </div>

      {contact ? (
        <div className="bg-white shadow rounded-lg p-6 space-y-3">
          <p><b>Phone:</b> {contact.phone || "N/A"}</p>
          <p><b>Email:</b> {contact.email || "N/A"}</p>
          <p><b>Address:</b> {contact.address || "N/A"}</p>
          <p><b>Facebook:</b> {contact.facebook || "N/A"}</p>
          <p><b>Instagram:</b> {contact.instagram || "N/A"}</p>
          <p><b>Twitter:</b> {contact.twitter || "N/A"}</p>
          <p><b>LinkedIn:</b> {contact.linkedin || "N/A"}</p>
          <p><b>Extra:</b> {contact.extraText || "N/A"}</p>
        </div>
      ) : (
        <p className="text-gray-500">No contact info found. Please add one.</p>
      )}

      {/* Modal Form */}
      <Modal open={open} onClose={() => setOpen(false)} title="Edit Contact Info">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            name="facebook"
            placeholder="Facebook URL"
            value={form.facebook}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="instagram"
            placeholder="Instagram URL"
            value={form.instagram}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="twitter"
            placeholder="Twitter URL"
            value={form.twitter}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="extraText"
            placeholder="Extra Information"
            value={form.extraText}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
