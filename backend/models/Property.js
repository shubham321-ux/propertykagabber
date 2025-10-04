import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    location: String,
    images: [String],   // store file paths
    video: String,      // store file path
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
