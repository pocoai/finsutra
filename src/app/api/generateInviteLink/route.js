import { NextResponse } from "next/server";
import User from "@/models/User";
import { generateInviteCode } from "@/utils/helper";
import Invitation from "@/models/Invitations";
import { auth, currentUser } from "@clerk/nextjs";
import emailjs from "@emailjs/nodejs";
export const POST = async (request) => {
  const { email } = await request.json();

  // console.log(email, "email");

  let invitedUser = await User.findOne({ email });

  let { userId } = await auth();

  let user = await User.findOne({ userId }).select("_id firstName");

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

  let userAlreadyInvited = await Invitation.findOne({
    invitedEmail: email,
    sender: user._id,
    invite_status: "pending",
    expiresAt: { $gt: new Date() },
  });

  if (userAlreadyInvited) {
    return NextResponse.json(
      {
        success: false,
        message: "An invite link has already been sent",
      },
      {
        status: 409,
        statusText: "Conflict",
      }
    );
  }

  let inviteCode = generateInviteCode();

  let referral_link = `${process.env.NEXT_PUBLIC_URL}/?invitecode=${inviteCode}`;

  await Invitation.create({
    invitationCode: inviteCode,
    sender: user._id,
    invitedEmail: email,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  emailjs
    .send(
      "service_6ycky6c",
      "template_ihgr2i7",
      {
        name: email,
        from_name: user.firstName,
        to: email,
        link: referral_link,
      },
      {
        publicKey: "uzqX86y34XhQEdd70",
        privateKey: "5hLGWhQdhD9x7xBxfu_CF", // optional, highly recommended for security reasons
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

  return NextResponse.json({
    success: true,
    message: "Invitation sent",
    inviteCode,
  });
};
