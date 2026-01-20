import StatsChart from "@/app/components/properties/stats-chart";
import { generateId } from "@/utils/random-character/common";
import type { Meta, StoryObj } from "@storybook/nextjs";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/StatsChart",
  component: StatsChart,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    data: { control: "object" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof StatsChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Demo: Story = {
  args: {
    data: [
      { id: generateId(), name: "어쩌고1", value: 10, fullMark: 10 },
      { id: generateId(), name: "어쩌고2", value: 6, fullMark: 10 },
      { id: generateId(), name: "어쩌고3", value: 7, fullMark: 10 },
      { id: generateId(), name: "어쩌고4", value: 3, fullMark: 10 },
    ],
  },
};
