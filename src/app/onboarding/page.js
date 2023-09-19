"use client";

import Slide1 from "@/components/onboarding/slide1";
import Slide2 from "@/components/onboarding/slide2";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

const Page = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const { user, isLoaded } = useUser();

  const scrollTo = (id) => {
    setActiveSlide(id);
  };

  return (
    <div className="w-full h-screen">
      <div
        id="scrollDiv"
        className="flex flex-col items-center justify-center overflow-x-hidden h-screen w-full"
      >
        <Image
          src="/images/logo.png"
          height={58}
          width={210}
          alt="logo"
          style={{ objectFit: "contain" }}
          className="animate__animated animate__fadeInDown absolute top-[15%]"
        />
        <Slide1
          scrollTo={() => scrollTo(2)} // Scroll to the next slide (Slide2)
          id={"1"}
          hidden={activeSlide !== 1}
          activeSlide={activeSlide}
          user={user}
        />
        <Slide2 hidden={activeSlide !== 2} activeSlide={activeSlide} />
      </div>
    </div>
  );
};

export default Page;
