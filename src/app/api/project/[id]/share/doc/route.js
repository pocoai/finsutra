import { NextResponse } from "next/server";
const docs = require("@googleapis/docs");
import { drive_v3, google } from "googleapis";
import { auth, currentUser } from "@clerk/nextjs";
import { connectDb } from "@/app/lib/connectDb";
import Project from "@/models/Project";
const path = require("path");

export const POST = async (request, { params }) => {
  await connectDb();
  const { id } = params;

  const { emailAddresses } = await currentUser();

  const { journey } = await request.json();

  let project = await Project.findOne({ _id: id });

  if (!project) {
    return NextResponse.json(
      {
        success: false,
        error: "not_found",
      },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  const emailToShareWith = emailAddresses[0].emailAddress;

  const auth = new docs.auth.GoogleAuth({
    keyFilename: path.join(process.cwd(), "/src/firebase/credentials.json"),
    scopes: [
      "https://www.googleapis.com/auth/documents",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });
  const authClient = await auth.getClient();

  const client = await docs.docs({
    version: "v1",
    auth: authClient,
  });

  // Create the Google Docs document
  const createResponse = await client.documents.create({
    requestBody: {
      title: project.name + " - " + "Journey " + journey,
      body: {
        content: [
          {
            paragraph: {
              elements: [
                {
                  textRun: {
                    content: "Hello, World!",
                  },
                },
              ],
            },
          },
          // You can add more content here
          // For example, to add a new paragraph with text:
          {
            paragraph: {
              elements: [
                {
                  textRun: {
                    content: "This is a new paragraph.",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  //   console.log(createResponse.data);

  if (createResponse.data.documentId) {
    // Share the document with the specified email address using the Google Drive API
    const driveAuth = new google.auth.GoogleAuth({
      keyFilename: path.join(process.cwd(), "/src/firebase/credentials.json"),
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });
    const driveAuthClient = await driveAuth.getClient();

    const driveClient = await google.drive({
      version: "v3",
      auth: driveAuthClient,
    });

    const documentId = createResponse.data.documentId;

    let permission = await driveClient.permissions.create({
      fileId: documentId,
      emailMessage: `I want to share this document with ${emailToShareWith}`,
      requestBody: {
        role: "writer", // or "reader" or "commenter" depending on the desired permission
        type: "user",
        emailAddress: emailToShareWith,
      },
    });

    console.log("permission", permission.data);

    return NextResponse.json({
      success: true,
      documentId: documentId,
      sharedWithEmail: emailToShareWith,
    });
  } else {
    return NextResponse.json(
      {
        success: false,
        message: "Some error occurred while creating the document",
      },
      { status: 400, statusText: "Server Error" }
    );
  }
};
