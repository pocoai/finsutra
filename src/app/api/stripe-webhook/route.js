import { connectDb } from "@/app/lib/connectDb";
import stripe from "stripe";

connectDb();

export const POST = async (request) => {
  let event = await request.json();
  let { endpointSecret } = process.env;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(event, signature, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return new Response(null, {
        status: 400,
      });
    }
  }

  switch (event.type) {
    case "payment_intent.succeeded":
    // update credits in db
  }
};
