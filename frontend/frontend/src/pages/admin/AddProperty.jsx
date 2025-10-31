import { useState } from "react";
import { createProperty } from "../../api/api";
import AdminActionLoader from "../../components/AdminActionLoader";

export default function AddProperty({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ new state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ show loader

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("location", form.location);

    images.forEach((file) => formData.append("images", file));
    if (video) formData.append("video", video);

    try {
      await createProperty(formData);
      setMessage("✅ Property created successfully!");
      setForm({ title: "", description: "", price: "", location: "" });
      setImages([]);
      setVideo(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating property");
    } finally {
      setLoading(false); // ✅ hide loader
    }
  };

  return (
    <div className="relative max-w-[800px] mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* ✅ Loader Overlay */}
      {loading && <AdminActionLoader message="Adding Property..." />}

      <h2 className="text-2xl font-bold text-primary mb-4">Add New Property</h2>

      {message && (
        <p
          className={`mb-4 ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        {/* Inputs... same as before */}
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="w-full"
          />
          {images.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {images.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-24 h-20 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block mb-1 font-medium">Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full"
          />
          {video && (
            <div className="mt-2">
              <video
                src={URL.createObjectURL(video)}
                controls
                className="w-full rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-light transition"
        >
          ➕ Add Property
        </button>
      </form>
    </div>
  );
}
