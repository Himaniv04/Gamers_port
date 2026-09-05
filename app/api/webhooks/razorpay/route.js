import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);

    // Check event type
    if (payload.event === "payment.captured" || payload.event === "order.paid") {
      const paymentEntity = payload.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;

      const booking = await prisma.booking.findFirst({
        where: { razorpayOrderId: orderId },
      });

      if (booking) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: {
            status: "CONFIRMED",
            razorpayPaymentId: paymentId,
            razorpaySignature: signature || "verified_webhook",
          },
        });

        console.log(`Booking ${booking.id} CONFIRMED via Razorpay webhook`);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Razorpay Webhook Verification Error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing error" },
      { status: 500 }
    );
  }
}
