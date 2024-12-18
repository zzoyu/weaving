import { EPropertyType, Property } from "@/types/character";

export enum EPropertyColor {
  THEME = "themeColor",
  EYE = "eyeColor",
  HAIR = "hairColor",
}

export const baseColorProperties: Property[] = [
  {
    key: EPropertyColor.THEME,
    value: "",
    type: EPropertyType.COLOR,
  },
  {
    key: EPropertyColor.EYE,
    value: "",
    type: EPropertyType.COLOR,
  },
  {
    key: EPropertyColor.HAIR,
    value: "",
    type: EPropertyType.COLOR,
  },
];

export const baseProperties: Property[] = [
  {
    key: "생일",
    value: "",
    type: EPropertyType.DATE,
  },
  {
    key: "성별",
    value: "",
    type: EPropertyType.STRING,
  },
  {
    key: "키",
    value: "",
    type: EPropertyType.STRING,
  },
];
