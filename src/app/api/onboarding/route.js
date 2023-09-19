import User from "@/models/User";
import { currentUser, auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { connectDb } from "@/app/lib/connectDb";

await connectDb();

export const POST = async (request) => {
  const { userId } = auth();

  const { interests } = await request.json();

  console.log(interests);

  let user = await User.findOne({ userId });

  user.interests = interests;

  await user.save();

  return NextResponse.json({
    success: true,
    message: "user updated",
  });
};
