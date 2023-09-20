import { Meta, StoryObj } from "@storybook/react";

import { RelatedArticles } from "@/components/article/RelatedArticles";

const meta: Meta<typeof RelatedArticles> = {
  title: "Article/RelatedArticles",
  component: RelatedArticles,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof RelatedArticles>;

export const Base: Story = {
  render: (args) => <RelatedArticles {...args}></RelatedArticles>,
  args: {},
};
