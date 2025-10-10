import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, 
    title: { type: String, required: true },              
    description: { type: String },                        
    keywords: { type: String },                          

    sections: [
      {
        heading: { type: String },
        content: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Page", pageSchema);
