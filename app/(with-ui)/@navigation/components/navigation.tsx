import AdditionalIcon from "@/public/assets/icons/navigation/additional.svg";
import EarthIcon from "@/public/assets/icons/navigation/earth.svg";
import { SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export function NavigationSignOut() {
  return (
    <nav className="bg-text-black w-full text-icon-default">
      <Link
        className="text-white flex w-full h-full justify-center items-center p-4 font-bold text-lg"
        href="/"
      >
        트위터로 시작하기
      </Link>
    </nav>
  );
}

export function NavigationSignIn({ slug }: { slug?: string }) {
  const navItems = [
    {
      label: "더보기",
      icon: AdditionalIcon,
      href: `/u/${slug}/more`,
    },
    {
      label: "캐릭터",
      icon: UserIcon,
      href: `/u/${slug}`,
    },
    {
      label: "세계관",
      icon: EarthIcon,
      href: `/u/${slug}/v`,
    },
    { label: "마이페이지", icon: SettingsIcon, href: "/mypage" },
  ];
  return (
    <nav className="bg-text-black w-full text-icon-default">
      <div className="flex justify-center py-2  max-w-[40rem] mx-auto">
        {navItems.map((item, index) => (
          <Link
            key={index}
            className="flex flex-col items-center w-full"
            href={item.href}
          >
            <item.icon />
            <span className=" text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
