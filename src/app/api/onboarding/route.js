import User from "@/models/User";
import { currentUser, auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { connectDb } from "@/app/lib/connectDb";

await connectDb();

export const POST = async (request) => {
  const user = await currentUser();

  const { interests } = await request.json();

  console.log(interests);

  let userdata;

  userdata = await User.findOne({ userId: user.id });

  if (!userdata) {
    userdata = await User.create({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user?.emailAddresses[0].emailAddress,
      credits: 20,
      onboarded: true,
      interests: interests,
      image: user?.hasImage ? user?.imageUrl : "",
    });
  } else {
    userdata.interests = interests;
    userdata.onboarded = true;

    await userdata.save();
  }

  return NextResponse.json({
    success: true,
    message: "user updated",
  });
};
