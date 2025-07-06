"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import SearchIcon from "@/public/assets/icons/search.svg";
import { Character, ColorPropertyKey } from "@/types/character";
import { colorList } from "@/types/color";
import clsx from "clsx";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import ListCharacter from "./list-character/list-character";

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
        if (character.hashtags?.includes?.(searchKeyword)) return true;
        return false;
      });
    if (filteredColor?.colors?.length) {
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
      <div className="px-10 py-0 md:px-4 md:py-2 flex flex-row gap-2 md:gap-4 justify-center items-center mb-10">
        <div className="flex items-center rounded-full relative w-full h-fit">
          <input
            type="text"
            placeholder="검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-shrink w-full pl-8 pr-2 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-gray-400 dark:focus:border-neutral-500 focus:bg-white dark:focus:bg-neutral-800 focus:outline-none transition"
          />
          <button className="p-2 rounded-full absolute pointer-events-none">
            <SearchIcon className="text-gray-400 dark:text-gray-500" />
          </button>
          {searchKeyword && (
            <button
              className=" right-2 text-text-black dark:text-white rounded-full absolute p-2"
              onClick={() => setSearchKeyword("")}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex justify-between items-center">
          <FilterPopup
            onUpdate={(type, colors) => setFilteredColor({ type, colors })}
          />
        </div>
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
  onUpdate: (type: ColorPropertyKey, colors: string[]) => void;
}) {
  const [type, setType] = useState<ColorPropertyKey>("themeColor");
  const [color, setColor] = useState<string[]>();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 text-white bg-text-black rounded-full w-10 h-10">
          ☰
        </button>
      </SheetTrigger>
      <SheetContent className="w-sm md:w-64" aria-description="필터 옵션">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetContent>
            {/* 필터 옵션 */}
            <div className="space-y-4 flex flex-col pt-10">
              <div>
                <ToggleGroup
                  type="single"
                  className="flex-col"
                  onValueChange={(newValue) =>
                    setType(newValue as ColorPropertyKey)
                  }
                  value={type}
                >
                  <ToggleGroupItem
                    value="themeColor"
                    aria-label="테마색"
                    className="w-full"
                  >
                    <span className="w-full flex justify-between items-center text-sm md:text-base">
                      테마색
                    </span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="eyeColor"
                    aria-label="눈동자색"
                    className="w-full"
                  >
                    <span className="w-full flex justify-between items-center text-sm md:text-base">
                      눈동자색
                    </span>
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="hairColor"
                    aria-label="머리색"
                    className="w-full"
                  >
                    <span className="w-full flex justify-between items-center text-sm md:text-base">
                      머리색
                    </span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <hr />
              <div>
                <h3 className="text-lg md:text-base mb-4 font-semibold">
                  색상
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(colorList).map((item, index) => (
                    <button
                      key={index}
                      className={clsx(
                        `w-full aspect-square rounded-md md:w-8 md:h-8 md:rounded-full ${item[1]} border border-gray-300`,
                        {
                          " ring-2 ring-primary": color?.includes(item[0]),
                        }
                      )}
                      onClick={() => {
                        if (color?.includes(item[0]))
                          setColor(color?.filter((color) => color !== item[0]));
                        else setColor([...(color || []), item[0]]);
                      }}
                    >
                      {color?.includes(item[0]) && (
                        <span className="text-primary text-xl md:text-base">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <SheetClose asChild>
                <button
                  className="w-full p-4 md:py-2 text-white dark:text-text-black bg-text-black dark:bg-primary rounded-lg"
                  onClick={() => {
                    // 필터 적용 로직 추가
                    onUpdate(type, color || []);
                  }}
                >
                  검색
                </button>
              </SheetClose>
            </div>
          </SheetContent>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
