"use client";

import { Character } from "@/types/character";
import ListCharacter from "./list-character/list-character";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { colorList } from "@/types/color";
import SearchIcon from "@/public/assets/icons/search.svg";

export function ProfileList({
  characters,
  favoriteCharacters,
  slug,
  isMine = false,
  profileId,
}: {
  characters: Character[];
  favoriteCharacters: number[];
  slug: string;
  isMine: boolean;
  profileId?: number;
}) {
  const [searchKeyword, setSearchKeyword] = useState<string>();
  const [filteredColor, setFilteredColor] = useState<{
    type: "themeColor" | "eyeColor" | "hairColor";
    colors: string[];
  }>();
  const filteredList = useMemo<Character[]>(() => {
    let tempCharacters = [...characters];
    if (searchKeyword)
      tempCharacters = tempCharacters.filter((character) => {
        if (character.name.includes(searchKeyword)) return true;
        return false;
      });
    if (filteredColor?.colors?.length) {
      console.log("filteredColor", filteredColor);
      tempCharacters = tempCharacters.filter((character) => {
        const color = character.properties.find(
          (property) => property.key === filteredColor.type
        )?.value;
        if (color && filteredColor.colors.includes(color)) return true;
        return false;
      });
    }
    favoriteCharacters.forEach((favoriteCharacterId) => {
      const favoriteCharacterIndex = tempCharacters.findIndex(
        (character) => character.id === favoriteCharacterId
      );
      if (favoriteCharacterIndex !== -1) {
        // 즐겨찾기한 캐릭터를 맨 앞으로 이동
        const favoriteCharacter = {
          ...tempCharacters.splice(favoriteCharacterIndex, 1)?.[0],
          isFavorite: true,
        };
        tempCharacters.unshift(favoriteCharacter);
      }
    });
    return tempCharacters;
  }, [characters, searchKeyword, filteredColor, favoriteCharacters]);
  return (
    <article className="flex flex-col gap-2 md:gap-4 mt-2 md:mt-5 w-full md:w-fit px-2 md:px-0">
      <div className="px-2 py-0 md:px-4 md:py-2 bg-gray-100 flex flex-row gap-2 md:gap-4 justify-center items-center">
        <div className="flex items-center rounded-full relative w-full h-fit">
          <input
            type="text"
            placeholder="검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-1 px-8 py-2 rounded-md border-primary-100 border-2 bg-white focus:outline-none"
          />
          <button className="p-2 text-white rounded-full absolute pointer-events-none">
            <SearchIcon className="text-primary-200" />
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
        <div className="flex justify-between items-center">
          <FilterPopup
            onUpdate={(type, colors) => setFilteredColor({ type, colors })}
          />
        </div>
      </div>

      <div className="w-auto text-right">
        <span className="text-sm text-gray-500">
          전체: {filteredList.length}
        </span>
      </div>
      {characters.length > 0 && (
        <ListCharacter
          characters={filteredList}
          slug={slug}
          isMine={isMine}
          profileId={isMine ? profileId : undefined}
        />
      )}

      {filteredList.length === 0 && characters.length > 0 && (
        <div className="flex justify-center items-center h-20">
          <span className="text-gray-500">검색 결과가 없습니다.</span>
        </div>
      )}

      {!characters.length && (
        <div className="flex justify-center items-center h-20">
          <span className="text-gray-500">
            {isMine
              ? "등록된 캐릭터가 없습니다. 추가해보세요!"
              : "등록된 캐릭터가 없습니다."}
          </span>
        </div>
      )}
    </article>
  );
}

function FilterPopup({
  onUpdate,
}: {
  onUpdate: (
    type: "themeColor" | "eyeColor" | "hairColor",
    colors: string[]
  ) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"themeColor" | "eyeColor" | "hairColor">(
    "themeColor"
  );
  const [color, setColor] = useState<string[]>();

  return (
    <div>
      {/* 필터 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-white bg-green-500 rounded-full w-10 h-10"
      >
        ☰
      </button>

      {/* 필터 팝업 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-end"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-64 h-full bg-white p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filter</h2>
              <button onClick={() => setIsOpen(false)} className="text-xl">
                ✕
              </button>
            </div>

            {/* 필터 옵션 */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 justify-between">
                  <label htmlFor="theme-red" className="text-sm md:text-base">
                    테마색
                  </label>
                  <input
                    type="radio"
                    name="theme"
                    id="theme-red"
                    checked={type === "themeColor"}
                    onChange={() => setType("themeColor")}
                  />
                </div>
                <div className="flex items-center space-x-2 justify-between">
                  <label htmlFor="theme-eye" className="text-sm md:text-base">
                    눈동자색
                  </label>
                  <input
                    type="radio"
                    name="theme"
                    id="theme-eye"
                    checked={type === "eyeColor"}
                    onChange={() => setType("eyeColor")}
                  />
                </div>
                <div className="flex items-center space-x-2 justify-between">
                  <label htmlFor="theme-hair" className="text-sm md:text-base">
                    머리색
                  </label>
                  <input
                    type="radio"
                    name="theme"
                    id="theme-hair"
                    checked={type === "hairColor"}
                    onChange={() => setType("hairColor")}
                  />
                </div>
              </div>

              <hr />
              <div>
                <h3 className="font-semibold">색상</h3>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(colorList).map((item, index) => (
                    <button
                      key={index}
                      className={clsx(
                        `w-8 h-8 rounded-full ${item[1]} border border-gray-300`,
                        {
                          " ring-2 ring-primary-100": color?.includes(item[0]),
                        }
                      )}
                      onClick={() => {
                        if (color?.includes(item[0]))
                          setColor(color?.filter((color) => color !== item[0]));
                        else setColor([...(color || []), item[0]]);
                      }}
                    >
                      {color?.includes(item[0]) && (
                        <span className="text-primary-100">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="w-full py-2 text-white bg-primary-200 rounded-lg"
                onClick={() => {
                  setIsOpen(false); // 선택 후 팝업 닫기
                  // 필터 적용 로직 추가
                  onUpdate(type, color || []);
                }}
              >
                검색
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
