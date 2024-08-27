import RelationshipGraph from "@/app/u/[slug]/[id]/components/relationship-graph";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import ProfileDummy from "../assets/components/profile-dummy.png";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/RelationshipGraph",
  component: RelationshipGraph,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    character: {
      description: "Character object",
      control: "object",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof RelationshipGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Demo: Story = {
  args: {
    character: {
      id: 1,
      name: "Character Name 1",
      thumbnail: ProfileDummy.src,
      properties: [],
      profile_id: 0,
    },
    relationships: [
      {
        from_id: 1,
        to_id: 2,
        name: "Relationship Name 1",
        character: {
          id: 2,
          name: "Character Name 2",
          thumbnail: ProfileDummy.src,
        },
        id: 0,
      },
      {
        from_id: 1,
        to_id: 3,
        name: "Relationship Name 2",
        character: {
          id: 3,
          name: "Character Name 3",
          thumbnail: ProfileDummy.src,
        },
        id: 0,
      },
      {
        from_id: 1,
        to_id: 4,
        name: "Relationship Name 3",
        character: {
          id: 4,
          name: "Character Name 4",
          thumbnail: ProfileDummy.src,
        },
        id: 0,
      },
      {
        from_id: 1,
        to_id: 5,
        name: "Relationship Name 4",
        character: {
          id: 5,
          name: "Character Name 5",
          thumbnail: ProfileDummy.src,
        },
        id: 0,
      },

      {
        from_id: 1,
        to_id: 6,
        name: "Relationship Name 5",
        character: {
          id: 6,
          name: "Character Name 6",
          thumbnail: ProfileDummy.src,
        },
        id: 0,
      },
      {
        from_id: 1,
        to_id: 7,
        name: "Relationship Name 6",
        character: {
          id: 7,
          name: "Character Name 7",
          thumbnail: ProfileDummy.src,
        },
        id: 0,
      },
      {
        from_id: 1,
        to_id: 8,
        name: "Relationship Name 7",
        character: {
          id: 8,
          name: "Character Name 8",
          thumbnail: ProfileDummy.src,
        },
        id: 0,
      },
    ],
  },
};
