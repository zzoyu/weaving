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

  if (!currentUser?.user?.id) {
    return (
      <main className="flex flex-col h-full justify-center items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
        <h1 className="text-2xl font-bold font-pretendard">
          로그인이 필요합니다
        </h1>
      </main>
    );
  }

  const myProfile = await fetchProfileByUserId(currentUser.user.id);
  if (!myProfile?.id) {
    return (
      <main className="flex flex-col h-full justify-center items-center pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
        <h1 className="text-2xl font-bold font-pretendard">
          프로필을 먼저 생성해주세요
        </h1>
      </main>
    );
  }

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
    <main className="flex flex-col h-full pt-2 md:pt-10 w-full md:max-w-[40rem] mx-auto">
      <h1 className="text-2xl font-bold font-pretendard mb-6">추가 기능</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={`/u/${params.slug}/more/${feature.href}`}
            className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
