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

interface Character {
  id: number;
  name: string;
  image?: string;
  thumbnail?: string;
  properties: Property[];
  hashtags?: string;
  crop_size?: string;
  profile_id: number;
  isFavorite?: boolean;
  password?: string;
}

export { EPropertyType };
export type { Property, Character };
