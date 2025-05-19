"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import SearchIcon from "@/public/assets/icons/search.svg";
import { Character, ColorPropertyKey } from "@/types/character";
import { colorList } from "@/types/color";
import clsx from "clsx";
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
      <div className="px-10 py-0 md:px-4 md:py-2 flex flex-row gap-2 md:gap-4 justify-center items-center mb-10">
        <div className="flex items-center rounded-full relative w-full h-fit">
          <input
            type="text"
            placeholder="검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-shrink px-8 py-2 w-full rounded-md border-text-black border-2 bg-white focus:outline-none"
          />
          <button className="p-2 text-white rounded-full absolute pointer-events-none">
            <SearchIcon className="text-text-black" />
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
      <SheetContent className="w-sm md:w-64">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>
            {/* 필터 옵션 */}
            <div className="space-y-4 flex flex-col">
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

              <SheetClose>
                <button
                  className="w-full p-4 md:py-2 text-white bg-primary-200 rounded-lg"
                  onClick={() => {
                    // 필터 적용 로직 추가
                    onUpdate(type, color || []);
                  }}
                >
                  검색
                </button>
              </SheetClose>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
