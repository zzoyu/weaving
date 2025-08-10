import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "개인정보 처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col justify-center h-full bg-white">
      <header className="fixed top-0 flex h-10 md:h-14 w-full items-center justify-between px-2 md:px-8 bg-transparent">
        <Link href="../">
          <button className="p-1 rounded-full h-10 flex items-center justify-center text-3xl  bg-transparent">
            <span className="text-primary-300">← 뒤로가기</span>
          </button>
        </Link>
      </header>
      <iframe
        className="w-full h-full"
        src="https://findingbenjamin.notion.site/ebd/7ba70785d55f41ffa8d01d782927c79d"
        width="100%"
        height="100%"
        allowFullScreen
      />
    </div>
  );
}
