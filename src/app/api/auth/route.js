import User from "@/models/User";
import { currentUser, auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDb } from "@/app/lib/connectDb";
import { getCreditLimitByEmail, getDomainFromMail, isWorkEmail } from "@/utils/helper";
import axios from "axios";
const hubspot = require("@hubspot/api-client");
import emailjs from "@emailjs/nodejs";
import Invitation from "@/models/Invitations";

await connectDb();

async function updateContactProperties(email, total_credits_used) {
  try {
    let res = await axios.post(
      `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile`,
      {
        properties: [
          {
            property: "total_navigator_credits_used",
            value: total_credits_used,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
      }
    );

    // console.log("res", res.data);

    if (res.status === 204) {
      return true;
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    return false;
  }
}

export const GET = async (request) => {
  const user = await currentUser();

  let inviteCode = request.nextUrl.searchParams.get("code");

  // console.log(inviteCode, "inviteCode");

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  let isExist = await User.findOne({ userId: user.id });

  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_API_KEY,
  });

  if (isExist) {
    updateContactProperties(isExist.email, isExist.total_credits_used);
    return NextResponse.json({
      success: true,
      data: isExist,
    });
  }

  let invitationValid = await Invitation.findOne({
    invitationCode: inviteCode,
    expiresAt: { $gt: new Date() },
    invite_status: "pending",
  });

  // console.log(invitationValid, "invitationValid");

  if (invitationValid) {
    let invitedUser = await User.findOne({ _id: invitationValid.sender });

    console.log(invitedUser, "invitedUser");

    if (invitedUser) {
      invitedUser.credits += 10;
    }

    invitationValid.invite_status = "accepted";

    await invitationValid.save();
    await invitedUser.save();
  }

  let newUser = await User.create({
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user?.emailAddresses[0].emailAddress,
    isOrgEmail: isWorkEmail(user?.emailAddresses[0].emailAddress),
    org: getDomainFromMail(user?.emailAddresses[0].emailAddress),
    credits: getCreditLimitByEmail(user?.emailAddresses[0].emailAddress),
    image: user?.hasImage ? user?.imageUrl : "",
  });

  try {
    emailjs
      .send(
        "service_t5oiyuj",
        "template_nenwweo",
        {
          to_name: newUser.firstName,
          from_name: "Favcy Venture Builder",
          to: newUser.email,
          reply_to: "support@favcynavigator.com",
        },
        {
          publicKey: "1kz_lLNH4q5xlongG",
          privateKey: "7nFlUCDuiRupbodvmKRmo", // optional, highly recommended for security reasons
        }
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );

    const contactObj = {
      properties: {
        navigator_userid: user.id,
        email: user?.emailAddresses[0].emailAddress,
        firstname: user?.firstName,
        total_navigator_credits_used: getCreditLimitByEmail(user?.emailAddresses[0].emailAddress),
        total_money_spent_on_navigator: 0,
        deal_funnel: "Navigator Signup",
      },
    };

    const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj);
    let hubres = await hubspotClient.crm.associations.v4.basicApi.create(
      "companies",
      "17727378465",
      "contacts",
      createContactResponse.id,
      [
        {
          associationCategory: "HUBSPOT_DEFINED",
          associationTypeId: hubspot.AssociationTypes.companyToContact,
          // AssociationTypes contains the most popular HubSpot defined association types
        },
      ]
    );
  } catch (error) {
    console.log(error, "error");
  }

  return NextResponse.json({
    success: true,
    data: newUser,
  });
};
