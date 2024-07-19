import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poiret_One } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

// const fontTitle = localFont({
//   src: "../public/assets/fonts/playwrite/PlaywritePL-ExtraLight.ttf",
//   display: "swap",
//   variable: "--font-playwrite",
// });
const fontTitle = Poiret_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poiret-one",
});

const fontBody = localFont({
  src: "../public/assets/fonts/pretendard/woff2/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "위빙",
  description: "너와 나의 연결 고리, 위빙",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={clsx(fontTitle, fontBody.variable)}>
      <body className={clsx(fontTitle.className, fontBody.className)}>
        {children}
      </body>
    </html>
  );
}
