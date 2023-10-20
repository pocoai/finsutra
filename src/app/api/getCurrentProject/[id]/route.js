import Project from "@/models/Project";
import User from "@/models/User";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { connectDb } from "@/app/lib/connectDb";

await connectDb();

export async function GET(request, { params }) {
  const id = params.id;

  try {
    let project = await Project.findOne({ _id: id });
    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(error);
  }
}
