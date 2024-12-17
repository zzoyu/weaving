"use client";

import { Character } from "@/types/character";
import Image from "next/image";
import Link from "next/link";
import IconFavorite from "@/public/assets/icons/favorite.svg";
import IconFavoriteFilled from "@/public/assets/icons/favorite_filled.svg";
import clsx from "clsx";
import { colorList } from "@/types/color";

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
  return (
    <Link href={`/u/${slug}/${character.id}`}>
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-1 overflow-hidden rounded-md relative group focus-within:ring-2",
          colorList?.[
            character?.properties?.find?.((i) => i.key === "themeColor")
              ?.value || "white"
          ] + " bg-opacity-50"
        )}
      >
        {isMine &&
          (character?.isFavorite ? (
            <button
              className="absolute top-1 right-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onFavoriteClick?.();
              }}
            >
              <IconFavoriteFilled className="text-primary-100" />
            </button>
          ) : (
            <button
              className="absolute top-1 right-1 rounded-full invisible group-hover:visible"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onFavoriteClick?.();
              }}
            >
              <IconFavorite className="text-primary-100" />
            </button>
          ))}
        <div className="rounded-full overflow-hidden m-2">
          <Image
            src={character.thumbnail || character?.image?.[0] || ""}
            alt={character.name}
            width={100}
            height={100}
            style={{
              filter: character.password ? "grayscale(50%) blur(4px)" : "",
            }}
          />
        </div>
        <div
          className={clsx(
            character.password && "text-opacity-50",
            character.isFavorite ? "bg-primary-100" : "bg-background-200",
            "w-full h-fit flex justify-center items-center p-2"
          )}
        >
          <p>{character.name}</p>
        </div>
      </div>
    </Link>
  );
}
