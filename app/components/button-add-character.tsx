"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Character } from "@/types/character";
import { getPublicUrl } from "@/utils/image";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ButtonAddCharacterProps {
  characters: Character[];
  currentUniverses: { character_id: number }[];
  onAdd: (characterIds: { character_id: number }[]) => void;
  maxSelectableCharacters?: number;
}

export function ButtonAddCharacter({
  characters,
  currentUniverses,
  onAdd,
  maxSelectableCharacters = 10,
}: ButtonAddCharacterProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);

  useEffect(() => {
    // currentUniverses가 변경될 때 selectedCharacters 초기화
    setSelectedCharacters(currentUniverses.map((cu) => cu.character_id));
  }, [currentUniverses, isOpen]);

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleCharacter = (characterId: number) => {
    if (
      maxSelectableCharacters > 0 &&
      !selectedCharacters.includes(characterId) &&
      selectedCharacters.length >= maxSelectableCharacters
    ) {
      toast({
        title: "오류",
        description: `최대 ${maxSelectableCharacters}개의 캐릭터를 선택할 수 있습니다.`,
        variant: "destructive",
      });
      return;
    }
    setSelectedCharacters((prev) =>
      prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId]
    );
  };

  const handleConfirm = () => {
    onAdd(selectedCharacters.map((id) => ({ character_id: id })));
    setSelectedCharacters([]);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        className="py-2 rounded bg-background-muted dark:bg-text-black text-sm w-full dark:text-white hover:opacity-80 hover:bg-current"
        onClick={() => setIsOpen(true)}
      >
        캐릭터 추가
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="p-0 gap-0 flex flex-col w-full h-full max-w-full max-h-full
          lg:w-[480px] lg:max-w-[90vw] lg:h-auto lg:max-h-[80vh]"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <DialogTitle className="text-xl font-semibold">
                  캐릭터 추가
                </DialogTitle>
              </div>
              <Input
                placeholder="캐릭터 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredCharacters.map((character) => (
                  <div
                    key={character.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedCharacters.includes(character.id)
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => handleToggleCharacter(character.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleToggleCharacter(character.id);
                      }
                    }}
                  >
                    <div className="aspect-square relative">
                      {character.thumbnail ? (
                        <Image
                          unoptimized
                          src={getPublicUrl(character.thumbnail)}
                          alt={character.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1 text-sm truncate">
                      {character.name}
                    </div>
                    {selectedCharacters.includes(character.id) && (
                      <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {
              <div className="p-4 border-t bg-background">
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedCharacters([]);
                      setIsOpen(false);
                    }}
                  >
                    취소
                  </Button>
                  <Button type="button" onClick={handleConfirm}>
                    {selectedCharacters.length}개 캐릭터 추가
                  </Button>
                </div>
              </div>
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
