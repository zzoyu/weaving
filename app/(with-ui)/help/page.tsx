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
    <div className="flex flex-col justify-center h-full bg-white">
      <header className="fixed top-0 flex h-10 md:h-14 w-full items-center justify-between px-2 md:px-8 bg-transparent">
        <Link href="/mypage" replace>
          <button className="p-1 rounded-full h-10 flex items-center justify-center text-3xl  bg-transparent">
            <span className="text-primary-300">← 뒤로가기</span>
          </button>
        </Link>
      </header>
      <main className="flex flex-col h-full w-full justify-center items-center dark:bg-neutral-900">
        <div className="grid grid-cols-2 gap-4 md:gap-8 place-items-center w-4/5 max-w-4xl auto-rows-fr">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              target="_blank"
              className=" w-full p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-[#232526] dark:to-[#414345] shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-200 flex flex-col cursor-pointer h-full"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <p className="text-sm md:text-base font-bold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
