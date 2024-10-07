import connectMongoDB from "@/lib/mongodb";
import Bundle from "@/models/bundle";
import { NextResponse } from "next/server";

// Create a new bundle
export async function POST(request: Request) {
  const { name, items, object_type, condition, created_by } = await request.json();

  await connectMongoDB();

  await Bundle.create({
    name,
    items,
    object_type,
    condition: condition || "Virual",
    created_by: created_by || "Jill Boarne",
  });

  return NextResponse.json({ message: "Bundle Created" }, { status: 201 });
}

// Get all bundles
export async function GET() {
  await connectMongoDB();

  const bundles = await Bundle.find();

  return NextResponse.json({ bundles });
}

// Delete a bundle by ID
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  await connectMongoDB();
  await Bundle.findByIdAndDelete(id);

  return NextResponse.json({ message: "Bundle deleted" }, { status: 200 });
}
