// controllers/blogController.js
import Blog from "../models/Blog.js";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Helper: Upload buffer to Cloudinary using a stream
const uploadToCloudinary = (fileBuffer, folder, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

// ✅ Create Blog
export const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    let imageUrl = null;

    if (req.file?.buffer) {
      const uploaded = await uploadToCloudinary(req.file.buffer, "blogs", "image");
      imageUrl = uploaded.secure_url;
    }

    const blog = await Blog.create({ title, content, image: imageUrl });
    res.status(201).json(blog);
  } catch (err) {
    console.error("❌ Blog creation error:", err);
    res.status(500).json({ message: "Failed to create blog", error: err.message });
  }
};

// ✅ List Blogs
export const listBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

// ✅ Get Blog by ID
export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// ✅ Update Blog (replace Cloudinary image if new one provided)
export const updateBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Handle new image
    if (req.file?.buffer) {
      if (blog.image) {
        const publicId = blog.image
          .split("/")
          .slice(-1)[0]
          .split(".")[0];
        try {
          await cloudinary.uploader.destroy(`blogs/${publicId}`);
        } catch (err) {
          console.warn("⚠️ Failed to delete old Cloudinary image:", err.message);
        }
      }

      const uploaded = await uploadToCloudinary(req.file.buffer, "blogs", "image");
      blog.image = uploaded.secure_url;
    }

    // Update fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;

    const updated = await blog.save();
    res.json(updated);
  } catch (err) {
    console.error("❌ Blog update error:", err);
    res.status(500).json({ message: "Failed to update blog", error: err.message });
  }
};

// ✅ Delete Blog (and Cloudinary image)
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Delete Cloudinary image if it exists
    if (blog.image) {
      const publicId = blog.image
        .split("/")
        .slice(-1)[0]
        .split(".")[0];
      try {
        await cloudinary.uploader.destroy(`blogs/${publicId}`);
      } catch (err) {
        console.warn("⚠️ Failed to delete Cloudinary image:", err.message);
      }
    }

    await blog.deleteOne();
    res.json({ message: "🗑️ Blog deleted successfully" });
  } catch (err) {
    console.error("❌ Blog deletion error:", err);
    res.status(500).json({ message: "Failed to delete blog", error: err.message });
  }
};
