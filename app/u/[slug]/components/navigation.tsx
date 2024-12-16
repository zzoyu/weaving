import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export async function Navigation() {
  const navItems = [
    { label: "더보기", icon: "➕", href: "/" },
    { label: "홈", icon: "🏠", href: "/profile" },
    { label: "마이페이지", icon: "👤", href: "/profile/edit" },
  ];

  const supabase = createClient();
  const response = await supabase.auth.getUser();

  const isSignin = !!response.data.user?.id;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary-100 w-full">
      {isSignin ? (
        <div className="flex justify-center py-2  max-w-[40rem] mx-auto">
          {navItems.map((item, index) => (
            <Link
              key={index}
              className="flex flex-col items-center w-full"
              href={item.href}
            >
              <span className="text-xl">{item.icon}</span>
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
