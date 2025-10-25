import Blog from "../models/Blog.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Helper to upload file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

// ✅ Create new blog
export const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    let imageUrl = null;

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer, "blogs");
      imageUrl = uploaded.secure_url;
    }

    const blog = await Blog.create({ title, content, image: imageUrl });
    res.status(201).json(blog);
  } catch (err) {
    console.error("❌ Blog creation error:", err);
    next(err);
  }
};

// ✅ Get all blogs
export const listBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

// ✅ Get single blog
export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

// ✅ Update blog (replace Cloudinary image if new one provided)
export const updateBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (req.file) {
      // Delete old Cloudinary image if exists
      if (blog.image) {
        const publicId = blog.image.split("/").slice(-1)[0].split(".")[0];
        try {
          await cloudinary.uploader.destroy(`blogs/${publicId}`);
        } catch (err) {
          console.warn("⚠️ Failed to delete old Cloudinary image:", err.message);
        }
      }

      // Upload new one
      const uploaded = await uploadToCloudinary(req.file.buffer, "blogs");
      blog.image = uploaded.secure_url;
    }

    // Update text fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;

    const updated = await blog.save();
    res.json(updated);
  } catch (err) {
    console.error("❌ Blog update error:", err);
    next(err);
  }
};

// ✅ Delete blog (and Cloudinary image)
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.image) {
      const publicId = blog.image.split("/").slice(-1)[0].split(".")[0];
      try {
        await cloudinary.uploader.destroy(`blogs/${publicId}`);
      } catch (err) {
        console.warn("⚠️ Failed to delete Cloudinary image:", err.message);
      }
    }

    await blog.deleteOne();
    res.json({ message: "🗑️ Blog deleted successfully" });
  } catch (err) {
    next(err);
  }
};
