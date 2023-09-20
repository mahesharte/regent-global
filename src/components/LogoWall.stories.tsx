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
  render: (args) => (
    <div className="bg-gradient-to-r from-red to-blue pt-20 px-24 pb-28">
      <LogoWall {...args}></LogoWall>
    </div>
  ),
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
