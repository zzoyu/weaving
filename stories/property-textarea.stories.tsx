import { EPropertyType } from "@/types/character";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";
import PropertyTextarea from "../app/components/properties/property-textarea";

const meta = {
  title: "Components/Properties/PropertyTextarea",
  component: PropertyTextarea,
  tags: ["autodocs"],
  args: {
    property: {
      key: "bio",
      value: "이곳에 내용을 입력하세요.",
      type: EPropertyType.STRING,
    },
    onChange: fn(),
    handleFocus: fn(),
    handleBlur: fn(),
  },
} satisfies Meta<typeof PropertyTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    limit: 100,
  },
};

export const WithValueError: Story = {
  args: {
    valueError: "값을 입력해주세요.",
  },
};

export const WithLimitExceedError: Story = {
  args: {
    valueError: "글자 수 초과",
    limit: 10,
  },
};

export const WithError: Story = {
  args: {
    valueError: "알 수 없는 오류가 발생했습니다.",
  },
};

export const WithKeyError: Story = {
  args: {
    keyError: "키에 오류가 있습니다.",
  },
};
