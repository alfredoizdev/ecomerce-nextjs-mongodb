import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/sass/globals.scss";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stylefoot",
  description: "The best place to find your next pair of shoes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {/* Main Content */}
        {children}
        <SpeedInsights />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
