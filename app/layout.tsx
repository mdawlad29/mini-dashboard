import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { LayoutSection } from "@/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini Dashboard",
  description: "A beautiful dashboard built with Next.js 15",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-x-hidden`}
        suppressHydrationWarning
      >
        <LayoutSection>{children}</LayoutSection>
      </body>
    </html>
  );
}
