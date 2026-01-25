import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import ListProperties from "../app/components/properties/list-properties";
import { EPropertyType } from "../types/character";

const sampleProperties = [
  { key: "Age", value: "25", type: EPropertyType.STRING, uuid: "p1" },
  {
    key: "Theme Color",
    value: "#ff0044",
    type: EPropertyType.STRING,
    uuid: "p2",
  },
];

const meta = {
  title: "Components/Properties/ListProperties",
  component: ListProperties,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    properties: sampleProperties,
    handler: fn(),
  },
} satisfies Meta<typeof ListProperties>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithErrors: Story = {
  args: {
    errors: [
      {
        message: "정의된 키가 필요합니다",
        key: { message: "키가 필요합니다" },
        value: { message: "값이 필요합니다" },
      },
    ] as any,
  },
};
