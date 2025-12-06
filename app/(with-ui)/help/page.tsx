import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "서비스 소개",
    href: "/about",
    icon: "💬",
  },
  {
    title: "문의하기",
    href: "https://tally.so/r/3X7JY4",
    icon: "❓️",
  },
  {
    title: "신고센터",
    href: "https://tally.so/r/nPN1qV",
    icon: "🚨",
  },
  {
    title: "서비스 만족도 조사",
    href: "https://tally.so/r/3qQZK9",
    icon: "⭐️",
  },
];
export default function HelpPage() {
  return (
    <div className="flex flex-col justify-center mt-5">
      <header className="fixed top-0 flex h-14 w-full items-center justify-between px-2 lg:px-8 bg-background-default dark:bg-neutral-900">
        <Link href="/mypage" replace>
          <button className="p-1 rounded-full h-10 flex items-center justify-center text-2xl  bg-transparent">
            <span className="text-primary-300 flex flex-row items-center gap-1">
              <ArrowLeftIcon fill="none" stroke="currentColor" />
            </span>
          </button>
        </Link>
      </header>
      <main className="flex flex-col h-fit w-full justify-center items-center dark:bg-neutral-900">
        <div className="grid grid-cols-2 gap-4 lg:gap-8 place-items-center w-4/5 max-w-4xl auto-rows-fr">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              target="_blank"
              className=" w-full p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-[#232526] dark:to-[#414345] shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-200 flex flex-col cursor-pointer h-full"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <p className="text-sm lg:text-base font-bold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
