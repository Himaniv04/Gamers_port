import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

const defaultStations = [
  {
    name: "Pro Rig #1 - RTX 4090",
    type: "PC",
    specs: ["RTX 4090", "i9-14900K", "32GB DDR5", "240Hz OLED"],
    hourlyRate: 200,
    minPlayers: 1,
    maxPlayers: 2,
    extraPlayerFee: 80,
    isActive: true,
  },
  {
    name: "Pro Rig #2 - RTX 4080",
    type: "PC",
    specs: ["RTX 4080", "i7-13700K", "32GB DDR5", "240Hz OLED"],
    hourlyRate: 150,
    minPlayers: 1,
    maxPlayers: 2,
    extraPlayerFee: 60,
    isActive: true,
  },
  {
    name: "PS5 VIP Booth #1",
    type: "CONSOLE",
    specs: ["PlayStation 5", "55 inch 4K OLED", "DualSense Edge"],
    hourlyRate: 180,
    minPlayers: 1,
    maxPlayers: 4,
    extraPlayerFee: 50,
    isActive: true,
  },
  {
    name: "PS5 VIP Booth #2",
    type: "CONSOLE",
    specs: ["PlayStation 5", "55 inch 4K OLED", "DualSense Edge"],
    hourlyRate: 180,
    minPlayers: 1,
    maxPlayers: 4,
    extraPlayerFee: 50,
    isActive: true,
  },
  {
    name: "VR Quest 3 Simulator",
    type: "VR",
    specs: ["Meta Quest 3 512GB", "Haptic Racing Seat", "Wi-Fi 6E"],
    hourlyRate: 250,
    minPlayers: 1,
    maxPlayers: 1,
    extraPlayerFee: 0,
    isActive: true,
  },
];

// GET: List gaming stations (Auto-seeds defaults if database table is empty)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const includeAll = searchParams.get("all") === "true";

    const where = includeAll ? {} : { isActive: true };
    let stations = await prisma.station.findMany({
      where,
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });

    // Auto-seed default stations if table is completely empty
    const totalCount = await prisma.station.count();
    if (totalCount === 0) {
      console.log("No stations found in database. Auto-seeding default stations...");
      await prisma.station.createMany({ data: defaultStations });
      stations = await prisma.station.findMany({
        where,
        orderBy: [{ type: "asc" }, { name: "asc" }],
      });
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
    const { searchParams } = new URL(req.url);

    // Re-seed action: wipe all stations and insert defaults
    if (searchParams.get("seed") === "true") {
      await prisma.station.deleteMany({});
      await prisma.station.createMany({ data: defaultStations });
      const created = await prisma.station.findMany();
      return NextResponse.json(created, { status: 201 });
    }

    const body = await req.json();

    if (Array.isArray(body)) {
      await prisma.station.createMany({ data: body });
      const created = await prisma.station.findMany();
      return NextResponse.json(created, { status: 201 });
    }

    const { name, type, specs, hourlyRate, isActive, minPlayers, maxPlayers, extraPlayerFee } = body;

    if (!name || !hourlyRate) {
      return NextResponse.json(
        { error: "Station name and hourly rate are required" },
        { status: 400 }
      );
    }

    const station = await prisma.station.create({
      data: {
        name,
        type: type || "PC",
        specs: Array.isArray(specs)
          ? specs
          : (specs || "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
        hourlyRate: Number(hourlyRate),
        minPlayers: minPlayers !== undefined ? Number(minPlayers) : 1,
        maxPlayers: maxPlayers !== undefined ? Number(maxPlayers) : 1,
        extraPlayerFee: extraPlayerFee !== undefined ? Number(extraPlayerFee) : 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
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
    const body = await req.json();
    const { id, name, type, specs, hourlyRate, isActive, minPlayers, maxPlayers, extraPlayerFee } = body;

    if (!id) {
      return NextResponse.json({ error: "Station ID is required for update" }, { status: 400 });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (type !== undefined) updateData.type = type;
    if (hourlyRate !== undefined) updateData.hourlyRate = Number(hourlyRate);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (minPlayers !== undefined) updateData.minPlayers = Number(minPlayers);
    if (maxPlayers !== undefined) updateData.maxPlayers = Number(maxPlayers);
    if (extraPlayerFee !== undefined) updateData.extraPlayerFee = Number(extraPlayerFee);
    if (specs !== undefined) {
      updateData.specs = Array.isArray(specs)
        ? specs
        : specs
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
    }

    try {
      const updatedStation = await prisma.station.update({
        where: { id: Number(id) },
        data: updateData,
      });
      return NextResponse.json(updatedStation);
    } catch (e) {
      if (e.code === "P2025") {
        return NextResponse.json({ error: "Station not found" }, { status: 404 });
      }
      throw e;
    }
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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Station ID is required for deletion" }, { status: 400 });
    }

    try {
      await prisma.station.delete({ where: { id: Number(id) } });
    } catch (e) {
      if (e.code === "P2025") {
        return NextResponse.json({ error: "Station not found" }, { status: 404 });
      }
      throw e;
    }

    return NextResponse.json({ message: "Station deleted successfully", id });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete station" },
      { status: 500 }
    );
  }
}
