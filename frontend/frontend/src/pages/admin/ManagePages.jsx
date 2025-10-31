import { useEffect, useState } from "react";
import { getPages, createPage, updatePage, deletePage } from "../../api/api";
import { Eye, Edit2, Trash2 } from "lucide-react";
import AdminActionLoader from "../../components/AdminActionLoader";

export default function ManagePages() {
  const [pages, setPages] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewPage, setViewPage] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  

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
    setSaving(true);
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
    }finally {
    setSaving(false);
  }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6">
       {saving && <AdminActionLoader text={editing ? "Updating Page..." : "Adding Page..."} />}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Manage Pages</h2>
        {/* <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition"
        >
          ➕ Add Page
        </button> */}
      </div>

      {/* Table */}
      {pages.length === 0 ? (
        <p className="text-gray-500">No pages found.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Slug</th>
                <th className="p-3 border-b">Description</th>
                <th className="p-3 border-b">Keywords</th>
                <th className="p-3 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border-b font-medium">{p.title}</td>
                  <td className="p-3 border-b text-gray-600">{p.name}</td>
                  <td className="p-3 border-b text-sm text-gray-600">
                    {p.description?.slice(0, 50) || "-"}...
                  </td>
                  <td className="p-3 border-b text-sm text-gray-500">
                    {p.keywords || "-"}
                  </td>
                  <td className="p-3 border-b text-right flex justify-end gap-2">
                    <button
                      onClick={() => setViewPage(p)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    {/* <button
                      onClick={() => handleDelete(p.name)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Normal Add/Edit Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[600px] max-h-[85vh] overflow-y-auto p-6">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              {editing ? "Edit Page" : "Add Page"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Slug (unique name)</label>
                <input
                  type="text"
                  placeholder="e.g. about-us"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={!!editing}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Meta Title</label>
                <input
                  type="text"
                  placeholder="Page Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  disabled={!!editing}
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Meta Description</label>
                <textarea
                  placeholder="Short page description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Meta Keywords</label>
                <input
                  type="text"
                  placeholder="e.g. about, builder, company"
                  value={form.keywords}
                  onChange={(e) =>
                    setForm({ ...form, keywords: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* <h4 className="text-lg font-semibold">Sections</h4>
              {form.sections.map((s, i) => (
                <div
                  key={i}
                  className="border rounded p-3 space-y-2 mb-3 bg-gray-50"
                >
                  <label className="block font-medium mb-1">Section Heading</label>
                  <input
                    type="text"
                    placeholder="Heading"
                    value={s.heading}
                    onChange={(e) =>
                      handleSectionChange(i, "heading", e.target.value)
                    }
                  
                    className="w-full border rounded px-3 py-2"
                  />

                  <label className="block font-medium mb-1">Section Content</label>
                  <textarea
                    placeholder="HTML or text content"
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
              </button> */}

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
          </div>
        </div>
      )}

      {/* View Details Modal (Glass effect remains) */}
      {viewPage && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg w-[600px] max-h-[85vh] overflow-y-auto p-6 text-white">
            <h3 className="text-2xl font-bold mb-4 text-accent">
              {viewPage.title}
            </h3>
            <p className="mb-2"><b>Slug:</b> {viewPage.name}</p>
            <p className="mb-2"><b>Description:</b> {viewPage.description}</p>
            <p className="mb-4"><b>Keywords:</b> {viewPage.keywords}</p>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Sections</h4>
              {viewPage.sections?.length ? (
                viewPage.sections.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/10 border border-white/20 p-3 rounded-xl"
                  >
                    <h5 className="font-semibold mb-1">{s.heading}</h5>
                    <div
                      className="text-sm text-neutral-200"
                      dangerouslySetInnerHTML={{ __html: s.content }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No sections available.</p>
              )}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewPage(null)}
                className="bg-accent px-4 py-2 rounded-lg text-white hover:bg-accent/80"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
