import { connectDb } from "@/app/lib/connectDb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

connectDb();

export const POST = async (request) => {
  const { userId } = await request.json();

  let projects = await Project.find({
    uid: userId,
  });

  return NextResponse.json({
    success: true,
    data: projects,
  });
};
