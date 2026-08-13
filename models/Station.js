import mongoose from "mongoose";

const StationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Station name is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Station type is required"],
      enum: ["PC", "CONSOLE", "VR", "SIMULATOR"],
      default: "PC",
    },
    specs: {
      type: [String],
      default: [],
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"],
      min: [0, "Hourly rate cannot be negative"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Station || mongoose.model("Station", StationSchema);
