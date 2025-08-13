import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import clsx from "clsx";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Poiret_One } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const fontTitle = localFont({
//   src: "../public/assets/fonts/playwrite/PlaywritePL-ExtraLight.ttf",
//   display: "swap",
//   variable: "--font-playwrite",
// });
const fontTitle = Poiret_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poiret-one",
});

const fontBody = localFont({
  src: "../public/assets/fonts/pretendard/woff2/PretendardVariable.woff2",
  weight: "300 800",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "위빙",
  description: "우리의 세계가 만나는 곳",
  applicationName: "위빙",
  openGraph: {
    type: "website",
    title: "위빙",
    siteName: "위빙",
    description: "우리의 세계가 만나는 곳",
    images: [
      {
        url: `${baseUrl}/assets/images/og/with-logo.jpg`,
        width: 1200,
        height: 630,
        alt: "위빙 - 우리의 세계가 만나는 곳",
      },
    ],
    locale: "ko_KR",
  },

  creator: "파인딩벤자민",
  authors: [{ name: "파인딩벤자민" }],
  keywords: ["위빙", "weaving", "창작자", "콘텐츠 공유"],
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-adsense-account": "ca-pub-8566989289200896",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gtmScriptUrl = process.env.NEXT_PUBLIC_GTM_SCRIPT_URL;

  return (
    <html lang="ko">
      <body className={clsx(fontTitle.variable, fontBody.variable)}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8566989289200896"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* 구조화 데이터: CreativeWork */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: "위빙",
            url: baseUrl,
            logo: `${baseUrl}/assets/logos/logo_text_horizontal_color_white.svg`,
          })}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {gtmId && <GoogleTagManager gtmId={gtmId} />}
          {children}
          <Toaster />
          {gaId && <GoogleAnalytics gaId={gaId} />}
        </ThemeProvider>
      </body>
    </html>
  );
}
