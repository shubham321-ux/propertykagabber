import { useEffect, useState } from "react";
import {
  getProperties,
  deleteProperty,
  updateProperty,
} from "../../api/api";
import api from "../../api/api";
import AddProperty from "./AddProperty";
import Modal from "../../components/Modal";

export default function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });
  const [editImages, setEditImages] = useState([]);
  const [editVideo, setEditVideo] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadProperties = () => {
    setLoading(true);
    getProperties()
      .then(setProperties)
      .catch((err) => console.error("Error loading properties:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;
    try {
      await deleteProperty(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting property:", err);
    }
  };

  const startEdit = (property) => {
    setEditing(property._id);
    setEditForm({
      title: property.title || "",
      description: property.description || "",
      price: property.price || "",
      location: property.location || "",
    });
    setEditImages([]);
    setEditVideo(null);
    setOpenEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editing) return;

    setSaving(true);
    const formData = new FormData();
    formData.append("title", editForm.title);
    formData.append("description", editForm.description);
    formData.append("price", editForm.price);
    formData.append("location", editForm.location);

    editImages.forEach((file) => formData.append("images", file));
    if (editVideo) formData.append("video", editVideo);

    try {
      const updated = await updateProperty(editing, formData);
      setProperties((prev) => prev.map((p) => (p._id === editing ? updated : p)));
      setOpenEdit(false);
    } catch (err) {
      console.error("Error updating property:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImage = async (id, index) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await api.delete(`/properties/${id}/images/${index}`);
      loadProperties();
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await api.delete(`/properties/${id}/video`);
      loadProperties();
    } catch (err) {
      console.error("Failed to delete video:", err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading properties...</p>;

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Manage Properties</h2>
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition"
        >
          ➕ Add Property
        </button>
      </div>

      {properties.length === 0 && (
        <p className="text-gray-500">No properties found.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow rounded-lg p-4 border hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.location}</p>
            <p className="text-primary font-bold mt-1">
              ₹ {p.price?.toLocaleString()}
            </p>

            {/* Images */}
            {p.images?.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-3">
                {p.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={`${window.location.origin}${img}`}
                      alt=""
                      className="w-24 h-20 object-cover rounded-md"
                    />
                    <button
                      onClick={() => handleDeleteImage(p._id, idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Video */}
            {p.video && (
              <div className="mt-3">
                <video
                  src={`${window.location.origin}${p.video}`}
                  controls
                  className="w-full rounded-md"
                />
                <button
                  onClick={() => handleDeleteVideo(p._id)}
                  className="bg-red-600 text-white px-3 py-1 text-sm rounded mt-2"
                >
                  Delete Video
                </button>
              </div>
            )}

            <p className="text-gray-700 mt-3 text-sm">{p.description}</p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => startEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Add Property">
        <AddProperty
          onSuccess={() => {
            setOpenAdd(false);
            loadProperties();
          }}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)} title="Edit Property">
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            placeholder="Title"
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            value={editForm.price}
            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
            placeholder="Price"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            value={editForm.location}
            onChange={(e) =>
              setEditForm({ ...editForm, location: e.target.value })
            }
            placeholder="Location"
            className="w-full border rounded px-3 py-2"
          />

          {/* Upload New Images */}
          <input
            type="file"
            multiple
            onChange={(e) => setEditImages(Array.from(e.target.files))}
            className="w-full border rounded px-3 py-2"
          />

          {/* Preview Newly Selected Images */}
          {editImages.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {editImages.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-24 h-20 object-cover rounded-md border"
                />
              ))}
            </div>
          )}

          {/* Upload New Video */}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setEditVideo(e.target.files[0])}
            className="w-full border rounded px-3 py-2"
          />

          {/* Preview Newly Selected Video */}
          {editVideo && (
            <div className="mt-2">
              <video
                src={URL.createObjectURL(editVideo)}
                controls
                className="w-full rounded-md"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setOpenEdit(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
