import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import razorpay from "@/lib/razorpay";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { bookingId, amount: customAmount, currency, receipt } = body;

    let amountInPaise;
    let targetBooking = null;

    if (bookingId) {
      targetBooking = await prisma.booking.findUnique({
        where: { id: Number(bookingId) },
      });

      if (!targetBooking) {
        return NextResponse.json({ error: "Booking record not found" }, { status: 404 });
      }

      if (targetBooking.status !== "PENDING") {
        return NextResponse.json(
          { error: `Booking status is currently ${targetBooking.status}` },
          { status: 400 }
        );
      }

      if (new Date() > new Date(targetBooking.lockExpiresAt)) {
        targetBooking = await prisma.booking.update({
          where: { id: Number(bookingId) },
          data: { status: "EXPIRED" },
        });
        return NextResponse.json(
          { error: "Reservation lock expired. Please select the slot again." },
          { status: 410 }
        );
      }

      amountInPaise = Math.round(targetBooking.totalAmount * 100);
    } else if (customAmount) {
      amountInPaise = Number(customAmount);
    } else {
      return NextResponse.json(
        { error: "Booking ID or payment amount is required" },
        { status: 400 }
      );
    }

    if (isNaN(amountInPaise) || amountInPaise < 100) {
      return NextResponse.json(
        { error: "Minimum payment amount must be at least 100 paise (₹1)" },
        { status: 400 }
      );
    }

    const options = {
      amount: amountInPaise,
      currency: currency || "INR",
      receipt: receipt || `rcpt_${bookingId || Date.now()}`,
      notes: targetBooking
        ? {
            bookingId: targetBooking.id.toString(),
            userEmail: targetBooking.userEmail,
          }
        : {},
    };

    const order = await razorpay.orders.create(options);

    if (targetBooking) {
      targetBooking = await prisma.booking.update({
        where: { id: Number(bookingId) },
        data: { razorpayOrderId: order.id },
      });
    }

    return NextResponse.json({
      success: true,
      order_id: order.id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
      bookingId: targetBooking?.id,
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create Razorpay payment order" },
      { status: 500 }
    );
  }
}
