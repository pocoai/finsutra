import Stripe from "stripe";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(request) {
  // console.log("GET", process.env.STRIPE_SECRET_KEY);
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // const prices = await stripe.prices.list();

  // return NextResponse.json({
  //   success: true,
  //   data: prices.data,
  // });

  let users = await User.find();

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users[i].creditsHistory.length; j++) {
      if (users[i].creditsHistory[j].type === "remove") {
        users[i].total_credits_used += users[i].creditsHistory[j].credits;
      }
    }

    await users[i].save();
  }

  return NextResponse.json({
    success: true,
    data: users,
  });
}