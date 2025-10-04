// controllers/propertyController.js
import fs from "fs";
import path from "path";
import Property from "../models/Property.js";

/**
 * Remove a server-side file using a stored relative path like "/uploads/images/123.jpg"
 */
const removeFileIfExists = (relativePath) => {
  if (!relativePath) return;
  // make sure we form an absolute path
  const rel = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  const absolute = path.join(process.cwd(), rel);
  try {
    if (fs.existsSync(absolute)) fs.unlinkSync(absolute);
  } catch (err) {
    // log but don't throw — file removal shouldn't block the operation
    console.error("Failed to remove file:", absolute, err.message);
  }
};

// Create
export const create = async (req, res, next) => {
  try {
    const { title, description, price, location } = req.body;

    const images = req.files?.images
      ? req.files.images.map((f) => `/uploads/images/${f.filename}`)
      : [];

    const video = req.files?.video?.[0]
      ? `/uploads/videos/${req.files.video[0].filename}`
      : null;

    const property = await Property.create({
      title,
      description,
      price,
      location,
      images,
      video,
    });

    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

// List
export const list = async (req, res, next) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

// Get One
export const getOne = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  } catch (err) {
    next(err);
  }
};

// Update

// Update property
export const update = async (req, res, next) => {
  try {
    const { title, description, price, location, replaceImages } = req.body;

    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });

    // Update fields
    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;
    property.location = location || property.location;

    // Handle images
    if (req.files?.images && req.files.images.length > 0) {
      const newImages = req.files.images.map((f) => `/uploads/images/${f.filename}`);
      if (replaceImages === "true") {
        // Replace existing images completely
        property.images = newImages;
      } else {
        // Append new images
        property.images = [...property.images, ...newImages];
      }
    }

    // Handle video
    if (req.files?.video?.[0]) {
      property.video = `/uploads/videos/${req.files.video[0].filename}`;
    }

    const updated = await property.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};


// Delete (and remove files)
export const remove = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });

    // remove files
    if (Array.isArray(property.images)) {
      property.images.forEach(removeFileIfExists);
    }
    if (property.video) removeFileIfExists(property.video);

    await property.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

// DELETE single image from a property
export const deleteImage = async (req, res, next) => {
  try {
    const { id, index } = req.params; // property id + image index
    const property = await Property.findById(id);

    if (!property) return res.status(404).json({ message: "Property not found" });
    if (!property.images || !property.images[index]) {
      return res.status(400).json({ message: "Image not found" });
    }

    // remove the image at given index
    property.images.splice(index, 1);
    await property.save();

    res.json({ message: "Image deleted", property });
  } catch (err) {
    next(err);
  }
};

