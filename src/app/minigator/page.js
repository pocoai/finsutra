"use client";

import UploadAndChat from "@/components/minigator/UploadAndChat";
import { getPricing } from "@/services/pricing";
import { userState } from "@/state/atoms/userState";
import { useAuth } from "@clerk/nextjs";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const page = () => {

  return (
    <div className="flex flex-col items-start justify-start gap-10 space-y-4">
      <h1 className="text-center text-5xl font-bold">Minigator </h1>
      <UploadAndChat />
    </div>
  );
};

export default page;
