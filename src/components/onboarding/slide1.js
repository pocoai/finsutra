import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Slide1 = ({ scrollTo, id, hidden, activeSlide, user }) => {
  console.log("user", user);

  return (
    <div
      className={`${hidden ? "hidden" : "w-full flex flex-col items-center justify-center"} ${
        activeSlide === 1
          ? "transition-opacity duration-1000 ease-in-out opacity-100"
          : "transition-opacity duration-1000 ease-in-out opacity-0 transform translate-x-8"
      }`}
    >
      <div className=" flex flex-col justify-center items-start gap-10 p-20">
        <h1
          className="text-black text-[25px] font-bold
            animate__animated animate__fadeInLeft
          "
        >
          Hello {user?.firstName}👋
        </h1>
        <p className="text-black lg:text-[22px] leading-9 font-medium animate__animated animate__fadeInLeft ">
          Let’s <span className="text-brand">personalize</span> your experience with Favcy Venture
          Builder and make it perfect for your needs.
        </p>
        <div className="flex justify-start">
          <button
            className="border-black rounded-full bg-brand text-white py-2 px-6 text-[20px]"
            onClick={() => {
              scrollTo(id);
            }}
          >
            Let'start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slide1;
