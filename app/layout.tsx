import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import clsx from "clsx";

const fontTitle = localFont({
  src: "../public/assets/fonts/playwrite/PlaywritePL-ExtraLight.ttf",
  display: "swap",
  variable: "--font-playwrite",
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
    <html lang="ko" className={clsx(fontTitle.variable, fontBody.variable)}>
      <body className={clsx(fontTitle.className, fontBody.className)}>
        {children}
      </body>
    </html>
  );
}
