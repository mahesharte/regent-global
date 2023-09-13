import { Meta, StoryObj } from "@storybook/react";
import image from '../../assets/avatar.png'

import { BigText } from "@/components/bigtext";

const meta: Meta<typeof BigText> = {
  title: "BigText",
  component: BigText,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof BigText>;

export const Base: Story = {
  render: (args) => <BigText {...args}></BigText>,
  args: { heading: "Meet the Minds Behind Regent Group", },
};

export const Subheading: Story = {
  render: (args) => <BigText {...args}></BigText>,
  args: { heading: "From very insipiring people.", subheading: "Blog" },
};

export const Author: Story = {
  render: (args) => <BigText {...args}>
    <div className="flex justify-center items-center mt-10">
        <img className='w-14 h-14 mr-12' src={image.src} />
        <span>John Isaiah Smith</span>
    </div>
    </BigText>,
  args: { heading: 'Meet the Minds Behind Regent Group' },
};
