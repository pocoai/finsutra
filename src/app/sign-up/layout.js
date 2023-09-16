import { Urbanist } from "next/font/google";
import classNames from "classnames";
import { ClerkProvider } from "@clerk/nextjs";

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
        <body>
          <section className=" w-full mx-auto transition-all duration-1000  h-screen">
            {children}
          </section>
        </body>
      </html>
    </ClerkProvider>
  );
}
