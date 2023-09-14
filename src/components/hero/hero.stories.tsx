import { Meta, StoryObj } from "@storybook/react";
import image from '../../assets/avatar.png'

import { Hero } from "@/components/hero";

const meta: Meta<typeof Hero> = {
  title: "Hero",
  component: Hero,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Hero>;

export const Base: Story = {
  render: (args) => <Hero {...args}></Hero>,
  args: { heading: "Meet the Minds Behind Regent Group", },
};

export const Subheading: Story = {
  render: (args) => <Hero {...args}></Hero>,
  args: { heading: "From very insipiring people.", subheading: "Blog" },
};

export const Author: Story = {
  render: (args) => <Hero {...args}>
    <div className="flex justify-center items-center mt-10">
        <img className='w-14 h-14 mr-12' src={image.src} />
        <span>John Isaiah Smith</span>
    </div>
    </Hero>,
  args: { heading: 'Meet the Minds Behind Regent Group' },
};
