import { Meta, StoryObj } from "@storybook/react";

import { SidebarLinks } from "@/components/article/SidebarLinks";

const meta: Meta<typeof SidebarLinks> = {
  title: "Article/SidebarLinks",
  component: SidebarLinks,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SidebarLinks>;

export const Base: Story = {
  render: (args) => <SidebarLinks {...args}></SidebarLinks>,
  args: {
    headings: [
      { title: "The land of good vibes", id: "foo" },
      { title: "The land of good vibes", id: "foo" },
      { title: "The land of good vibes", id: "foo" },
    ],
  },
};
