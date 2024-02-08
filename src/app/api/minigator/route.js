import { uploadPDFClient } from "@/helpers/apiRequests";
import Project from "@/models/Project";
import fs from "fs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const GET = async (request) => {
  const id = request.nextUrl.searchParams.get("id");

  let project = await Project.findOne({ _id: id });

  if (project.minigator.index) {
    // console.log("inside here");
    const date1 = new Date(project.minigator.lastUpdated);
    const date2 = new Date(project.updatedAt);

    if (date1.getTime() === date2.getTime()) {
      // console.log("Both dates are the same.");
      return NextResponse.json({
        success: true,
        index: project.minigator.index,
      });
    }
  }

  if (!project) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 400, statusText: "Internal Server Error" }
    );
  }

  try {
    fs.writeFileSync(`${project._id}.txt`, JSON.stringify(project));
    // console.log("Data written to file");

    const formData = new FormData();
    const randomString = uuidv4() + Date.now();

    let fileBuffer = fs.readFileSync(`${project._id}.txt`);
    const fileBlob = new Blob([fileBuffer], { type: "text/plain" });

    formData.append("index_name", randomString);
    formData.append("document_source", project.name);
    formData.append("input_sequence", fileBlob, `${project.name + ".txt"}`);
    formData.append("account_id", process.env.NEXT_PUBLIC_ACCOUNTID);

    const response = await uploadPDFClient(formData);

    if (response) {
      if (response?.response === "Access Denied.") {
        await fs.unlinkSync(`${project._id}.txt`);
        return new Response(
          {
            success: false,
            message: "Internal Server Error",
          },
          { status: 400, statusText: "Internal Server Error" }
        );
      } else if (response?.response === "Successfully created index") {
        let date = new Date();

        await Project.findByIdAndUpdate(
          project._id,
          {
            $set: {
              minigator: {
                index: randomString,
                lastUpdated: date,
              },
              updatedAt: date,
            },
          },
          {
            new: true,
            multi: true,
            timestamps: false,
          }
        );

        await fs.unlinkSync(`${project._id}.txt`);
        return NextResponse.json({ success: true, index: randomString });
      }
    } else {
      await fs.unlinkSync(`${project._id}.txt`);
      new Response(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 400, statusText: "Internal Server Error" }
      );
    }
  } catch (err) {
    console.error(err);
  }
};
