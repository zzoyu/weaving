"use client";

import { Character } from "@/types/character";
import ListCharacter from "./list-character/list-character";
import { useMemo, useState } from "react";

export function ProfileList({
  characters,
  slug,
}: {
  characters: Character[];
  slug: string;
}) {
  const [searchKeyword, setSearchKeyword] = useState<string>();
  const filteredList = useMemo<Character[]>(() => {
    if (searchKeyword)
      return characters.filter((character) => {
        if (character.name.includes(searchKeyword)) return true;
        return false;
      });
    return characters;
  }, [searchKeyword]);
  return (
    <article className="flex flex-col gap-4 mt-5">
      <div className="px-4 py-2 bg-gray-100 flex flex-row gap-4 justify-center">
        <div className="flex items-center rounded-full relative">
          <input
            type="text"
            placeholder="검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-1 px-8 py-2 rounded-md border-green-200 border-2 bg-white focus:outline-none"
          />
          <button className="p-2 text-white rounded-full absolute">🔍</button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <button className="p-2 text-white bg-green-500 rounded-full">
            ☰
          </button>
        </div>
      </div>

      <div className="w-auto text-right">
        <span className="text-sm text-gray-500">전체: {characters.length}</span>
      </div>
      {characters.length > 0 && (
        <ListCharacter characters={filteredList} slug={slug} />
      )}
    </article>
  );
}
