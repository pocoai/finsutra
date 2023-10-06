import Project from "@/models/Project";
import User from "@/models/User";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const { connectDb } = require("@/app/lib/connectDb");

await connectDb();

export const POST = async (request, { params }) => {
  const { userId } = auth();

  try {
    let user = await User.findOne({ userId });

    let { data, query, choices } = await request.json();

    let name = data.find((item) => item.key === "Name")?.value;

    let newProject = await Project.create({
      name,
      userId: user._id,
      query,
      queryResults: choices,
      uid: userId,
      currentJourney: 1,
      reselect: true,
      "currentStage.1": 1,
      "journey1.tab1": {
        selected: true,
        data: data,
      },
    });

    return NextResponse.json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};
