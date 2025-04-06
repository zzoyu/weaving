import clsx from "clsx";
import Link from "next/link";

function TabHeaderItem({
  isActive,
  href,
  children,
  isNew = false,
}: {
  isActive: boolean;
  href?: string;
  children: React.ReactNode;
  isNew?: boolean;
}) {
  return (
    <Link
      href={href || ""}
      className={clsx(
        "text-black w-full text-center border-b-4 flex flex-row items-center justify-center relative",
        {
          "text-black border-black": isActive,
          "text-gray-400 border-gray-400": !isActive,
        }
      )}
    >
      <div className="relative w-fit h-fit">
        {children}
        {isNew && (
          <div className="absolute w-2 h-2 left-full top-0 mx-2 text-xs bg-red-500 rounded-full"></div>
        )}
      </div>
    </Link>
  );
}

export function TabHeader({
  activeIndex,
  data,
}: {
  activeIndex: number;
  data: {
    title: string;
    href?: string;
    isNew?: boolean;
  }[];
}) {
  return (
    <div className="flex items-center space-x-0 w-full px-0 md:px-8">
      {(data || []).map((item, index) => (
        <TabHeaderItem
          key={index}
          isActive={activeIndex === index}
          href={item.href}
          isNew={item.isNew}
        >
          {item.title}
        </TabHeaderItem>
      ))}
    </div>
  );
}
