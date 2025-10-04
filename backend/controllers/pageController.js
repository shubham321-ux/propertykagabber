import Page from "../models/Page.js";

// Get all pages (for admin list)
export const listPages = async (req, res, next) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (err) {
    next(err);
  }
};

// Get one page by slug (for frontend/public)
export const getPage = async (req, res, next) => {
  try {
    const page = await Page.findOne({ name: req.params.name });
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    next(err);
  }
};

// Create a new page
export const createPage = async (req, res, next) => {
  try {
    const page = await Page.create(req.body);
    res.status(201).json(page);
  } catch (err) {
    next(err);
  }
};

// Update page meta/content
export const updatePage = async (req, res, next) => {
  try {
    const page = await Page.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    next(err);
  }
};

// Delete page
export const deletePage = async (req, res, next) => {
  try {
    await Page.findOneAndDelete({ name: req.params.name });
    res.json({ message: "Page deleted" });
  } catch (err) {
    next(err);
  }
};
