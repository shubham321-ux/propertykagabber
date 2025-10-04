import Blog from "../models/Blog.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/images/${req.file.filename}` : null;
    const blog = await Blog.create({ title, content, image });
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

export const listBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

// ✅ Get single blog by ID
export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const updateData = { title, content };
    if (req.file) {
      updateData.image = `/uploads/images/${req.file.filename}`;
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
};
