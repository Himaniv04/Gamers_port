import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import Gallery from "@/models/Gallery";
import cloudinary from "@/lib/cloudinary";

async function verifyAdmin() {
  const { userId } = await auth();
  if (!userId) return false;

  const user = await currentUser();
  const adminEmails = (process.env.CLERK_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase());
  
  const userEmail = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  return userEmail && (adminEmails.length === 0 || adminEmails.includes(userEmail));
}

// GET: Public or Admin view gallery photos
export async function GET(req) {
  try {
    await connectToDatabase();
    const photos = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

// POST: Admin upload gallery metadata
export async function POST(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectToDatabase();
    const body = await req.json();
    const { title, imageUrl, publicId, category, tags } = body;

    const newPhoto = await Gallery.create({
      title,
      imageUrl,
      publicId,
      category: category || "Ambience",
      tags: tags || [],
    });

    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to create gallery item" }, { status: 500 });
  }
}

// DELETE: Admin delete photo from Cloudinary & DB
export async function DELETE(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Photo ID required" }, { status: 400 });
    }

    await connectToDatabase();
    const photo = await Gallery.findById(id);

    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if publicId exists
    if (photo.publicId) {
      await cloudinary.uploader.destroy(photo.publicId);
    }

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ message: "Photo deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to delete photo" }, { status: 500 });
  }
}
