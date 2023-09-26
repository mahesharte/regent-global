import { Meta, StoryObj } from "@storybook/react";
import image from "../assets/regent-logo-full.svg";

import { NavigationBlock } from "@/components/NavigationBlock";

const meta: Meta<typeof NavigationBlock> = {
  title: "NavigationBlock",
  component: NavigationBlock,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof NavigationBlock>;

export const Base: Story = {
  render: (args) => <NavigationBlock {...args}></NavigationBlock>,
  args: {
    headline: "Partnerships that speak volumes",
    items: [
      {
        text: "Every member, from Dr. Pankaj to our youngest educator, combines the wisdom of experience with the freshness of new perspectives.",
        url: "image.src",
        title: "Institutions",
      },
      {
        text: "Every member, from Dr. Pankaj to our youngest educator, combines the wisdom of experience with the freshness of new perspectives.",
        url: "image.src",
        title: "Countries",
      },
      {
        text: "Every member, from Dr. Pankaj to our youngest educator, combines the wisdom of experience with the freshness of new perspectives.",
        url: "image.src",
        title: "Campuses",
      },
      {
        text: "Every member, from Dr. Pankaj to our youngest educator, combines the wisdom of experience with the freshness of new perspectives.",
        url: "image.src",
        title: "title",
      },
    ],
  },
};
