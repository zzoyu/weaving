"use client";

import { useState } from "react";

import IconFavorite from "@/public/assets/icons/favorite.svg";
import IconFavoriteFilled from "@/public/assets/icons/favorite_filled.svg";
import {
  addFavoriteCharacter,
  removeFavoriteCharacter,
} from "@/app/u/[slug]/actions";

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
  const [isFavorite, setIsFavorite] = useState(initFavorite);

  const handleFavoriteClick = () => {
    if (!isFavorite) {
      addFavoriteCharacter(profileId, characterId);
    } else {
      removeFavoriteCharacter(profileId, characterId);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <button onClick={handleFavoriteClick} className={`p-2 rounded`}>
      {isFavorite ? (
        <IconFavoriteFilled className="text-primary-100" />
      ) : (
        <IconFavorite className="text-primary-100" />
      )}
    </button>
  );
}
