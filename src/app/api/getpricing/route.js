import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request) {
  // console.log("GET", process.env.STRIPE_SECRET_KEY);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const prices = await stripe.prices.list();

  return NextResponse.json({
    success: true,
    data: prices.data,
  });
}
