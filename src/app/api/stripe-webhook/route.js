import { connectDb } from "@/app/lib/connectDb";
import User from "@/models/User";
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
      return new Response(err.message, {
        status: 400,
        statusText: "Bad Request",
      });
    }
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;

      let userid = checkoutSessionCompleted.metadata.userId;
      let plan = checkoutSessionCompleted.metadata.plan;
      let credits = checkoutSessionCompleted.metadata.credits;

      let user = await User.findOne({ userId: userid });

      if (user) {
        user.credits += Number(credits);
        user.purchaseHistory.push({
          date: Date.now(),
          credits,
          plan: plan,
          payment_data: {
            id: checkoutSessionCompleted.id,
            amount: checkoutSessionCompleted.amount_total,
            status: checkoutSessionCompleted.status,
          },
        });

        user.currentPlan = plan;

        user.creditsHistory.push({
          date: Date.now(),
          credits: credits,
          type: "add",
        });

        console.log(user, "user data saved");

        await user.save();
      } else {
        return new Response(
          {
            success: false,
            message: "User not found",
          },
          {
            status: 404,
            statusText: "Not Found",
          }
        );
      }

      // update credits in db

      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);

    // update credits in db
  }

  return new Response(null, {
    status: 200,
  });
};
