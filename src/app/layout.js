import { ClerkProvider } from "@clerk/nextjs";
import SideBar from "@/components/SideBar";
import "./globals.css";
import { Inter, Urbanist } from "next/font/google";
import classNames from "classnames";

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
    <ClerkProvider>
      <html lang="en">
        <body
          className={classNames({
            "grid min-h-screen": true,
            "grid-cols-sidebar": true,
            "grid-cols-sidebar-collapsed": false,
            "transition-[grid-template-columns] duration-300 ease-in-out": true,
            [`${urbanist.className}`]: true,
          })}
        >
          <SideBar />
          <section className="max-w-7xl w-full mx-auto transition-all duration-1000 p-10 h-screen">
            {children}
          </section>
        </body>
      </html>
    </ClerkProvider>
  );
}
