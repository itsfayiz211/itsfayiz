// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itsfayiz.vercel.app"),
  title: "Fayis K | Best Full Stack Developer in Calicut & Kozhikode",
  description:
    "Fayis K (itsfayiz) is a top full stack developer in Calicut and Kozhikode, creating SEO-ready Next.js and MERN websites with clean design and fast performance.",
  applicationName: "Fayis K Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "best full stack developer in Calicut",
    "best full stack developer in Kozhikode",
    "full stack developer Calicut",
    "full stack developer Kozhikode",
    "Next.js developer Calicut",
    "MERN stack developer Kozhikode",
    "SEO web developer Calicut",
    "SEO website designer Kozhikode",
    "itsfayiz",
    "Fayis K",
  ],
  authors: [{ name: "Fayis K", url: "https://itsfayiz.vercel.app" }],
  creator: "Fayis K",
  alternates: {
    canonical: "https://itsfayiz.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Fayis K | Best Full Stack Developer in Calicut & Kozhikode",
    description:
      "Portfolio and services of Fayis K, a full stack developer focused on Next.js, MERN, SEO, and modern web experiences in Calicut and Kozhikode.",
    url: "https://itsfayiz.vercel.app",
    siteName: "Fayis K",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/Fayiz.png",
        width: 1200,
        height: 1200,
        alt: "Fayis K — Best Full Stack Developer in Calicut and Kozhikode",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fayis K | Best Full Stack Developer in Calicut & Kozhikode",
    description:
      "SEO-focused Next.js and MERN web development portfolio by Fayis K in Calicut and Kozhikode.",
    images: ["/images/Fayiz.png"],
    creator: "@itsfayiz_",
  },
  verification: {
    google: "-ZKbB1cwla0jQAlFgqBc3otb4pWn09XViLJppCKtj9U",
  },
  icons: {
    icon: "/images/Fayiz.png",
    shortcut: "/images/Fayiz.png",
    apple: "/images/Fayiz.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Fayis K",
              alternateName: "itsfayiz",
              url: "https://itsfayiz.vercel.app/",
              jobTitle: "Best Full Stack Developer in Kozhikode (Calicut)",
              image: "https://itsfayiz.vercel.app/images/Fayiz.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kozhikode",
                addressCountry: "India",
              },
              sameAs: [
                "https://github.com/fayispachu",
                "https://fayis-k-developer.onrender.com",
              ],
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
