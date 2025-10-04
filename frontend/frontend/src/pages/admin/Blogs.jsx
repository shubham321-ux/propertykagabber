import { useEffect, useState } from "react";
import { getBlogs, createBlog, deleteBlog, updateBlog } from "../../api/api";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // 👈 For create preview
  const [loading, setLoading] = useState(true);

  // Edit modal states
  const [editBlog, setEditBlog] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [editPreviewImage, setEditPreviewImage] = useState(null); // 👈 For edit preview

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Error loading blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // Create Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (image) formData.append("image", image);

    try {
      const newBlog = await createBlog(formData);
      setBlogs([newBlog, ...blogs]);
      setForm({ title: "", content: "" });
      setImage(null);
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create blog");
    }
  };

  // Delete Blog
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete blog");
    }
  };

  // Update Blog
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editBlog) return;

    const formData = new FormData();
    formData.append("title", editBlog.title);
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
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update blog");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Manage Blogs</h2>
      </div>

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
        <textarea
          placeholder="Blog Content"
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
            setPreviewImage(file ? URL.createObjectURL(file) : null); // 👈 Show preview
          }}
          className="w-full"
        />

        {/* Show preview for new blog */}
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
                <th className="p-3 border-b text-left">Content</th>
                <th className="p-3 border-b text-left">Image</th>
                <th className="p-3 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50 transition border-b">
                  <td className="p-3 font-medium">{b.title}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {b.content.slice(0, 80)}...
                  </td>
                  <td className="p-3">
                    {b.image && (
                      <img
                        src={`${window.location.origin}${b.image}`}
                        alt={b.title}
                        className="w-20 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setEditBlog(b)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b._id)}
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

      {/* Edit Blog Modal */}
      {editBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
          >
            <h3 className="text-xl font-bold">Edit Blog</h3>
            <input
              type="text"
              value={editBlog.title}
              onChange={(e) =>
                setEditBlog({ ...editBlog, title: e.target.value })
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
                setEditPreviewImage(file ? URL.createObjectURL(file) : null); // 👈 Show preview
              }}
              className="w-full"
            />

            {/* Show preview (new uploaded image) */}
            {editPreviewImage ? (
              <img
                src={editPreviewImage}
                alt="New Preview"
                className="w-28 h-20 object-cover rounded"
              />
            ) : (
              // Show current image if no new upload
              editBlog.image && (
                <img
                  src={`${window.location.origin}${editBlog.image}`}
                  alt="Current"
                  className="w-28 h-20 object-cover rounded"
                />
              )
            )}

            <div className="flex justify-end gap-2">
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
