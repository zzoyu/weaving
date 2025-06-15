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

interface Universe {
  id: number;
  profile_id: number;
  name: string;
  image?: string[];
  thumbnail?: string;
  properties: Property[];
  hashtags?: string;
  description?: string;
  created_at: string;
}

export { EPropertyType };
export type { Property, Universe };

