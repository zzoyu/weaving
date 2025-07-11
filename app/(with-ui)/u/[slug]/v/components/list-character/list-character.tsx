import { Character } from "@/types/character";
import { addFavoriteCharacter, removeFavoriteCharacter } from "../../../actions";
import ListCharacterItem from "./list-character-item";

interface ListCharacterProps {
  characters: Character[];
  slug: string;
  isMine?: boolean;
  profileId?: number;
}

export default function ListCharacter({
  characters,
  slug,
  isMine = false,
  profileId,
}: ListCharacterProps) {
  return (
    <div className="grid grid-cols-3 gap-4 px-2 md:gap-4 ">
      {characters.map((character) => (
        <ListCharacterItem
          key={`character-${character.id}`}
          character={character}
          slug={slug}
          isMine={isMine}
          onFavoriteClick={() => {
            if (!profileId || !isMine) return;
            if (!character.isFavorite)
              addFavoriteCharacter(profileId, character.id);
            else removeFavoriteCharacter(profileId, character.id);
          }}
        />
      ))}
    </div>
  );
}
