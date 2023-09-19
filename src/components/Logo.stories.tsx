import { Meta, StoryObj } from "@storybook/react";

import { Logo } from "@/components/Logo";

const meta: Meta<typeof Logo> = {
  title: "Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const Base: Story = {
  render: (args) => <Logo {...args}></Logo>,
  args: { hasWordmark: false, },
};


export const Wordmark: Story = {
    render: (args) => <Logo {...args}></Logo>,
    args: { hasWordmark: true, },
  };
  