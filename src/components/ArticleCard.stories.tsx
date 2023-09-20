import { Meta, StoryObj } from "@storybook/react";

import blogImage from "@/assets/blog-img.svg";

import { ArticleCard } from "@/components/ArticleCard";

const meta: Meta<typeof ArticleCard> = {
  title: "ArticleCard",
  component: ArticleCard,
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

type Story = StoryObj<typeof ArticleCard>;

export const Base: Story = {
  render: (args) => <ArticleCard {...args}></ArticleCard>,
  args: {
    image: blogImage.src,
    title: "A story of a freshman in Sydney",
    tags: [
      { title: "Tag" },
      { title: "Tag" },
      { title: "Tag" },
      { title: "Tag" },
    ],
  },
};
