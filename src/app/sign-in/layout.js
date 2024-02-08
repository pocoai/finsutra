import { Urbanist } from "next/font/google";
import classNames from "classnames";
import { ClerkProvider } from "@clerk/nextjs";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Finsutra | AI powered Threat Detection",
  description: "Finsutra helps fintech risk and compliance teams to automate and strengthen customer due diligence through advanced Artificial Intelligence",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <section
            className={classNames({
              "w-full mx-auto transition-all duration-1000 h-screen": true,
              [urbanist.className]: true,
            })}
          >
            {children}
          </section>
        </body>
      </html>
    </ClerkProvider>
  );
}
