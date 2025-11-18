"use client";

import IconFavorite from "@/public/assets/icons/favorite.svg";
import IconFavoriteFilled from "@/public/assets/icons/favorite_filled.svg";
import { Character } from "@/types/character";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import IconLocked from "@/public/assets/icons/locked.svg";
import { colorList } from "@/types/color";
import { getPublicUrl } from "@/utils/image";

export default function ListCharacterItem({
  character,
  slug,
  isMine = false,
  onFavoriteClick,
}: {
  character: Character;
  slug: string;
  isMine?: boolean;
  onFavoriteClick?: () => void;
}) {
  const themeColor = character?.properties?.find?.(
    (i) => i.key === "themeColor"
  )?.value;

  return (
    <Link href={`/u/${slug}/${character.id}`}>
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-1 overflow-hidden rounded-md relative group focus-within:ring-2"
        )}
      >
        {isMine &&
          (character?.isFavorite ? (
            <button
              className="absolute z-20 top-1 left-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onFavoriteClick?.();
              }}
            >
              <IconFavoriteFilled className="text-primary" />
            </button>
          ) : (
            <button
              className="absolute z-20 top-1 left-1 rounded-full lg:invisible group-hover:visible"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onFavoriteClick?.();
              }}
            >
              <IconFavorite className="text-primary" />
            </button>
          ))}
        <div>
          <div className="relative w-fit h-fit">
            {themeColor && (
              <div
                className={clsx(
                  colorList?.[themeColor || "white"],
                  " rounded-full absolute bottom-2.5 right-2.5 w-5 h-5 z-20"
                )}
              ></div>
            )}
            <div className="rounded-full overflow-hidden m-2 relative">
              {!isMine && character.password && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-30 opacity-80">
                  <IconLocked width={48} height={48} />
                </div>
              )}
              {(isMine || !character.password) && (
                <Image
                  unoptimized
                  src={
                    getPublicUrl(character.thumbnail) ||
                    getPublicUrl(character?.image?.[0]) ||
                    ""
                  }
                  alt={character.name}
                  width={100}
                  height={100}
                />
              )}
            </div>
          </div>
        </div>

        <div
          className={clsx(
            character.password && "text-opacity-50",
            character.isFavorite
              ? "bg-primary"
              : " bg-background-muted dark:bg-neutral-800 dark:text-white dark:text-opacity-100",
            "w-full h-fit flex justify-center items-center p-2"
          )}
        >
          <p className="text-text-black truncate text-sm lg:text-base  dark:text-white dark:text-opacity-100">
            {character.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
