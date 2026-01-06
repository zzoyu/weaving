import StatsProperties from "@/app/components/properties/stats-properties";
import type { Meta, StoryObj } from "@storybook/nextjs";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/StatsProperties",
  component: StatsProperties,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    properties: { control: "object" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof StatsProperties>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Demo: Story = {
  args: {
    properties: [
      { name: "어쩌고1", value: 1, fullMark: 10 },
      { name: "어쩌고2", value: 9, fullMark: 10 },
      { name: "어쩌고3", value: 8, fullMark: 10 },
      { name: "어쩌고4", value: 1, fullMark: 10 },
      { name: "어쩌고5", value: 9, fullMark: 10 },
      { name: "어쩌고6", value: 8, fullMark: 10 },
    ],
  },
};
