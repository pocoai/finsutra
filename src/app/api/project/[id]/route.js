import Project from "@/models/Project";
import { API, getApi } from "@/utils/api";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;

  let { userId } = auth();

  let journey = request.nextUrl.searchParams.get("journey");

  journey = parseInt(journey);

  let project;

  if (journey === 1) {
    project = await Project.findOne({
      _id: id,
      uid: userId,
    })
      .select("journey1 name query")
      .lean();

    if (!project) {
      return new Response(null, { status: 404, statusText: "Not Found" });
    }

    if (!project.query) {
      project.query = "";
    }
  }

  return NextResponse.json({
    success: true,
    data: project,
  });
}

export async function POST(request, { params }) {
  const { userId } = auth();

  const { id } = params;

  const journey = parseInt(request.nextUrl.searchParams.get("journey"));
  const tab = parseInt(request.nextUrl.searchParams.get("tab"));

  let result;

  const { data } = await request.json();

  let project = await Project.findById(id);

  if (!project) {
    return new Response(null, { status: 404, statusText: "Not Found" });
  }

  if (journey === 1) {
    if (tab === 1) {
      let tab1 = {
        data: data,
        selected: true,
      };

      project.journey1 = {};
      project.journey1["tab1"] = tab1;

      await project.save();
    }

    if (tab === 2) {
      let api = getApi(1, 2);

      let pitch = project.journey1.tab1.data[0]?.value;
      let icp = project.journey1.tab1.data[1]?.value;

      console.log(pitch, icp, "pitch");

      let result = await axios.get(`${api}?x=${pitch}&y=${icp}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log(result.data, "api results ");

      if (result.data.success) {
        let tab2 = {
          data: result.data.content,
          selected: true,
        };

        let updated_res = await Project.findByIdAndUpdate(
          id,
          {
            "journey1.tab2": tab2,
          },
          {
            new: true,
          }
        );

        console.log(updated_res, "updated_res");
      } else {
        return new Response(null, { status: 404, statusText: "Not Found" });
      }
    }

    if (tab === 3) {
      let api = `${API}/j1/tab3`;

      let pitch = project.journey1.tab1.data[0]?.value;
      let icp = project.journey1.tab1.data[1]?.value;

      console.log(pitch, icp, "pitch");

      let result = await axios.get(`${api}?x=${pitch}&y=${icp}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log(result.data, "api results ");

      if (result.data.success) {
        let tab3 = {
          data: result.data.content,
          selected: true,
        };

        let updated_res = await Project.findByIdAndUpdate(
          id,
          {
            "journey1.tab3": tab3,
          },
          {
            new: true,
          }
        );

        console.log(updated_res, "updated_res");
      } else {
        return new Response(null, { status: 404, statusText: "Not Found" });
      }
    }

    if (tab === 4) {
      let api = `${API}/j1/tab4`;

      let pitch = project.journey1.tab1.data[0]?.value;
      let icp = project.journey1.tab1.data[1]?.value;

      console.log(pitch, icp, "pitch");

      let result = await axios.get(`${api}?x=${pitch}&y=${icp}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(result.data, "api results ");

      if (result.data.success) {
        let tab4 = {
          data: result.data.content,
          selected: true,
        };

        let updated_res = await Project.findByIdAndUpdate(
          id,
          {
            "journey1.tab4": tab4,
          },
          {
            new: true,
          }
        );

        console.log(updated_res, "updated_res");
      } else {
        return new Response(null, { status: 404, statusText: "Not Found" });
      }
    }
    if (tab === 5) {
      let api = `${API}/j1/tab5`;

      let pitch = project.journey1.tab1.data[0]?.value;
      let icp = project.journey1.tab1.data[1]?.value;

      console.log(pitch, icp, "pitch");

      let result = await axios.get(`${api}?x=${pitch}&y=${icp}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(result.data, "api results ");

      if (result.data.success) {
        let tab = {
          data: result.data.content,
          selected: true,
        };

        let updated_res = await Project.findByIdAndUpdate(
          id,
          {
            "journey1.tab5": tab,
          },
          {
            new: true,
          }
        );

        console.log(updated_res, "updated_res");
      } else {
        return new Response(null, { status: 404, statusText: "Not Found" });
      }
    }
  }

  return NextResponse.json({
    success: true,
    message: "project updated",
  });
}
