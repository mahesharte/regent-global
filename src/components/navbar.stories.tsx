import { Meta, StoryObj } from "@storybook/react";

import { Navbar } from "@/components/navbar";

const meta: Meta<typeof Navbar> = {
  title: "Navbar",
  component: Navbar,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

const links = [
    {name: 'About us', url: 'B', currentPage: false},
    {name: 'Economy', url: 'B', currentPage: false},
    {name: 'Investment', url: 'B', currentPage: true},
    {name: 'Mission', url: 'B', currentPage: false},
    {name: 'Team', url: 'B', currentPage: false},
    {name: 'Blog', url: 'B', currentPage: false},
    {name: 'Contact', url: 'B', currentPage: false},
]

type Story = StoryObj<typeof Navbar>;

export const Base: Story = {
  render: (args) => <Navbar {...args}></Navbar>,
  args: { links },
};
