import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout-wrapper";
import OfflineToast from "@/components/ui/offline-toast";
import { AuthProvider } from "@/context/auth-context";

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
        <AuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <OfflineToast />
        </AuthProvider>
      </body>
    </html>
  );
}
