import { connectDb } from "@/app/lib/connectDb";
import User from "@/models/User";
import stripe from "stripe";

await connectDb();

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

      // console.log(checkoutSessionCompleted, "checkoutSessionCompleted");

      let sessionid = checkoutSessionCompleted.id;
      let Stripe = stripe(process.env.STRIPE_SECRET_KEY);

      // str.checkout.sessions.listLineItems(sessionid, { limit: 1 }, function (err, lineItems) {
      //   // asynchronously called
      //   let productId = lineItems.data[0].price.id;

      //   let product = str.

      // });
      let productId;
      Stripe.checkout.sessions.listLineItems(
        sessionid,
        { limit: 1 },
        async function (err, lineItems) {
          productId = lineItems.data[0].price.product;
          // console.log(productId, "productId");
          const product = await Stripe.products.retrieve(productId);

          // console.log(product, "product");
          let userid = checkoutSessionCompleted.client_reference_id;
          let plan = product.metadata.type;
          let credits = Number(product.metadata.credit);

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
              purchasePlan: plan,
              credits: credits,
              type: "add",
            });

            // console.log(user, "user data saved");

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
        }
      );
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
