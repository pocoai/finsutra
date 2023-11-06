import { NextResponse } from "next/server";
const docs = require("@googleapis/docs");
import { drive_v3, google } from "googleapis";
import { auth, currentUser } from "@clerk/nextjs";
import { connectDb } from "@/app/lib/connectDb";
import Project from "@/models/Project";
const path = require("path");
const marked = require('marked');

function extractPlainTextFromMarkdown(markdown) {
  // Parse the Markdown and render it to HTML
  const html = marked.parse(markdown);

  // Replace &#39; with an apostrophe (')
  const htmlWithApostropheReplaced = html.replace(/&#39;/g, "'");

  // Replace &quot; with double quotes (")
  const htmlWithQuotesReplaced = htmlWithApostropheReplaced.replace(/&quot;/g, '"');

  // Strip HTML tags and unescaped entities to get plain text
  const plainText = htmlWithQuotesReplaced.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

  return plainText;

}




const getBody = (journey,project) =>{
  if(journey === 1){
    const insertTab1 = [   {
      "insertText": {
        "text": project.name + "\n\n",
        "location": {
          "index": 1
        }
      }
    },
    {
      insertText:{
        text:"Journey 1" + "\n\n",
        endOfSegmentLocation:{
          segmentId:""
        }
      }
    },
    {
      insertText:{
        text:"1. Idea Articulation" + "\n\n",
        endOfSegmentLocation:{
          segmentId:""
        }
      }
    },project.journey1.tab1.data.map(item => ({
      insertText: {
        text: `${item.key} - ${item.value}` + "\n\n",
        endOfSegmentLocation: {
          segmentId: ""
        }
      }
    }))]


    const insertTab2 = project.journey1?.tab2?.selected ? [{
      insertText:{
        text:"2. Problem Solution Fit" + "\n\n",
        endOfSegmentLocation:{
          segmentId:""
        }
      }
    },
    {
      insertText:{
        text: "Summary :" + project.journey1.tab2.data["Executive Summary"] + "\n\n",
        endOfSegmentLocation:{
          segmentId:""
        }
      }
    },
    project.journey1.tab2.data.ps_list.map(item => ({
      insertText: {
        text: `Problem : ${item.Problem}` + "\n" + `Solution: ${item.Solution}` + "\n\n",
        endOfSegmentLocation: {
          segmentId: ""
        }
      }
    }))

  ] :[];

  const insertTab3 = project.journey1?.tab3?.selected ? [{
    insertText:{
      text:"3. Brand Kit" + "\n\n",
      endOfSegmentLocation:{
        segmentId:""
      }
    }
  },
  Object.entries(project.journey1.tab3.data).map(item =>({
    insertText: {
      text: `${item[0] +  ":  " + item[1]}`+ "\n\n",
      endOfSegmentLocation: {
        segmentId: ""
      }
    }
  }))
]:[];

  const insertTab4 = project.journey1?.tab4?.selected ? [{
    insertText:{
      text:"4. Positioning and Messaging" + "\n\n",
      endOfSegmentLocation:{
        segmentId:""
      }
    }
  },{
    insertText:{
      text:"Positioning :" + project.journey1.tab4.data["Positioning"]  + "\n\n",
      endOfSegmentLocation:{
        segmentId:""
      }
    }
  },project.journey1.tab4.data["USPs"].map((item,index)=>({
    insertText: {
      text: `${index+1})  ${item}`+  "\n\n",
      endOfSegmentLocation: {
        segmentId: ""
      }
    }
  }))]:[];

  const insertTab567 = [
    project.journey1?.tab5?.selected && {
    insertText:{
      text:"5. Coming Soon Page"  + "\n\n",
      endOfSegmentLocation:{
        segmentId:""
      }
    }
  },
  project.journey1?.tab5?.selected && 
  {
    insertText:{
      text: extractPlainTextFromMarkdown(project.journey1.tab5.data) + "\n\n",
      endOfSegmentLocation:{
        segmentId:""
      }
    }
  },
  project.journey1?.tab6?.selected && 
  {
    insertText:{
      text:"6. MVP Page" + "\n\n" ,
      endOfSegmentLocation:{
        segmentId:""
      }
    }
  },
  project.journey1?.tab6?.selected && 
  {
    insertText:{
      text: extractPlainTextFromMarkdown(project.journey1.tab6.data) + "\n\n",
      endOfSegmentLocation:{
        segmentId:""
      }
    }
  },
  project.journey1?.tab7?.selected && 
  {
    insertText:{
      text:"7. Features to Mponetize" + "\n\n" ,
      endOfSegmentLocation:{
        segmentId:""
      }
    }
  },
  project.journey1?.tab7?.selected && 
  {
    insertText:{
      text: extractPlainTextFromMarkdown(project.journey1.tab7.data) + "\n\n",
      endOfSegmentLocation:{
        segmentId:""
      }
    }
  },
]


const insertTab8 = [
  project.journey1?.tab8?.selected && {
  insertText:{
    text:"8. Research and Knowledge Bank" + "\n\n" ,
    endOfSegmentLocation:{
      segmentId:""
    }
  }
},
project.journey1?.tab8?.selected && 
project.journey1.tab8.data.competitors.map((item)=>({
  insertText:{
    text: `Country : ${item.country} \n Domain : ${item.domain} \n Description : ${item.description}` + "\n\n",
    endOfSegmentLocation:{
      segmentId:""
    }
  }
}))
]

const insertTab9and10 = [project.journey1?.tab9_5?.selected && {
  insertText:{
    text: "9. Growth Levers" + "\n",
    endOfSegmentLocation:{
      segmentId:""
    }
  }
},project.journey1?.tab9_5?.selected &&{
  insertText:{
    text: extractPlainTextFromMarkdown(project.journey1.tab9_5.data) + "\n\n",
    endOfSegmentLocation:{
      segmentId:""
    }
  }
},project.journey1?.tab10?.selected &&{
  insertText:{
    text: "10. Financial Statement" + "\n",
    endOfSegmentLocation:{
      segmentId:""
    }
  }
},project.journey1?.tab10?.selected &&{
  insertText:{
    text: extractPlainTextFromMarkdown(project.journey1.tab10.data) + "\n\n",
    endOfSegmentLocation:{
      segmentId:""
    }
  }
},]


    return [
      ...insertTab1
      ,...insertTab2,
      ...insertTab3,
      ...insertTab4,
      ...insertTab567,
      ...insertTab8,
      ...insertTab9and10
      
    ]
  }
}
 
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

  

    let insertResponse = await client.documents.batchUpdate({
      documentId: docId,
      requestBody: {
        "requests": getBody(journey,project)
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
