import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import clsx from "clsx";
import type { Metadata } from "next";
import { Poiret_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  weight: "300",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "위빙",
  description: "우리의 세계가 만나는 곳",
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
        {gtmId && (
          <GoogleTagManager gtmId={gtmId} gtmScriptUrl={gtmScriptUrl} />
        )}
        {children}
        <Toaster />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
