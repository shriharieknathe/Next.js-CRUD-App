import connectMongoDB from "@/lib/mongodb";
import Bundle from "@/models/bundle"; // Ensure your bundle model is imported correctly
import { NextResponse } from "next/server";

// Update an existing bundle (PUT)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, items, object_type, condition, created_by } =
    await request.json(); // Updated: 'status' to 'condition'

  await connectMongoDB();

  // Update the bundle with the provided data
  await Bundle.findByIdAndUpdate(id, {
    name,
    items,
    object_type,
    condition, // Updated field
    created_by,
  });

  return NextResponse.json({ message: "Bundle updated" }, { status: 200 });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectMongoDB();

  const bundle = await Bundle.findOne({ _id: id });

  if (!bundle) {
    return NextResponse.json({ message: "Bundle not found" }, { status: 404 });
  }

  return NextResponse.json({ bundle }, { status: 200 });
}
