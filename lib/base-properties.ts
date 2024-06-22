import { EPropertyType, Property } from "@/types/character";

export const baseProperties: Property[] = [
  {
    key: "성별",
    value: "",
    type: EPropertyType.STRING,
  },
  {
    key: "생일",
    value: "",
    type: EPropertyType.DATE,
  },
  {
    key: "키",
    value: "",
    type: EPropertyType.STRING,
  },
  {
    key: "성격",
    value: "",
    type: EPropertyType.STRING,
  },
  {
    key: "themeColor",
    value: "",
    type: EPropertyType.COLOR,
  },
  {
    key: "eyeColor",
    value: "",
    type: EPropertyType.COLOR,
  },
  {
    key: "hairColor",
    value: "",
    type: EPropertyType.COLOR,
  },
];
