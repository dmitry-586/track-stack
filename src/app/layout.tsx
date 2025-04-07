import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import "./globals.css";
import { NavMenu } from "@/components/NavMenu/NavMenu";
import { domAnimation, LazyMotion } from "framer-motion";
import { Providers } from "./providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
            <section className="flex h-full w-full">
              <NavMenu />
              {children}
            </section>
          </LazyMotion>
          <ReactQueryDevtools initialIsOpen={false} />
        </Providers>
      </body>
    </html>
  );
}
