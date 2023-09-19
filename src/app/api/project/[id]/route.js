import Project from "@/models/Project";
import { getApi } from "@/utils/api";
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
    })
      .select("journey1 name query")
      .lean();

    if (!project) {
      return new Response(null, { status: 404, statusText: "Not Found" });
    }

    if (!project.query) {
      project.query = "";
    }
  }

  return NextResponse.json({
    success: true,
    data: project,
  });
}

export async function POST(request, { params }) {
  const { userId } = auth();

  const { id } = params;

  const journey = parseInt(request.nextUrl.searchParams.get("journey"));
  const tab = parseInt(request.nextUrl.searchParams.get("tab"));

  let result;

  if (journey === 1) {
    if (tab === 1) {
      const { data } = await request.json();

      let project = await Project.findById(id);

      let tab1 = {
        data: data,
        selected: true,
      };

      project.journey1 = {};
      project.journey1["tab1"] = tab1;

      await project.save();

      console.log(project);

      return NextResponse.json({
        success: true,
        message: "project updated",
      });
    }
  }
}
