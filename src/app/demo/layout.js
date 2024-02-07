import { ClerkProvider } from "@clerk/nextjs";
import SideBar from "@/components/SideBar";
import "../globals.css";
import { Urbanist } from "next/font/google";

import ParentLayout from "@/components/ParentLayout";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Finsutra | AI powered Threat Detection",
  description:
    "Finsutra helps fintech risk and compliance teams to automate and strengthen customer due diligence through advanced Artificial Intelligence",
};

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    <div>
      <ClerkProvider>
        <ParentLayout>
          {children}
        </ParentLayout>
      </ClerkProvider>
    </div>
    // </html>
  );
}
