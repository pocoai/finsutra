import { connectDb } from "@/app/lib/connectDb";
import Project from "@/models/Project";
import { PORTKEY, getApi, getContent } from "@/utils/api";
import axios from "axios";

import { NextResponse } from "next/server";

await connectDb();
export async function GET(request) {
  let api = getApi(1, 1);

  // console.log(api);

  const q = request.nextUrl.searchParams.get("q");
  const id = request.nextUrl.searchParams.get("id");

  // console.log(id, "id");

  try {
    let result = await axios.post(
      api,
      {
        variables: {
          idea: q,
        },
      },
      {
        headers: {
          "x-portkey-api-key": PORTKEY,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(result.data, "result");

    if (result.data.success) {
      let project = await Project.findById(id);

      // console.log(q, "q");

      project.query = q;
      project.queryResults = getContent(result);

      // console.log(project, "project");

      await project.save();
      return NextResponse.json({
        success: true,
        data: project.queryResults,
      });
    } else {
      return new Response(null, { status: 404, statusText: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 404, statusText: "Something went wrong" });
  }
}
