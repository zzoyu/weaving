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
}

export { EPropertyType };
export type { Property, Character };
