import MinigatorChats from "@/models/MinigatorChats";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 400,
      }
    );
  }

  let minigator = await MinigatorChats.findOne({ projectId: id });

  console.log(minigator, "project");

  let data = [];

  data = minigator?.messages || [];

  data.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  return NextResponse.json({
    success: true,
    data,
  });
};

export const POST = async (request, { params }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 400,
      }
    );
  }

  const { data } = await request.json();

  let minigator = await MinigatorChats.findOne({ projectId: id });

  if (!minigator) {
    minigator = new MinigatorChats({
      projectId: id,
      messages: [
        {
          type: data.type,
          message: data.message,
          timestamp: new Date(),
        },
      ],
    });
  } else {
    minigator.messages.push({
      type: data.type,
      message: data.message,
      timestamp: new Date(),
    });
  }

  await minigator.save();

  return NextResponse.json({
    success: true,
    message: "Added Succesfully",
  });
};
