import { useEffect, useState } from "react";
import { getContact, createContact, updateContact } from "../../api/api";
import Modal from "../../components/Modal";

export default function AdminContact() {
  const [contact, setContact] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    phone: [""],
    email: [""],
    address: [""],
    socialLinks: [{ platform: "", url: "" }],
    youtube: "",
    mapLink: "",
    aboutText: "",
    workingHours: "",
  });
const [saving, setSaving] = useState(false);
  // ✅ Load contact data from backend
  const loadContact = async () => {
    try {
      const res = await getContact();
      if (res?.contact) {
        setContact(res.contact);
        setForm({
          phone: res.contact.phone?.length ? res.contact.phone : [""],
          email: res.contact.email?.length ? res.contact.email : [""],
          address: res.contact.address?.length ? res.contact.address : [""],
          socialLinks:
            res.contact.socialLinks?.length > 0
              ? res.contact.socialLinks
              : [{ platform: "", url: "" }],
          youtube: res.contact.youtube || "",
          mapLink: res.contact.mapLink || "",
          aboutText: res.contact.aboutText || "",
          workingHours: res.contact.workingHours || "",
        });
      }
    } catch (err) {
      console.error("Error loading contact:", err);
    }
  };

  useEffect(() => {
    loadContact();
  }, []);

  // ✅ Handle array changes
  const handleArrayChange = (index, field, value, type) => {
    const updated = [...form[type]];
    updated[index] = value;
    setForm({ ...form, [type]: updated });
  };

  // ✅ Add new item in array
  const addField = (type, newValue) => {
    setForm({ ...form, [type]: [...form[type], newValue] });
  };

  // ✅ Remove item from array
  const removeField = (type, index) => {
    const updated = form[type].filter((_, i) => i !== index);
    setForm({ ...form, [type]: updated.length ? updated : [""] });
  };

  // ✅ Handle social links
  const handleSocialChange = (index, field, value) => {
    const updated = [...form.socialLinks];
    updated[index][field] = value;
    setForm({ ...form, socialLinks: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setSaving(true);
    try {
      const payload = { ...form };
      if (contact?._id) {
        await updateContact(payload);
      } else {
        await createContact(payload);
      }
      await loadContact();
      setOpen(false);
    } catch (err) {
      console.error("Error saving contact:", err);
    }finally {
    setSaving(false);
  }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-6">
      {saving && <AdminActionLoader text="Saving Contact Info..." />}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          📞 Manage Contact Info
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {contact ? "Edit Contact" : "➕ Add Contact"}
        </button>
      </div>

      {/* ✅ Display Saved Info */}
      {contact ? (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 space-y-2 sm:space-y-3 text-sm sm:text-base">
          <p><b>📞 Phone:</b> {contact.phone?.join(", ") || "N/A"}</p>
          <p><b>📧 Email:</b> {contact.email?.join(", ") || "N/A"}</p>
          <p><b>🏠 Address:</b> {contact.address?.join(", ") || "N/A"}</p>
          <p><b>🔗 Social Links:</b></p>
          <ul className="list-disc ml-6">
            {contact.socialLinks?.map((s, i) => (
              <li key={i}>
                <b>{s.platform}:</b> <a href={s.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{s.url}</a>
              </li>
            ))}
          </ul>
          <p><b>📺 YouTube:</b> {contact.youtube || "N/A"}</p>
          <p><b>🗺️ Map Link:</b> {contact.mapLink || "N/A"}</p>
          <p><b>ℹ️ About Text:</b> {contact.aboutText || "N/A"}</p>
          <p><b>🕒 Working Hours:</b> {contact.workingHours || "N/A"}</p>
        </div>
      ) : (
        <p className="text-gray-500">No contact info found. Please add one.</p>
      )}

      {/* ✅ Modal Form */}
      <Modal open={open} onClose={() => setOpen(false)} title="Edit Contact Info">
        <form onSubmit={handleSubmit} className="space-y-3 max-h-[80vh] overflow-y-auto p-1">
          {/* Phones */}
          <div>
            <label className="font-semibold block mb-1">Phone Numbers</label>
            {form.phone.map((num, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={num}
                  onChange={(e) => handleArrayChange(i, "phone", e.target.value, "phone")}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="Enter phone number"
                />
                {form.phone.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField("phone", i)}
                    className="text-red-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("phone", "")}
              className="text-blue-600 text-sm"
            >
              + Add another phone
            </button>
          </div>

          {/* Emails */}
          <div>
            <label className="font-semibold block mb-1">Emails</label>
            {form.email.map((mail, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="email"
                  value={mail}
                  onChange={(e) => handleArrayChange(i, "email", e.target.value, "email")}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="Enter email"
                />
                {form.email.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField("email", i)}
                    className="text-red-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("email", "")}
              className="text-blue-600 text-sm"
            >
              + Add another email
            </button>
          </div>

          {/* Addresses */}
          <div>
            <label className="font-semibold block mb-1">Addresses</label>
            {form.address.map((addr, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <textarea
                  value={addr}
                  onChange={(e) => handleArrayChange(i, "address", e.target.value, "address")}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="Enter address"
                />
                {form.address.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField("address", i)}
                    className="text-red-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("address", "")}
              className="text-blue-600 text-sm"
            >
              + Add another address
            </button>
          </div>

          {/* Social Links */}
          <div>
            <label className="font-semibold block mb-1">Social Links</label>
            {form.socialLinks.map((link, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={link.platform}
                  onChange={(e) => handleSocialChange(i, "platform", e.target.value)}
                  placeholder="Platform (e.g., Facebook)"
                  className="border rounded px-3 py-2 flex-1"
                />
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => handleSocialChange(i, "url", e.target.value)}
                  placeholder="URL"
                  className="border rounded px-3 py-2 flex-1"
                />
                {form.socialLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField("socialLinks", i)}
                    className="text-red-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("socialLinks", { platform: "", url: "" })}
              className="text-blue-600 text-sm"
            >
              + Add another social link
            </button>
          </div>

          {/* Other Fields */}
          <input
            type="text"
            name="youtube"
            value={form.youtube}
            onChange={(e) => setForm({ ...form, youtube: e.target.value })}
            placeholder="YouTube Link"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="mapLink"
            value={form.mapLink}
            onChange={(e) => setForm({ ...form, mapLink: e.target.value })}
            placeholder="Google Map Link"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="aboutText"
            value={form.aboutText}
            onChange={(e) => setForm({ ...form, aboutText: e.target.value })}
            placeholder="Short About Text"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="workingHours"
            value={form.workingHours}
            onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
            placeholder="Working Hours (e.g. Mon–Sat 9AM–7PM)"
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
