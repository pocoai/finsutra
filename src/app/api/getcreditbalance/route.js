import User from "@/models/User";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async () => {
  let { userId } = auth();

  let user = await User.findOne({ userId }).select("credits");

  return NextResponse.json({
    success: true,
    data: user?.credits,
  });
};
