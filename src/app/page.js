"use client";

import ParentLayout from "@/components/ParentLayout";
import ProjectDashboard from "@/components/dashboard/ProjectDashboard";
import TopBar from "@/components/dashboard/TopBar";
import MinigatorHeader from "@/components/minigator/MinigatorHeader";
import UploadAndChat from "@/components/minigator/UploadAndChat";
import { ClerkProvider } from "@clerk/nextjs";
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
        <div className="flex flex-col items-start justify-start gap-10 space-y-4">
          <MinigatorHeader name={fileName} />
          <UploadAndChat setFileName={setFileName} />
        </div>
        <ToastContainer />
      </ParentLayout>
    </ClerkProvider>
  );
}
