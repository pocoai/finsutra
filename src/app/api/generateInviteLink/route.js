import { NextResponse } from "next/server";
import User from "@/models/User";
import { generateInviteCode } from "@/utils/helper";
import Invitation from "@/models/Invitations";
import { auth, currentUser } from "@clerk/nextjs";

export const POST = async ({ request }) => {
  const { email } = await request.json();

  let invitedUser = await User.findOne({ email });

  let { userId } = await auth();

  let user = await User.findOne({ userId }).select("_id");

  if (invitedUser) {
    return NextResponse.json(
      {
        success: false,
        message: "User already exists",
      },
      {
        status: 409,
        statusText: "Conflict",
      }
    );
  }

  let inviteCode = generateInviteCode(email);

  await Invitation.create({
    invitationCode: inviteCode,
    sender: user._id,
    invitedEmail: email,
  });

  return NextResponse.json({
    success: true,
    message: "Invitation sent",
    inviteCode,
  });
};
