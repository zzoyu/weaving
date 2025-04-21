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
  navigation,
  params,
}: Readonly<{
  children: React.ReactNode;
  header: React.ReactNode;
  navigation: React.ReactNode;
  params: { slug: string; id: string };
}>) {
  return (
    <html lang="ko">
      <body className={clsx(fontTitle.variable, fontBody.variable)}>
        <div className="flex flex-col h-full py-14">
          {header}
          <div className="w-full h-full overflow-y-auto pb-20">{children}</div>
          {navigation}
        </div>
      </body>
    </html>
  );
}
