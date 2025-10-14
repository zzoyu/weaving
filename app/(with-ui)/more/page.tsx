import { fetchProfileByUserId } from "@/app/profile/actions";
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
    <main className="flex flex-col h-full w-full justify-center items-center">
      <div className="grid grid-cols-2 gap-4 md:gap-8 place-items-center w-4/5 max-w-4xl auto-rows-fr">
        {features.map((feature, index) => (
          <article
            key={`${feature.href}-${index}`}
            className=" w-full p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gradient-to-br dark:from-[#232526] dark:to-[#414345] shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-200 flex flex-col cursor-pointer h-full"
          >
            <Link
              href={`/u/${params.slug}/more/${feature.href}`}
              className="flex flex-col justify-center h-full"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <p className="text-sm md:text-base font-bold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                {feature.description}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
