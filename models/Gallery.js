import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Image title is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public_id is required"],
    },
    category: {
      type: String,
      default: "Ambience",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    uploadedBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
