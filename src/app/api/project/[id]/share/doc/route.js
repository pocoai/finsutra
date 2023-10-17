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
    },
  });

  //   console.log(createResponse.data);

  if (createResponse.data.documentId) {
    let docId = createResponse.data.documentId;

    const dataToInsert = [
      {
        key: "Name",
        value: "SkyRent",
      },
      {
        key: "Elevator Pitch",
        value: "SkyRent: Simplifying House Renting",
      },
      {
        key: "Ideal Customer Profile (ICP)",
        value: "Renters, landlords, real estate agencies",
      },
      {
        key: "Industry",
        value: "Real Estate",
      },
      {
        key: "Problem Statement",
        value: "Complex and time-consuming house renting process, lack of transparency and trust",
      },
      {
        key: "Value Proposition",
        value:
          "SkyRent offers a user-friendly platform that simplifies the house renting process. With our innovative technology, renters can easily search for available properties, schedule viewings, and submit rental applications. Landlords and real estate agencies benefit from increased visibility and a streamlined process, while renters enjoy a transparent and efficient renting experience.",
      },
    ];

    // Construct the batchUpdate requests to insert data
    // const batchUpdateRequests = dataToInsert.map((item, index) => {
    //   return {
    //     insertText: {
    //       text: `${item.key}: ${item.value}\n`,
    //     },
    //   };
    // });

    let insertResponse = await client.documents.batchUpdate({
      documentId: docId,
      requestBody: {
        requests: [
          {
            insertText: {
              text: "",
              location: {
                index: 0,
              },
            },
          },
        ],
      },
    });

    console.log(insertResponse.data);

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
