import { Meta, StoryObj } from "@storybook/react";

import { CategoryTabs } from "@/components/CategoryTabs";

const meta: Meta<typeof CategoryTabs> = {
  title: "CategoryTabs",
  component: CategoryTabs,
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

type Story = StoryObj<typeof CategoryTabs>;

export const Base: Story = {
  render: (args) => <CategoryTabs {...args}></CategoryTabs>,
  args: {
    categories: [
      { title: "Most recent", linkTo: "asd", active: false },
      { title: "Global", linkTo: "asd", active: true },
      { title: "Colleges", linkTo: "asd", active: false },
      { title: "Economy", linkTo: "asd", active: false },
    ],
  },
};
