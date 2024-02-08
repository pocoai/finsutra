import "../../globals.css";
import { Urbanist } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    // <html lang="en">
    <div>{children}</div>
    // </html>
  );
}
