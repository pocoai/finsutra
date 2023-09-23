import { ClerkProvider } from "@clerk/nextjs";
import SideBar from "@/components/SideBar";
import "../../globals.css";
import { Urbanist } from "next/font/google";

import ParentLayout from "@/components/ParentLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Favcy Navigator",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    <div>
      <ClerkProvider>
        <ParentLayout>{children}</ParentLayout>
        <ToastContainer />
      </ClerkProvider>
    </div>
    // </html>
  );
}
