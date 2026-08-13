import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    bannerUrl: {
      type: String,
      required: [true, "Banner image URL is required"],
    },
    bannerPublicId: {
      type: String,
      default: "", // Cloudinary public_id for image deletion
    },
    eventDate: {
      type: Date,
      default: null,
    },
    category: {
      type: String,
      enum: ["TOURNAMENT", "OFFER", "ANNOUNCEMENT"],
      default: "ANNOUNCEMENT",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
