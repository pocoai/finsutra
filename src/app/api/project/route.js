import Project from "@/models/Project";
import User from "@/models/User";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { connectDb } from "@/app/lib/connectDb";

await connectDb();

export const GET = async (request) => {
  const { userId } = auth();

  console.log(userId, "userId");

  let projects = await Project.find({ uid: userId }).sort({ updatedAt: -1 }).limit(10);

  // console.log(projects, "projects");

  return NextResponse.json({
    success: true,
    data: projects,
  });
};

export const POST = async (request) => {
  const { userId } = auth();

  let user = await User.findOne({ userId });

  const { name } = await request.json();

  // console.log(name);

  let newProject = await Project.create({
    name,
    query: name,
    userId: user._id,
    uid: userId,
  });

  return NextResponse.json({
    success: true,
    data: newProject,
  });
};
