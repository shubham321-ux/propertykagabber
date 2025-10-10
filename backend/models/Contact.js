import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    // ✅ Multiple contact numbers and emails
    phone: [{ type: String }], // e.g., ["+91 9876543210", "+91 9876501234"]
    email: [{ type: String }], // e.g., ["info@mysite.com", "support@mysite.com"]

    // ✅ Multiple addresses
    address: [{ type: String }],

    // ✅ Social media links (array of objects allows flexibility)
    socialLinks: [
      {
        platform: { type: String }, // e.g. "facebook", "instagram"
        url: { type: String },
      },
    ],

    // ✅ Extra fields
    youtube: { type: String },
    mapLink: { type: String }, // Google Maps link
    aboutText: { type: String }, // Short footer/about text
    workingHours: { type: String }, // e.g. "Mon–Fri 9am–6pm"
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
