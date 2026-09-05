import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// POST /api/subscribe
export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Try to create a new subscriber
    try {
      await prisma.subscriber.create({
        data: { email: email.toLowerCase().trim() },
      });
      return NextResponse.json(
        { message: "Subscribed successfully! Welcome to the guild! 🎮" },
        { status: 201 }
      );
    } catch (err) {
      // P2002 = Unique constraint violation (duplicate email)
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "Email already subscribed!" },
          { status: 400 }
        );
      }
      throw err;
    }
  } catch (error) {
    console.error("Subscribe Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
