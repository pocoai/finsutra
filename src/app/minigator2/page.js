"use client";

import MinigatorHeader from "@/components/minigator2/MinigatorHeader";
import SelectAndChat from "@/components/minigator2/SelectAndChat";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const page = () => {
  const [fileName, setFileName] = useState("");
  return (
    <div
      className={classNames({
        "flex flex-col items-start justify-start gap-1 overflow-hidden max-h-full h-full": true,
        [urbanist.className]: true,
      })}
    >
      <MinigatorHeader />
      <SelectAndChat />
    </div>
  );
};

export default page;
