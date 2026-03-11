import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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
  metadataBase: new URL('https://cleardossier.vercel.app'),
  title: {
    default: "ClearDossier | AI Intelligence Dossiers",
    template: "%s | ClearDossier"
  },
  description: "Advanced AI-powered intelligence synthesis and automated threat investigation platform. Generate comprehensive dossiers in seconds.",
  keywords: ["ClearDossier", "OSINT", "threat intelligence", "cybersecurity", "open source intelligence", "automated investigations", "digital footprint"],
  authors: [{ name: "ClearDossier Team" }],
  creator: "ClearDossier",
  publisher: "ClearDossier",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ClearDossier | AI Intelligence Dossiers",
    description: "Advanced intelligence synthesis and investigation management platform.",
    url: "https://cleardossier.vercel.app",
    siteName: "ClearDossier",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClearDossier Interface Snapshot"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearDossier | Intelligence Accelerator",
    description: "Run automated threat intelligence sweeps and compile comprehensive dossiers instantly.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
