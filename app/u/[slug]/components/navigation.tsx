import Link from "next/link";

export function Navigation() {
  const navItems = [
    { label: "더보기", icon: "➕", href: "/" },
    { label: "홈", icon: "🏠", href: "/profile" },
    { label: "마이페이지", icon: "👤", href: "/profile/edit" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-green-200 h-14">
      <div className="flex justify-around py-2">
        {navItems.map((item, index) => (
          <Link
            key={index}
            className="flex flex-col items-center"
            href={item.href}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
