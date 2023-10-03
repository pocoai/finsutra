'use client'

import MinigatorHeader from "@/components/minigator/MinigatorHeader";
import UploadAndChat from "@/components/minigator/UploadAndChat";
import { getPricing } from "@/services/pricing";
import { userState } from "@/state/atoms/userState";
import { useAuth } from "@clerk/nextjs";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const page = () => {

  const [ fileName, setFileName ] = useState('') 
  return (
    <div className="flex flex-col items-start justify-start gap-10 space-y-4">
      <MinigatorHeader name = {fileName}/> 
      <UploadAndChat setFileName = {setFileName}  />
    </div>
  );
};

export default page;