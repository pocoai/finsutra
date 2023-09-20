import { connectDb } from "@/app/lib/connectDb";
import Project from "@/models/Project";
import { getApi } from "@/utils/api";
import axios from "axios";

import { NextResponse } from "next/server";

await connectDb();
export async function GET(request) {
  let api = getApi(1, 1);

  console.log(api);

  const q = request.nextUrl.searchParams.get("q");
  const id = request.nextUrl.searchParams.get("id");

  let url = `${api}?q=${q}`;

  console.log(url, "url");

  let result = await axios.get(`${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (result.data.success) {
    let project = await Project.findById(id);

    console.log(q, "q");

    project.query = q;
    project.queryResults = result.data.content;

    console.log(project, "project");

    await project.save();
    return NextResponse.json({
      success: true,
      data: project.queryResults,
    });
  } else {
    return new Response(null, { status: 404, statusText: "Something went wrong" });
  }
}
