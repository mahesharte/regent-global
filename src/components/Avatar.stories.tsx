import { Meta, StoryObj } from "@storybook/react";
import image from "../assets/avatar.png";

import { Avatar } from "@/components/Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Base: Story = {
  render: (args) => <Avatar {...args}></Avatar>,
  args: {
    image: image.src,
  },
};

export const Name: Story = {
  render: (args) => <Avatar {...args}></Avatar>,
  args: {
    image: image.src,
    name: "John Isaiah Smith",
  },
};
