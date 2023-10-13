"use client";

import { ClerkProvider } from "@clerk/nextjs";
import SideBar from "@/components/SideBar";
import "./globals.css";
import { Urbanist } from "next/font/google";

import ParentLayout from "@/components/ParentLayout";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const metadata = {
  title: " Favcy Navigator| AI powered venture building copilot.  ",
  description:
    "Favcy Navigator is an AI-powered tool that revolutionizes the way founders approach venture building. In the world of startups, where challenges and complexities often abound, Favcy Navigator serves as your indispensable ally, simplifying every step of the journey while ensuring a profitable and efficient outcome.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Favcy Navigator | AI-powered Business Co-Pilot</title>

        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={metadata.description} />
        <meta
          property="og:title"
          content="Favcy Navigator | AI powered venture building copilot."
        />
        <meta
          property="og:description"
          content="Favcy Navigator is an AI-powered tool that revolutionizes the way founders approach venture building. In the world of startups, where challenges and complexities often abound, Favcy Navigator serves as your indispensable ally, simplifying every step of the journey while ensuring a profitable and efficient outcome."
        />
        <meta property="og:image" content="/images/og.png" />
        <meta property="og:url" content="https://favcynavigator.com" />

        {/* <!-- Optional Open Graph Tags (adjust as needed) --> */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Favcy Navigator | AI-powered Business Co-Pilot" />

        {/* <!-- Twitter Card Tags (for Twitter-specific display) -->
        <meta name="twitter:card" content="/images/og.png" />
        <meta name="twitter:site" content="@yourTwitterHandle"></meta> */}
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
        <script
          id="microclarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "j2leujz6d5");`,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.href = "https://stg.favcynavigator.com/"`,
          }}
        />

        <script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-W6PPBQKF');
  `,
          }}
        />

        {/* buglog */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d, s) {
      s = d.createElement('script');
      s.src = 'https://api.buglog.io/website/${process.env.NEXT_PUBLIC_BUGLOG}/code';
      s.async = 1;
      d.head.appendChild(s);
    })(document);`,
          }}
        />
      </head>
      <body>
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
