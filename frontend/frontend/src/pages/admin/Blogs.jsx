import { useEffect, useState } from "react";
import { getBlogs, createBlog, deleteBlog, updateBlog } from "../../api/api";
import { Eye, Edit2, Trash2 } from "lucide-react";
import AdminActionLoader from "../../components/AdminActionLoader"; // ✅ import loader

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", content: "" });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false); // ✅ new state

  // Modal states
  const [editBlog, setEditBlog] = useState(null);
  const [viewBlog, setViewBlog] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [editPreviewImage, setEditPreviewImage] = useState(null);

  // ✅ Load Blogs
  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // ✅ Create Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true); // show loader
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("content", form.content);
    if (image) formData.append("image", image);

    try {
      const newBlog = await createBlog(formData);
      setBlogs([newBlog, ...blogs]);
      setForm({ title: "", description: "", content: "" });
      setImage(null);
      setPreviewImage(null);
      alert("✅ Blog created successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create blog");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Delete Blog
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    setActionLoading(true);
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      alert("🗑️ Blog deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete blog");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Update Blog
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editBlog) return;
    setActionLoading(true);

    const formData = new FormData();
    formData.append("title", editBlog.title);
    formData.append("description", editBlog.description);
    formData.append("content", editBlog.content);
    if (editImage) formData.append("image", editImage);

    try {
      const updated = await updateBlog(editBlog._id, formData);
      setBlogs((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
      setEditBlog(null);
      setEditImage(null);
      setEditPreviewImage(null);
      alert("✅ Blog updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update blog");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Helper — Detect proper image URL
  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img; // Cloudinary
    return `${window.location.origin}${img}`; // Local upload fallback
  };

  return (
    <div className="relative max-w-[1400px] mx-auto p-6">
      {/* ✅ Global Overlay Loader */}
      {actionLoading && <AdminActionLoader message="Processing Blog..." />}

      <h2 className="text-2xl font-bold text-primary mb-6">Manage Blogs</h2>

      {/* Add Blog Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Blog Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Short Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          placeholder="Full Blog Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          rows={5}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
            setPreviewImage(file ? URL.createObjectURL(file) : null);
          }}
          className="w-full"
        />

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-28 h-20 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition"
        >
          ➕ Add Blog
        </button>
      </form>

      {/* Blog List */}
      {loading ? (
        <p className="text-gray-500">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b text-left">Title</th>
                <th className="p-3 border-b text-left">Description</th>
                <th className="p-3 border-b text-left">Image</th>
                <th className="p-3 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50 transition border-b">
                  <td className="p-3 font-medium">{b.title}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {b.description || b.content.slice(0, 60)}...
                  </td>
                  <td className="p-3">
                    {b.image && (
                      <img
                        src={getImageUrl(b.image)}
                        alt={b.title}
                        className="w-20 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-3 text-right flex justify-end gap-2">
                    <button
                      onClick={() => setViewBlog(b)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => setEditBlog(b)}
                      className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                      title="Edit Blog"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                      title="Delete Blog"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Blog Modal */}
      {viewBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              {viewBlog.title}
            </h3>
            {viewBlog.image && (
              <img
                src={getImageUrl(viewBlog.image)}
                alt={viewBlog.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}
            <p className="text-gray-700 mb-3">
              <b>Description:</b> {viewBlog.description}
            </p>
            <p className="text-gray-600 leading-relaxed">{viewBlog.content}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewBlog(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {editBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
          >
            <h3 className="text-xl font-bold text-primary">✏️ Edit Blog</h3>

            <input
              type="text"
              value={editBlog.title}
              onChange={(e) =>
                setEditBlog({ ...editBlog, title: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              value={editBlog.description || ""}
              placeholder="Short Description"
              onChange={(e) =>
                setEditBlog({ ...editBlog, description: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              value={editBlog.content}
              onChange={(e) =>
                setEditBlog({ ...editBlog, content: e.target.value })
              }
              rows={5}
              className="w-full border rounded px-3 py-2"
            />

            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setEditImage(file);
                setEditPreviewImage(file ? URL.createObjectURL(file) : null);
              }}
              className="w-full"
            />

            {editPreviewImage ? (
              <img
                src={editPreviewImage}
                alt="New Preview"
                className="w-28 h-20 object-cover rounded"
              />
            ) : (
              editBlog.image && (
                <img
                  src={getImageUrl(editBlog.image)}
                  alt="Current"
                  className="w-28 h-20 object-cover rounded"
                />
              )
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setEditBlog(null);
                  setEditImage(null);
                  setEditPreviewImage(null);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-light"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
