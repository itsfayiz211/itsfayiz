// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SplashCursor from "@/components/SplashCursor";

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
        url: "/images/FayizP.jpeg",
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
      "Portfolio of Fayis K, a full stack developer building modern Next.js and MERN websites for businesses in Calicut and Kozhikode.",
    images: ["/images/FayizP.jpeg"],
    creator: "@itsfayiz_",
  },
  verification: {
    google: "DB5Gh4M12iv__kVlCpYUfuik3agpyIypBUYKR_gWGfw",
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
        <SplashCursor
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#A855F7"
        />
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
              image: "https://itsfayiz.vercel.app/images/FayizP.jpeg",
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
