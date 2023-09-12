import ProjectDashboard from "@/components/projects/ProjectDashboard";
import TopBar from "@/components/projects/TopBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-7xl w-full mx-auto transition-all duration-1000 p-10">
      <TopBar />
      <ProjectDashboard />
    </main>
  );
}
