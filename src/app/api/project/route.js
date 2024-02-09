import Project from "@/models/Project";
import { NextResponse } from "next/server";

import { connectDb } from "@/app/lib/connectDb";

await connectDb();

export const GET = async (request) => {
  let projects = await Project.find({}).sort({ updatedAt: -1 });
  return NextResponse.json({
    success: true,
    data: projects,
  });
};

export const POST = async (request) => {

  const { name, index } = await request.json();
  console.log(name, index);
  let newProject = await Project.create({
    name,
    index: index,
    reselect: true,
    sharable: true,
  });

  return NextResponse.json({
    success: true,
    data: newProject,
  });
};
