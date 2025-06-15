import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CharacterWithProfile } from "@/types/character";
import { Universe } from "@/types/universe";
import { Edit, Hash, Image as ImageIcon } from "lucide-react";
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
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* 썸네일 */}
        <div className="relative w-full md:w-64 h-64 rounded-lg overflow-hidden bg-muted">
          {universe.thumbnail ? (
            <Image
              src={universe.thumbnail}
              alt={universe.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* 기본 정보 */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{universe.name}</h1>
              {isMyProfile && (
                <Link href={`/u/${slug}/v/${universe.id}/edit`}>
                  <Button variant="ghost" size="sm" className="mt-2">
                    <Edit className="w-4 h-4 mr-2" />
                    수정하기
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {universe.description && (
            <p className="text-muted-foreground whitespace-pre-wrap">
              {universe.description}
            </p>
          )}

          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <Badge key={index} variant="secondary">
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

      {/* 이미지 갤러리 */}
      {universe.image && universe.image.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">갤러리</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {universe.image.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                >
                  <Image
                    src={image}
                    alt={`${universe.name} 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
