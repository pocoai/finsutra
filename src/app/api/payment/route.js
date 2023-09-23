import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
  const { userId, user } = await auth();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let data = await request.json();
  let priceId = data.priceId;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      userId,
      email: user?.emailAddresses[0].emailAddress,
      credits: data.credits,
      plan: data.plan,
    },
    success_url: "http://localhost:3000/payment?success=true",
    cancel_url: "http://localhost:3000/payment?cancelled=true",
  });

  return NextResponse.json(session.url);
}
