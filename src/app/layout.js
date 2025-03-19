import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./provider/Provider";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata = {
  title: "Revise AI - Write Better Messages",
  description: "Generative AI application for crafting improved messages.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lexend.variable}>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
