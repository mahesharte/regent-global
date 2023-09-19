import { Meta, StoryObj } from "@storybook/react";

import avatarImage from "@/assets/istockphoto-805012064-612x612.jpg";

import { TeamImage } from "@/components/TeamImage";

const meta: Meta<typeof TeamImage> = {
  title: "TeamImage",
  component: TeamImage,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

const links = [
  { name: "About us", url: "B", currentPage: false },
  { name: "Economy", url: "B", currentPage: false },
  { name: "Investment", url: "B", currentPage: true },
  { name: "Mission", url: "B", currentPage: false },
  { name: "Team", url: "B", currentPage: false },
  { name: "Blog", url: "B", currentPage: false },
  { name: "Contact", url: "B", currentPage: false },
  { name: "Regent Global", url: "B", currentPage: false },
  { name: "Privacy", url: "B", currentPage: false },
  { name: "Cookies", url: "B", currentPage: false },
];

type Story = StoryObj<typeof TeamImage>;

export const Base: Story = {
  render: (args) => <TeamImage {...args}></TeamImage>,
  args: {
    image: avatarImage.src,
    name: "John Isaiah Smith",
    title: "CEO",
    gradientDirection: "SE",
    fadeToTransparent: false,
  },
};
