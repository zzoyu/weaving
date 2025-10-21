import { fetchProfileByUserId } from "@/app/profile/actions";
import MorePageItemAd from "@/components/ads/more-item-ad";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const supabase = createClient();
  const { data: currentUser } = await supabase.auth.getUser();

  const myProfile = currentUser?.user?.id
    ? await fetchProfileByUserId(currentUser.user.id)
    : null;

  const features = [
    {
      title: "테마 컬러 분석",
      description: "캐릭터들의 테마 컬러를 분석해보세요",
      href: "theme-color",
      icon: "🎨",
    },
    {
      title: "추가 기능 1",
      description: "곧 추가될 기능입니다",
      href: "feature-1",
      icon: "✨",
    },
    {
      title: "추가 기능 2",
      description: "곧 추가될 기능입니다",
      href: "feature-2",
      icon: "🌟",
    },
  ];

  return (
    <main className="flex flex-col w-full items-center relative">
      <div className="grid grid-cols-1 gap-4 lg:gap-8 place-items-center w-4/5 max-w-4xl auto-rows-fr lg:grid-cols-2 pt-10 pb-20 relative h-full">
        {features.map((feature, index) => (
          <article key={`${feature.href}-${index}`} className="more-list-item">
            <Link
              href={`/more/${feature.href}`}
              className="flex flex-col justify-center h-full"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <p className="text-sm lg:text-base font-bold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </p>
              <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>
            </Link>
          </article>
        ))}
      </div>
      <MorePageItemAd />
    </main>
  );
}
