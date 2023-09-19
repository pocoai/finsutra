import Project from "@/models/Project";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;

  let { userId } = auth();

  let journey = request.nextUrl.searchParams.get("journey");

  journey = parseInt(journey);

  let project;

  if (journey === 1) {
    project = await Project.findOne({
      _id: id,
      uid: userId,
    }).select("journey1 name query");

    if (!project) {
      return new Response(null, { status: 404, statusText: "Not Found" });
    }
  }

  return NextResponse.json({
    success: true,
    data: project,
  });
}
