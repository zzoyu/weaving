"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CharacterWithProfile } from "@/types/character";
import { motion } from "framer-motion";
import { Hash, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CharacterListProps {
  characters: CharacterWithProfile[];
  isMyProfile: boolean;
}

export default function CharacterList({ characters, isMyProfile }: CharacterListProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  if (!characters.length) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Star className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg">아직 등록된 캐릭터가 없어요</p>
          {isMyProfile && (
            <Link href={`../add`} className="mt-4">
              <Button variant="outline">캐릭터 추가하기</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {characters.map((character, index) => {
        const hashtags = character.hashtags
          ? character.hashtags.split(" ").filter(Boolean)
          : [];

        return (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onHoverStart={() => setHoveredId(character.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            <Link href={`/u/${character.profile.slug}/${character.id}`}>
              <Card className={cn(
                "group relative overflow-hidden transition-all duration-300",
                "hover:shadow-lg hover:scale-[1.02]",
                "border-2 hover:border-primary/20"
              )}>
                <div className="grid grid-cols-2 items-stretch">
                  {/* 왼쪽: 썸네일 */}
                  <div className="relative aspect-square w-full h-full bg-muted">
                    {character.thumbnail ? (
                      <Image unoptimized 
                        src={character.thumbnail}
                        alt={character.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="100px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground">
                        {character.name[0]}
                      </div>
                    )}
                  </div>
                  {/* 오른쪽: 정보 */}
                  <div className="flex flex-col justify-center p-3">
                    <h3 className="font-semibold truncate">{character.name}</h3>
                    {character.description && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{character.description}</p>
                    )}
                    {hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {hashtags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0.5 h-5 min-w-0">
                            <Hash className="w-3 h-3 mr-0.5" />
                            {tag}
                          </Badge>
                        ))}
                        {hashtags.length > 3 && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 h-5 min-w-0">
                            +{hashtags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
} 