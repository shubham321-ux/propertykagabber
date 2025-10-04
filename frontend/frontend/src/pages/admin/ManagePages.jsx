import { useEffect, useState } from "react";
import { getPages, createPage, updatePage, deletePage } from "../../api/api";
import Modal from "../../components/Modal";

export default function ManagePages() {
  const [pages, setPages] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    keywords: "",
    sections: [{ heading: "", content: "" }],
  });

  const loadPages = async () => {
    try {
      const data = await getPages();
      setPages(data);
    } catch (err) {
      console.error("Error loading pages:", err);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleSectionChange = (i, key, value) => {
    const updated = [...form.sections];
    updated[i][key] = value;
    setForm({ ...form, sections: updated });
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [...form.sections, { heading: "", content: "" }],
    });
  };

  const removeSection = (i) => {
    setForm({
      ...form,
      sections: form.sections.filter((_, idx) => idx !== i),
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      title: "",
      description: "",
      keywords: "",
      sections: [{ heading: "", content: "" }],
    });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updatePage(editing, form);
      } else {
        await createPage(form);
      }
      resetForm();
      setOpen(false);
      loadPages();
    } catch (err) {
      console.error("Error saving page:", err);
    }
  };

  const handleEdit = (page) => {
    setEditing(page.name);
    setForm(page);
    setOpen(true);
  };

  const handleDelete = async (name) => {
    if (!window.confirm("Delete this page?")) return;
    try {
      await deletePage(name);
      loadPages();
    } catch (err) {
      console.error("Error deleting page:", err);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Manage Pages</h2>
        <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition"
        >
          ➕ Add Page
        </button>
      </div>

      {pages.length === 0 ? (
        <p className="text-gray-500">No pages found.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Slug</th>
                <th className="p-3 border-b">Keywords</th>
                <th className="p-3 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b font-medium">{p.title}</td>
                  <td className="p-3 border-b text-gray-600">{p.name}</td>
                  <td className="p-3 border-b text-sm text-gray-500">
                    {p.keywords || "-"}
                  </td>
                  <td className="p-3 border-b text-right space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.name)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Add/Edit Page */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit Page" : "Add Page"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Slug (e.g. about-us)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            disabled={!!editing}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Meta Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Meta Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Meta Keywords (comma separated)"
            value={form.keywords}
            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />

          <h4 className="text-lg font-semibold">Sections</h4>
          {form.sections.map((s, i) => (
            <div key={i} className="border rounded p-3 space-y-2 mb-3">
              <input
                type="text"
                placeholder="Heading"
                value={s.heading}
                onChange={(e) =>
                  handleSectionChange(i, "heading", e.target.value)
                }
                required
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                placeholder="Content HTML"
                rows={3}
                value={s.content}
                onChange={(e) =>
                  handleSectionChange(i, "content", e.target.value)
                }
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => removeSection(i)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove Section
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Add Section
          </button>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              {editing ? "Update Page" : "Add Page"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
