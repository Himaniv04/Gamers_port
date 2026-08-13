import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = await req.json();

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !bookingId) {
      return NextResponse.json({ error: "Missing payment verification parameters" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return NextResponse.json({ error: "Payment verification signature mismatch" }, { status: 400 });
    }

    await connectToDatabase();
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return NextResponse.json({ error: "Booking record not found" }, { status: 404 });
    }

    booking.status = "CONFIRMED";
    booking.razorpayPaymentId = razorpayPaymentId;
    booking.razorpaySignature = razorpaySignature;
    await booking.save();

    return NextResponse.json({
      success: true,
      message: "Payment verified and booking confirmed!",
      booking,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: error.message || "Failed to verify payment" }, { status: 500 });
  }
}
