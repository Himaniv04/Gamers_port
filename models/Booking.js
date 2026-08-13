import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    stationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
      required: [true, "Station reference is required"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    userPhone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    bookingDate: {
      type: String, // Stored as ISO date string "YYYY-MM-DD" for strict date matching
      required: [true, "Booking date (YYYY-MM-DD) is required"],
      index: true,
    },
    startTime: {
      type: String, // 24-hr format "HH:00", e.g., "14:00"
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String, // 24-hr format "HH:00", e.g., "16:00"
      required: [true, "End time is required"],
    },
    durationHours: {
      type: Number,
      enum: [1, 2],
      required: true,
      default: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"],
      default: "PENDING",
      index: true,
    },
    // Anti-Double-Booking 10-minute temporary lock timestamp
    lockExpiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index automatically expires documents when lockExpiresAt is reached
    },
    // Payment Gateway Tracking
    razorpayOrderId: {
      type: String,
      default: null,
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    razorpaySignature: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to speed up availability queries: station + date + status
BookingSchema.index({ stationId: 1, bookingDate: 1, status: 1 });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
