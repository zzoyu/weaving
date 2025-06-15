import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CharacterWithProfile } from "@/types/character";
import { Universe } from "@/types/universe";
import { Edit, Hash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CharacterList from "./character-list";

interface UniverseTemplateProps {
  universe: Universe;
  characters: CharacterWithProfile[];
  isMyProfile: boolean;
  slug: string;
}

export default function TemplateUniverse({
  universe,
  characters,
  isMyProfile,
  slug,
}: UniverseTemplateProps) {
  const hashtags = universe.hashtags
    ? universe.hashtags.split(" ").filter(Boolean)
    : [];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 헤더 섹션 */}
      <div className="relative flex flex-col md:flex-row gap-6 items-start">
        {/* 대표 이미지 */}
        <div className="relative w-full md:w-64 aspect-[4/3] rounded-none md:rounded-xl overflow-hidden shadow-lg border border-white/10 bg-muted flex items-center justify-center">
          {universe.image && universe.image.length > 0 ? (
            <Image unoptimized 
              src={universe.image[0]}
              alt={universe.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* 정보 + 수정 버튼 */}
        <div className="flex-1 flex flex-col gap-2 relative w-full h-64 p-4 md:p-0">
          {/* 수정하기 버튼 우상단 */}
          {isMyProfile && (
            <div className="absolute top-0 right-0 z-10">
              <Link href={`/u/${slug}/v/${universe.id}/edit`}>
                <Button variant="outline" size="icon" className="shadow-md hover:bg-primary/10 hover:text-primary">
                  <Edit className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-1" style={{ fontFamily: 'Pretendard, sans-serif' }}>
            {universe.name}
          </h1>
          {universe.description && (
            <p className="text-base text-muted-foreground whitespace-pre-wrap mb-1">
              {universe.description}
            </p>
          )}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {hashtags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                  <Hash className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 속성 섹션 */}
      {universe.properties && universe.properties.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold flex items-center">
              세계관 정보
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {universe.properties.map((property, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b last:border-b-0"
                >
                  <span className="font-medium">{property.key}</span>
                  <span className="text-muted-foreground">{property.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 캐릭터 리스트 섹션 */}
      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-lg font-semibold flex items-center">
            등장 캐릭터
          </h2>
        </CardHeader>
        <CardContent>
          <CharacterList characters={characters} isMyProfile={isMyProfile} />
        </CardContent>
      </Card>
    </div>
  );
}
