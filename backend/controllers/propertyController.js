// controllers/propertyController.js
import Property from "../models/Property.js";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Helper: Upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, folder, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    // Convert buffer to stream and pipe it
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

// ✅ CREATE PROPERTY
export const create = async (req, res, next) => {
  try {
    const { title, description, price, location } = req.body;
    const images = [];
    let video = null;

    // Upload images
    if (req.files?.images?.length > 0) {
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(
          file.buffer,
          "properties/images",
          "image"
        );
        images.push(result.secure_url);
      }
    }

    // Upload video
    if (req.files?.video?.[0]) {
      const result = await uploadToCloudinary(
        req.files.video[0].buffer,
        "properties/videos",
        "video"
      );
      video = result.secure_url;
    }

    // Save property
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
    console.error("❌ Property create error:", err);
    res.status(500).json({ message: "Failed to create property", error: err.message });
  }
};

// ✅ LIST ALL
export const list = async (req, res, next) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

// ✅ GET ONE
export const getOne = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    next(err);
  }
};

// ✅ UPDATE
export const update = async (req, res, next) => {
  try {
    const { title, description, price, location, replaceImages } = req.body;
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;
    property.location = location || property.location;

    // Upload new images
    if (req.files?.images?.length > 0) {
      const newImages = [];
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(file.buffer, "properties/images", "image");
        newImages.push(result.secure_url);
      }

      property.images =
        replaceImages === "true" ? newImages : [...property.images, ...newImages];
    }

    // Upload new video
    if (req.files?.video?.[0]) {
      const result = await uploadToCloudinary(req.files.video[0].buffer, "properties/videos", "video");
      property.video = result.secure_url;
    }

    const updated = await property.save();
    res.json(updated);
  } catch (err) {
    console.error("❌ Property update error:", err);
    res.status(500).json({ message: "Failed to update property", error: err.message });
  }
};

// ✅ DELETE PROPERTY
export const remove = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    await property.deleteOne();
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE SINGLE IMAGE
export const deleteImage = async (req, res, next) => {
  try {
    const { id, index } = req.params;
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    if (!property.images || !property.images[index])
      return res.status(400).json({ message: "Image not found" });

    property.images.splice(index, 1);
    await property.save();
    res.json({ message: "Image deleted", property });
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE VIDEO
export const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    property.video = null;
    await property.save();

    res.json({ message: "Video deleted successfully", property });
  } catch (err) {
    next(err);
  }
};
