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
  metadataBase: new URL('https://openvector.vercel.app'),
  title: {
    default: "OpenVector | Open Source Threat Intelligence",
    template: "%s | OpenVector"
  },
  description: "Advanced open-source intelligence (OSINT) synthesis and automated threat investigation platform. Run comprehensive footprint analysis in seconds.",
  keywords: ["OSINT", "threat intelligence", "cybersecurity", "open source intelligence", "automated investigations", "digital footprint"],
  authors: [{ name: "OpenVector Team" }],
  creator: "OpenVector",
  publisher: "OpenVector",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "OpenVector | Automated Threat Intelligence",
    description: "Advanced intelligence synthesis and investigation management platform.",
    url: "https://openvector.vercel.app",
    siteName: "OpenVector",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenVector Interface Snapshot"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenVector | OSINT Accelerator",
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
            <Footer />
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
