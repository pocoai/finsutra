import { connectDb } from "@/app/lib/connectDb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  await connectDb();
  const { id } = params;

  let journey = request.nextUrl.searchParams.get("journey");
  journey = parseInt(journey);

  let project = await Project.findOne({ _id: id })
    .select(`name sharable journey${journey} createdAt userId`)
    .populate("userId", "firstName")
    .lean();

  if (project.sharable) {
    return NextResponse.json({
      success: true,
      data: project,
    });
  } else {
    return NextResponse.json(
      {
        success: false,
        error: "not_found",
      },
      { status: 404, statusText: "Not Found" }
    );
  }
};

export const POST = async (request, { params }) => {
  await connectDb();
  const { id } = params;

  let project = await Project.findOne({ _id: id });

  if (project.sharable) {
    return NextResponse.json({
      success: true,
      sharable: project.sharable,
    });
  }

  project.sharable = true;

  await project.save();

  return NextResponse.json({
    success: true,
    sharable: project.sharable,
  });
};
