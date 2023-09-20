import { Meta, StoryObj } from "@storybook/react";
import image from "../assets/regent-logo-full.svg";

import { LogoWall } from "@/components/LogoWall";

const meta: Meta<typeof LogoWall> = {
  title: "LogoWall",
  component: LogoWall,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof LogoWall>;

export const Base: Story = {
  render: (args) => <LogoWall {...args}></LogoWall>,
  args: {
    headline: "Partnerships that speak volumes",
    items: [
      { text: "Big number here", imageUrl: image.src },
      { text: "Big number here", imageUrl: image.src },
      { text: "Big number here", imageUrl: image.src },
      { text: "Big number here", imageUrl: image.src },
      { text: "Big number here", imageUrl: image.src },
      { text: "Big number here", imageUrl: image.src },
      { text: "Big number here", imageUrl: image.src },
      { text: "Big number here", imageUrl: image.src },
    ],
  },
};
