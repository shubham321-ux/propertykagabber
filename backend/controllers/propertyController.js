// controllers/propertyController.js
import Property from "../models/Property.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper: upload from buffer
const uploadToCloudinary = (fileBuffer, folder, resourceType = "image") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

// ✅ Create
export const create = async (req, res, next) => {
  try {
    const { title, description, price, location } = req.body;
    const images = [];
    let video = null;

    if (req.files?.images) {
      for (const file of req.files.images) {
        const upload = await uploadToCloudinary(file.buffer, "properties/images", "image");
        images.push(upload.secure_url);
      }
    }

    if (req.files?.video?.[0]) {
      const upload = await uploadToCloudinary(req.files.video[0].buffer, "properties/videos", "video");
      video = upload.secure_url;
    }

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
    console.error("Cloudinary upload error:", err);
    next(err);
  }
};

// ✅ List
export const list = async (req, res, next) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

// ✅ Get one
export const getOne = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    res.json(property);
  } catch (err) {
    next(err);
  }
};

// ✅ Update
export const update = async (req, res, next) => {
  try {
    const { title, description, price, location, replaceImages } = req.body;
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });

    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;
    property.location = location || property.location;

    if (req.files?.images?.length > 0) {
      const newImages = [];
      for (const file of req.files.images) {
        const upload = await uploadToCloudinary(file.buffer, "properties/images", "image");
        newImages.push(upload.secure_url);
      }
      property.images =
        replaceImages === "true"
          ? newImages
          : [...property.images, ...newImages];
    }

    if (req.files?.video?.[0]) {
      const upload = await uploadToCloudinary(req.files.video[0].buffer, "properties/videos", "video");
      property.video = upload.secure_url;
    }

    const updated = await property.save();
    res.json(updated);
  } catch (err) {
    console.error("Error updating property:", err);
    next(err);
  }
};

// ✅ Delete Property
export const remove = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    await property.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

// ✅ Delete single image
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

// ✅ Delete video
export const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    property.video = null;
    await property.save();
    res.json({ message: "Video deleted", property });
  } catch (err) {
    next(err);
  }
};
