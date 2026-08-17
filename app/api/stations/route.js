import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Station from "@/models/Station";

export const dynamic = "force-dynamic";

const defaultStations = [
  {
    name: "Pro Rig #1 - RTX 4090",
    type: "PC",
    specs: ["RTX 4090", "i9-14900K", "32GB DDR5", "240Hz OLED"],
    hourlyRate: 200,
    isActive: true,
  },
  {
    name: "Pro Rig #2 - RTX 4080",
    type: "PC",
    specs: ["RTX 4080", "i7-13700K", "32GB DDR5", "240Hz OLED"],
    hourlyRate: 150,
    isActive: true,
  },
  {
    name: "PS5 VIP Booth #1",
    type: "CONSOLE",
    specs: ["PlayStation 5", "55 inch 4K OLED", "DualSense Edge"],
    hourlyRate: 180,
    isActive: true,
  },
  {
    name: "PS5 VIP Booth #2",
    type: "CONSOLE",
    specs: ["PlayStation 5", "55 inch 4K OLED", "DualSense Edge"],
    hourlyRate: 180,
    isActive: true,
  },
  {
    name: "VR Quest 3 Simulator",
    type: "VR",
    specs: ["Meta Quest 3 512GB", "Haptic Racing Seat", "Wi-Fi 6E"],
    hourlyRate: 250,
    isActive: true,
  },
];

// GET: List gaming stations (Auto-seeds defaults if database collection is empty)
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const includeAll = searchParams.get("all") === "true";

    const filter = includeAll ? {} : { isActive: true };
    let stations = await Station.find(filter).sort({ type: 1, name: 1 });

    // Auto-seed default stations if collection is completely empty
    const totalCount = await Station.countDocuments();
    if (totalCount === 0) {
      console.log("No stations found in database. Auto-seeding default stations...");
      stations = await Station.insertMany(defaultStations);
    }

    return NextResponse.json(stations);
  } catch (error) {
    console.error("Fetch/Seed Stations Error:", error);
    return NextResponse.json({ error: "Failed to fetch stations" }, { status: 500 });
  }
}

// POST: Add new gaming station or bulk seed
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (Array.isArray(body)) {
      const created = await Station.insertMany(body);
      return NextResponse.json(created, { status: 201 });
    }

    const { name, type, specs, hourlyRate, isActive } = body;

    if (!name || !hourlyRate) {
      return NextResponse.json(
        { error: "Station name and hourly rate are required" },
        { status: 400 }
      );
    }

    const station = await Station.create({
      name,
      type: type || "PC",
      specs: Array.isArray(specs)
        ? specs
        : (specs || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
      hourlyRate: Number(hourlyRate),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    return NextResponse.json(station, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create station" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing gaming station
export async function PUT(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, name, type, specs, hourlyRate, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "Station ID is required for update" }, { status: 400 });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (type !== undefined) updateData.type = type;
    if (hourlyRate !== undefined) updateData.hourlyRate = Number(hourlyRate);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (specs !== undefined) {
      updateData.specs = Array.isArray(specs)
        ? specs
        : specs
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    }

    const updatedStation = await Station.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedStation) {
      return NextResponse.json({ error: "Station not found" }, { status: 404 });
    }

    return NextResponse.json(updatedStation);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update station" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a gaming station
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Station ID is required for deletion" }, { status: 400 });
    }

    const deleted = await Station.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Station not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Station deleted successfully", id });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete station" },
      { status: 500 }
    );
  }
}
