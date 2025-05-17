import { fetchProfileByUserId } from "@/app/profile/actions";
import HeartIcon from "@/public/assets/icons/navigation/heart.svg";
import ProfileIcon from "@/public/assets/icons/navigation/profile.svg";
import UserIcon from "@/public/assets/icons/navigation/user.svg";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export async function Navigation() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const responseProfile = await fetchProfileByUserId(data?.user?.id as string);

  const navItems = [
    {
      label: "더보기",
      icon: HeartIcon,
      href: `/u/${responseProfile?.slug}/more`,
    },
    {
      label: "홈",
      icon: ProfileIcon,
      href: `/u/${responseProfile?.slug}`,
    },
    { label: "마이페이지", icon: UserIcon, href: "/profile/edit" },
  ];

  const isSignin = !!data?.user?.id;

  return (
    <nav className="fixed z-50 bottom-0 left-0 right-0 bg-primary w-full text-primary-300">
      {isSignin ? (
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
      ) : (
        <Link
          className="text-white flex w-full h-full justify-center items-center p-4 font-bold text-lg"
          href="/"
        >
          트위터로 시작하기
        </Link>
      )}
    </nav>
  );
}
