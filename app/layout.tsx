import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout-wrapper";
import OfflineToast from "@/components/ui/offline-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SchemeMate AI",
  description: "Your intelligent scheme companion and analyzer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <OfflineToast />
      </body>
    </html>
  );
}
