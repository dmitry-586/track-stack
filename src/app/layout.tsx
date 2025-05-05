import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import "./globals.css";
import { NavMenu } from "@/components/NavMenu/NavMenu";
import { domAnimation, LazyMotion } from "framer-motion";
import { Providers } from "./providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppInitializer } from "@/components/AppInitializer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "Track Stack",
  description: "Track your learning progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${onest.variable} antialiased`}>
        <Providers>
          <LazyMotion features={domAnimation}>
            <AppInitializer />
            <section className="flex h-full w-full">
              <NavMenu />
              {children}
            </section>
          </LazyMotion>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#fff",
                color: "#00000",
                borderRadius: "10px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
