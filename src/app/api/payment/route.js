import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs";
import Stripe from "stripe";

const api = process.env.NEXT_PUBLIC_URL;

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
    success_url: `${api}/payment?success=true`,
    cancel_url: `${api}/payment?cancelled=true`,
  });

  return NextResponse.json(session.url);
}
