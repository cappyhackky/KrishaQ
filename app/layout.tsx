import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/Header/NavBar";
import Footer from "@/Components/Footer/Footer";
import Providers from "@/Components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KrishaQ",
  description: "Farmer's E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-serif">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
