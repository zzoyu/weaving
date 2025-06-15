"use client";

import SearchIcon from "@/public/assets/icons/search.svg";
import { Universe } from "@/types/universe";
import { useMemo, useState } from "react";
import ListUniverse from "./list-universe/list-universe";

interface UniverseListProps {
  universes: Universe[];
  favoriteUniverses: number[];
  slug: string;
  isMine: boolean;
  profileId?: number;
  profile: { id: number; nickname: string; slug: string };
}

export function UniverseList({
  universes,
  favoriteUniverses,
  slug,
  isMine = false,
  profileId,
  profile,
}: UniverseListProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>();
  const filteredList = useMemo<Universe[]>(() => {
    let tempUniverses = [...universes];
    if (searchKeyword)
      tempUniverses = tempUniverses.filter((universe) => {
        if (universe.name.includes(searchKeyword)) return true;
        return false;
      });
    return tempUniverses;
  }, [universes, searchKeyword]);
  return (
    <article className="flex flex-col items-center justify-center gap-2 md:gap-4 mt-2 md:mt-5 w-full max-w-xl px-4 mx-auto">
      <div className="w-full flex flex-col items-center mb-4">
      <h2 className="text-2xl mb-2.5">{profile.nickname}의 세계관</h2>
        <span className=" text-gray-600">
        {universes.length}개의 설정
        </span>
      </div>
      <div className="w-full flex flex-row gap-2 md:gap-4 justify-center items-center mb-10">
        <div className="flex items-center rounded-full relative w-full max-w-sm mx-auto h-fit">
          <input
            type="text"
            placeholder="검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-shrink w-full pl-8 pr-2 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-gray-400 dark:focus:border-neutral-500 focus:bg-white dark:focus:bg-neutral-800 focus:outline-none transition text-base"
          />
          <button className="p-2 rounded-full absolute pointer-events-none">
            <SearchIcon className="text-gray-400 dark:text-gray-500" />
          </button>
          {searchKeyword && (
            <button
              className=" right-2 text-white bg-slate-300 w-6 h-6 rounded-full absolute"
              onClick={() => setSearchKeyword("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center">
        {universes.length > 0 && (
          <ListUniverse
            universes={filteredList}
            slug={slug}
            isMine={isMine}
            profileId={isMine ? profileId : undefined}
          />
        )}
      </div>

      {filteredList.length === 0 && universes.length > 0 && (
        <div className="flex justify-center items-center h-20">
          <span className="text-gray-500">검색 결과가 없습니다.</span>
        </div>
      )}

      {!universes.length && (
        <div className="flex justify-center items-center h-20">
          <span className="text-gray-500">
            {isMine
              ? "등록된 세계관이 없습니다. 추가해보세요!"
              : "등록된 세계관이 없습니다."}
          </span>
        </div>
      )}
    </article>
  );
} 