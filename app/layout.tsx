import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/sass/globals.scss";
import Footer from "@/components/shared/Footer/Footer";
import MobileMenu from "@/components/shared/MobileMenu";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex flex-col min-h-screen">
          {/* Main Content */}
          <main className="flex-grow bg-gray-100">
            <MobileMenu />
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
