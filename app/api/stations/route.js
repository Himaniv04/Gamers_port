import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Station from "@/models/Station";

// GET: List all active gaming stations
export async function GET() {
  try {
    await connectToDatabase();
    const stations = await Station.find({ isActive: true }).sort({ type: 1, name: 1 });
    return NextResponse.json(stations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stations" }, { status: 500 });
  }
}

// POST: Seed or create a new gaming station (Admin/Setup)
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Support single creation or bulk seeding
    if (Array.isArray(body)) {
      const created = await Station.insertMany(body);
      return NextResponse.json(created, { status: 201 });
    }

    const station = await Station.create(body);
    return NextResponse.json(station, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to create station" }, { status: 500 });
  }
}
