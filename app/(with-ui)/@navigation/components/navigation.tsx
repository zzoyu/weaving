import HeartIcon from "@/public/assets/icons/navigation/heart.svg";
import ProfileIcon from "@/public/assets/icons/navigation/profile.svg";
import UserIcon from "@/public/assets/icons/navigation/user.svg";
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
      icon: HeartIcon,
      href: `/u/${slug}/more`,
    },
    {
      label: "홈",
      icon: ProfileIcon,
      href: `/u/${slug}`,
    },
    { label: "마이페이지", icon: UserIcon, href: "/mypage" },
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
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
