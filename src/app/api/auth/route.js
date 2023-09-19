import User from "@/models/User";
import { currentUser, auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDb } from "@/app/lib/connectDb";

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
    credits: 20,
  });

  return NextResponse.json({
    success: true,
    data: newUser,
  });
};
