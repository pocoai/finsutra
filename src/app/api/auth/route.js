import User from "@/models/User";
import { currentUser, auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDb } from "@/app/lib/connectDb";
import { getCreditLimitByEmail, getDomainFromMail, isWorkEmail } from "@/utils/helper";
const hubspot = require("@hubspot/api-client");

await connectDb();

export const GET = async (request) => {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  let isExist = await User.findOne({ userId: user.id });
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_API_KEY,
  });

  if (isExist) {
    return NextResponse.json({
      success: true,
      data: isExist,
    });
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
  const companyObj = {
    properties: {
      domain: "app.favcynavigator.com",
      name: "Favcy Navigator",
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

  // console.log(hubres, "hubres");

  return NextResponse.json({
    success: true,
    data: newUser,
  });
};
