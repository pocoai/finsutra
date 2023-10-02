import { connectDb } from "@/app/lib/connectDb";
import Project from "@/models/Project";
import User from "@/models/User";
import { NextResponse } from "next/server";

connectDb();

export const GET = async (request) => {
  let totalUsers, totalProjects, newUsers;

  totalUsers = await User.countDocuments();

  totalProjects = await Project.countDocuments();

  const currentDate = new Date();
  const previousDay = new Date(currentDate);
  previousDay.setDate(currentDate.getDate() - 1);

  // New users count for the previous day
  newUsers = await User.countDocuments({
    createdAt: {
      $gte: previousDay, // Filter users created on or after the previous day
      $lt: currentDate, // Filter users created before the current day
    },
  });

  return NextResponse.json({
    success: true,
    data: {
      totalProjects,
      totalUsers,
      newUsers,
    },
  });
};
