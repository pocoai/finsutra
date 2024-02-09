"use client";

import ParentLayout from "@/components/ParentLayout";
import ProjectDashboard from "@/components/dashboard/ProjectDashboard";
import TopBar from "@/components/dashboard/TopBar";
// import MinigatorHeader from "@/components/minigator/MinigatorHeader";
// import UploadAndChat from "@/components/minigator/UploadAndChat";

import MinigatorHeader from "@/components/minigator2/MinigatorHeader";
import SelectAndChat from "@/components/minigator2/SelectAndChat";

import { ClerkProvider } from "@clerk/nextjs";
import classNames from "classnames";
import { Urbanist } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({}) {
  const [fileName, setFileName] = useState("");
  return (
    <ClerkProvider>
      <ParentLayout>
        {/* <TopBar /> */}
        {/* <ProjectDashboard /> */}
        <div  className={classNames({
        "flex flex-col items-start justify-start gap-1 overflow-hidden max-h-full h-full": true,
      })}>
        {/* <MinigatorHeader /> */}
        <SelectAndChat />
        </div>
        <ToastContainer />
      </ParentLayout>
    </ClerkProvider>
  );
}
