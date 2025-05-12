import { Toaster } from "@/components/ui/toaster";
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
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={clsx(fontTitle.variable, fontBody.variable)}>
        <header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
