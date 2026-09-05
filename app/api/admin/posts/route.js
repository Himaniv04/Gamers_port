import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
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

// GET: Fetch posts (published for public, all for admin)
export async function GET(req) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST: Create a new event or announcement post
export async function POST(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, content, bannerUrl, bannerPublicId, eventDate, category } = body;

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Date.now();

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        description,
        content,
        bannerUrl,
        bannerPublicId,
        eventDate: eventDate ? new Date(eventDate) : null,
        category: category || "ANNOUNCEMENT",
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to create post" }, { status: 500 });
  }
}

// DELETE: Delete a post
export async function DELETE(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID required" }, { status: 400 });
    }

    let post;
    try {
      post = await prisma.post.findUnique({ where: { id: Number(id) } });
    } catch (e) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.bannerPublicId) {
      await cloudinary.uploader.destroy(post.bannerPublicId);
    }

    await prisma.post.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to delete post" }, { status: 500 });
  }
}
