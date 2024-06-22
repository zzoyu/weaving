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
  image: string;
  properties: Property[];
}
