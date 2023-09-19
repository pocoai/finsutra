import { connectDb } from "@/app/lib/connectDb";
import Project from "@/models/Project";
import { getApi } from "@/utils/api";
import axios from "axios";

import { NextResponse } from "next/server";

await connectDb();
export async function GET(request) {
  let api = getApi(1, 1);

  console.log(api);

  const q = request.nextUrl.searchParams.get("query");
  const id = request.nextUrl.searchParams.get("id");

  let result = await axios.get(`${api}?q=${q}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (result.data.success) {
    let project = await Project.findById(id);

    project.query = q;
    project.queryResults = result.data.content;

    await project.save();
    return NextResponse.json({
      success: true,
      data: project.queryResults,
    });
  } else {
    return new Response(null, { status: 404, statusText: "Something went wrong" });
  }
}
