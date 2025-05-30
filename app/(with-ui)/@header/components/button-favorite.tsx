"use client";

import { startTransition, useOptimistic } from "react";

import {
  addFavoriteCharacter,
  removeFavoriteCharacter,
} from "@/app/(with-ui)/u/[slug]/actions";
import IconFavorite from "@/public/assets/icons/favorite.svg";
import IconFavoriteFilled from "@/public/assets/icons/favorite_filled.svg";

interface ButtonFavoriteProps {
  isFavorite: boolean;
  characterId: number;
  profileId: number;
}

export default function ButtonFavorite({
  isFavorite: initFavorite,
  characterId,
  profileId,
}: ButtonFavoriteProps) {
  const [isFavorite, setIsFavorite] = useOptimistic(
    initFavorite,
    (state, newState: boolean) => newState
  );

  const handleFavoriteClick = () => {
    startTransition(async () => {
      try {
        if (!isFavorite) {
          setIsFavorite(isFavorite);
          await addFavoriteCharacter(profileId, characterId);
        } else {
          setIsFavorite(!isFavorite);
          await removeFavoriteCharacter(profileId, characterId);
        }
      } catch (error) {
        // 요청 실패 시 상태 롤백
        setIsFavorite(!isFavorite);
      }
    });
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className={`p-2 rounded`}
      type="button"
    >
      {isFavorite ? (
        <IconFavoriteFilled className="text-primary" />
      ) : (
        <IconFavorite className="text-primary" />
      )}
    </button>
  );
}
