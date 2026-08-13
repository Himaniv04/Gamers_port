import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Booking from "@/models/Booking";
import razorpay from "@/lib/razorpay";

export async function POST(req) {
  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status !== "PENDING") {
      return NextResponse.json(
        { error: `Booking status is ${booking.status}` },
        { status: 400 }
      );
    }

    if (new Date() > new Date(booking.lockExpiresAt)) {
      booking.status = "EXPIRED";
      await booking.save();
      return NextResponse.json(
        { error: "Booking reservation lock has expired. Please select the slot again." },
        { status: 410 }
      );
    }

    // Convert totalAmount (INR) to paise for Razorpay (multiply by 100)
    const options = {
      amount: Math.round(booking.totalAmount * 100),
      currency: "INR",
      receipt: `receipt_${booking._id}`,
      notes: {
        bookingId: booking._id.toString(),
        userEmail: booking.userEmail,
        stationId: booking.stationId.toString(),
      },
    };

    const order = await razorpay.orders.create(options);

    // Save orderId to booking record
    booking.razorpayOrderId = order.id;
    await booking.save();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      bookingId: booking._id,
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
