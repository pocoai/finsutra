import { connectDb } from "@/app/lib/connectDb";
import Project from "@/models/Project";
import User from "@/models/User";
import { NextResponse } from "next/server";

connectDb();

export const GET = async (request) => {
  let page = parseInt(request.nextUrl.searchParams.get("page")) || 1;

  // Calculate the skip count based on the page number and limit
  const limit = 10;
  const skip = (page - 1) * limit;

  // Query the users with pagination and limit
  const users = await User.find()
    .select("firstName userId credits org email currentPlan image createdAt")
    .lean();
  // .skip(skip)
  // .limit(limit);

  for (let i = 0; i < users.length; i++) {
    users[i].totalProjects = await Project.countDocuments({ uid: users[i].userId });
  }

  users.sort((a, b) => {
    return b.totalProjects - a.totalProjects;
  });

  return NextResponse.json({
    success: true,
    data: users,
  });
};
