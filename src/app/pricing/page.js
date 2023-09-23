"use client";

import { getPricing } from "@/services/pricing";
import { useAuth } from "@clerk/nextjs";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";

/**
 * Renders a pricing plan card with the plan name, price, credits, bonus (if provided), and a button.
 * @param {Object} props - The props object.
 * @param {string} props.plan - The name of the pricing plan.
 * @param {number|string} props.price - The price of the plan. If it's a number, it will be displayed with a dollar sign. If it's a string, it will display "Talk to Sales" instead.
 * @param {number} props.credits - The number of credits included in the plan.
 * @param {string} props.buttonText - The text to display on the button.
 * @param {string} [props.bonus] - An additional feature or bonus included in the plan.
 * @returns {JSX.Element} - The rendered pricing plan card.
 */
const PricingLayout = ({ plan, price, credits, buttonText, bonus, id }) => {
  const isPriceNumber = typeof price === "number";
  const { getToken } = useAuth();

  const handleSubscription = async (e) => {
    const token = await getToken();

    const api = process.env.NEXT_PUBLIC_URL;

    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${api}/api/payment`,
        {
          priceId: id,
          plan: plan,
          credits: credits,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.assign(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="">
      <div className="py-3 flex flex-col justify-evenly items-center rounded-lg shadow-lg text-black w-[300px] h-[400px] bg-[#FFF0DF]">
        <div className="p-5">
          <div className="flex items-center w-full justify-center">
            <span className="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wide uppercase rounded-full">
              {plan}
            </span>
          </div>

          {isPriceNumber ? (
            <div className="flex justify-center mt-4 text-5xl font-extrabold leading-none">
              <span className="ml-1 mr-3 text-xl font-medium leading-8">from</span>$ {price}
            </div>
          ) : (
            <div className="flex justify-center mt-4 text-4xl font-extrabold leading-none my-4">
              Talk to Sales
            </div>
          )}
        </div>
        <div className="flex justify-center items-center w-[80%]">
          <button
            onClick={handleSubscription}
            className="px-10 py-3 text-sm font-medium leading-6 text-white transition duration-150 ease-in-out rounded-md bg-brand focus:outline-none focus:shadow-outline text-center w-full"
          >
            {buttonText}
          </button>
        </div>
        <div className="flex justify-start flex-col items-start w-full p-2 px-10 gap-3 ">
          <div className="flex w-full justify-start items-start mt-4 ">
            <CheckCircleIcon className="w-6 h-6 text-black" />
            <p className="ml-3 leading-6 text-sm font-medium text-gray-700">
              {credits} credits only
            </p>
          </div>
          {bonus &&
            bonus.map((bon) => (
              <div className="flex w-full justify-start items-start ">
                <CheckCircleIcon className="w-6 h-6 text-black" />
                <p className="ml-3 leading-6 text-sm font-medium w-full text-gray-700">{bon}</p>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

const page = () => {
  const [pricing, setPricing] = useState([]);
  const { getToken } = useAuth();

  const fetchPricing = async () => {
    const token = await getToken();
    let data = await getPricing(token);

    let newData = data.map((item) => {
      if (item.product === "prod_OgltmoYdu5RZu1") {
        return {
          plan: "Basic Plan",
          price: 249,
          credits: 75,
          bonus: ["No Expert Support"],
          buttonText: "Subscribe",
          ...item,
        };
      } else if (item.product === "prod_OglvE8DEKOTOBx") {
        return {
          plan: "Standard Plan",
          price: 599,
          credits: 200,
          bonus: ["Limited Expert Support"],
          buttonText: "Subscribe",
          ...item,
        };
      } else if (item.product === "prod_OglwB8Xyj1hA8v") {
        return {
          plan: "Advanced Plan",
          price: 1199,
          credits: 400,
          bonus: [
            "Limited Expert Support",
            "Personal Venture Building Advisor Support for 6 months",
          ],
          buttonText: "Subscribe",
          ...item,
        };
      }
    });

    setPricing(newData);
    // console.log(data);
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  console.log(pricing);

  return (
    <div className="w-full mx-auto space-y-20">
      <h1 className="text-center text-5xl font-bold">Pricing Plan </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center w-full">
        {pricing.map((item, id) => (
          <PricingLayout {...item} key={id} />
        ))}
      </div>
    </div>
  );
};

export default page;
