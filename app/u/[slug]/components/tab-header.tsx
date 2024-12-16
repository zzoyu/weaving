import clsx from "clsx";
import Link from "next/link";

function TabHeaderItem({
  isActive,
  href,
  children,
}: {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx("text-black border-b-4 w-full text-center", {
        "text-black border-black": isActive,
        "text-gray-400 border-gray-400": !isActive,
      })}
    >
      {children}
    </Link>
  );
}

export function TabHeader({
  slug,
  activeIndex,
}: {
  slug: string;
  activeIndex: number;
}) {
  return (
    <div className="flex items-center space-x-0 w-full px-8">
      <TabHeaderItem isActive={activeIndex === 0} href={`/u/${slug}`}>
        프로필 목록
      </TabHeaderItem>

      <TabHeaderItem isActive={activeIndex === 1} href={`/u/${slug}/add`}>
        캐릭터 추가
      </TabHeaderItem>
    </div>
  );
}
