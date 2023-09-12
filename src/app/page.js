import ProjectDashboard from "@/components/dashboard/ProjectDashboard";
import TopBar from "@/components/dashboard/TopBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <TopBar />
      <ProjectDashboard />
    </main>
  );
}
