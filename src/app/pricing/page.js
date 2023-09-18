import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

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
const PricingLayout = ({ plan, price, credits, buttonText, bonus }) => {
  const isPriceNumber = typeof price === "number";

  return (
    <main className="relative">
      <div className="py-3 flex flex-col justify-start items-center rounded-lg shadow-lg text-black w-[300px] h-[350px] bg-[#FFF0DF]">
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
        <div className="flex justify-start flex-col items-start p-4 gap-3 ">
          <span className="flex w-full justify-start items-start mt-4 ">
            <CheckCircleIcon className="w-6 h-6 text-black" />
            <p className="ml-3 leading-6 font-medium text-gray-700">{credits} credits only</p>
          </span>
          {bonus && (
            <div className="flex w-full justify-start items-start ">
              <CheckCircleIcon className="w-[40px] text-black" />
              <p className="ml-3 leading-6 text-gray-700">{bonus}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 flex justify-center items-center">
          <a
            href="#"
            className="px-5 py-3 text-sm font-medium leading-6 text-white transition duration-150 ease-in-out rounded-full bg-brand focus:outline-none focus:shadow-outline"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </main>
  );
};

let pricing = [
  {
    plan: "Basic Plan",
    price: 249,
    credits: 75,
    buttonText: "Subscribe",
  },
  {
    plan: "Standard Plan",
    price: 599,
    credits: 200,
    buttonText: "Subscribe",
  },
  {
    plan: "Advanced Plan",
    price: 1199,
    credits: 400,
    buttonText: "Subscribe",
    bonus: " Personal Venture Building Advisor Assistance for 6 months ",
  },
];

const page = () => {
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
