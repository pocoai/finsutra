import ParentLayout from "@/components/ParentLayout";
import ProjectDashboard from "@/components/dashboard/ProjectDashboard";
import TopBar from "@/components/dashboard/TopBar";
import { ClerkProvider } from "@clerk/nextjs";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({}) {
  // console.log(searchParams, "searchParams");

  return (
    <ClerkProvider>
      <ParentLayout>
        <TopBar />
        <ProjectDashboard />
        <ToastContainer />
      </ParentLayout>
    </ClerkProvider>
  );
}
