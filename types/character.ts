enum EPropertyType {
  STRING = "string",
  COLOR = "color",
  DATE = "date",
}

type Property = {
  key: string;
  value: string;
  type: EPropertyType;
};

type ColorPropertyKey = "themeColor" | "eyeColor" | "hairColor";

interface Character {
  id: number;
  name: string;
  image?: string[];
  thumbnail?: string;
  properties: Property[];
  hashtags?: string;
  crop_size?: string;
  profile_id: number;
  isFavorite?: boolean;
  password?: string;
  description?: string;
}

export { EPropertyType };
export type { Character, ColorPropertyKey, Property };
