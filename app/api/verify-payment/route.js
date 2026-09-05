import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();

    const razorpay_order_id = body.razorpay_order_id || body.razorpayOrderId || body.orderId;
    const razorpay_payment_id = body.razorpay_payment_id || body.razorpayPaymentId || body.paymentId;
    const razorpay_signature = body.razorpay_signature || body.razorpaySignature || body.signature;
    const bookingId = body.bookingId;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification parameters: order_id, payment_id, and signature are required" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "RAZORPAY_KEY_SECRET is missing in environment variables" },
        { status: 500 }
      );
    }

    // Signature verification algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed: Signature mismatch" },
        { status: 400 }
      );
    }

    let booking = null;
    if (bookingId) {
      try {
        booking = await prisma.booking.update({
          where: { id: Number(bookingId) },
          data: {
            status: "CONFIRMED",
            razorpayPaymentId: razorpay_payment_id,
            razorpayOrderId: razorpay_order_id,
            razorpaySignature: razorpay_signature,
          },
        });
      } catch (dbErr) {
        console.warn("Database booking update error during payment verification:", dbErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and booking confirmed!",
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      booking,
    });
  } catch (error) {
    console.error("Razorpay Payment Verification Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error during payment verification" },
      { status: 500 }
    );
  }
}
