import User from "@/models/User";
import { currentUser, auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDb } from "@/app/lib/connectDb";
import { getCreditLimitByEmail, getDomainFromMail, isWorkEmail } from "@/utils/helper";

await connectDb();

export const GET = async (request) => {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  let isExist = await User.findOne({ userId: user.id });

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

  return NextResponse.json({
    success: true,
    data: newUser,
  });
};
