import { fetchProfileBySlug } from "@/app/profile/actions";
import { EPropertyType, Universe } from "@/types/universe";
import { Suspense } from "react";
import ButtonAddUniverse from "./components/button-add-universe";
import { UniverseList } from "./components/universe-list";
import { UniverseListSkeleton } from "./components/universe-list-skeleton";

const dummyUniverses: Universe[] = [
  {
    id: 1,
    name: "판타지 월드",
    image: ["https://picsum.photos/200"],
    thumbnail: "https://picsum.photos/200",
    properties: [
      { key: "themeColor", value: "blue", type: EPropertyType.COLOR },
      { key: "genre", value: "판타지", type: EPropertyType.STRING },
    ],
    hashtags: "#판타지 #마법 #모험",
    description: "마법과 모험이 있는 판타지 세계",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "사이버펑크 도시",
    image: ["https://picsum.photos/201"],
    thumbnail: "https://picsum.photos/201",
    properties: [
      { key: "themeColor", value: "purple", type: EPropertyType.COLOR },
      { key: "genre", value: "사이버펑크", type: EPropertyType.STRING },
    ],
    hashtags: "#사이버펑크 #미래 #테크",
    description: "미래의 네온 도시",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "중세 왕국",
    image: ["https://picsum.photos/202"],
    thumbnail: "https://picsum.photos/202",
    properties: [
      { key: "themeColor", value: "red", type: EPropertyType.COLOR },
      { key: "genre", value: "역사", type: EPropertyType.STRING },
    ],
    hashtags: "#중세 #왕국 #기사",
    description: "기사와 성이 있는 중세 왕국",
    created_at: new Date().toISOString(),
  },
];

export default async function UniversePage({
  params,
}: {
  params: { slug: string };
}) {
  const profile = await fetchProfileBySlug(params.slug);
  const universes = dummyUniverses;
  const isMine = true; // 테스트를 위해 항상 true로 설정
  const profileId = profile?.id;

  return (
    <main className="flex flex-col items-center min-h-[80vh] py-12">
      <div className="w-full max-w-xl px-4">
        <Suspense fallback={<UniverseListSkeleton />}>
          <UniverseList
            universes={universes}
            favoriteUniverses={[]}
            slug={params.slug}
            isMine={isMine}
            profileId={profileId}
            profile={profile}
          />
        </Suspense>
        {isMine && <ButtonAddUniverse slug={params.slug} />}
      </div>
    </main>
  );
} 