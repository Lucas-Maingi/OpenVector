import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { Header } from "@/components/header";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenVector | OSINT Workflow Accelerator",
  description: "Advanced intelligence synthesis and investigation management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-text-primary`}
      >
        <ThemeProvider>
          <Suspense fallback={null}>
            <main className="min-h-screen">
              {children}
            </main>
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
