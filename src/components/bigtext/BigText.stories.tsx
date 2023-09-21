import { Meta, StoryObj } from "@storybook/react";
import image from "../../assets/avatar.png";

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
  args: {
    heading: "Meet the Minds Behind Regent Group",
    className: "bg-gradient-to-r from-red to-blue py-28",
  },
};

export const Subheading: Story = {
  render: (args) => <BigText {...args}></BigText>,
  args: {
    heading: "From very insipiring people.",
    subheading: "Blog",
    className: "bg-gradient-to-r from-red to-blue py-28",
  },
};

export const Author: Story = {
  render: (args) => (
    <BigText {...args}>
      <div className="mt-10 flex items-center justify-center">
        <img className="mr-12 h-14 w-14" src={image.src} />
        <span>John Isaiah Smith</span>
      </div>
    </BigText>
  ),
  args: {
    heading: "Meet the Minds Behind Regent Group",
    className: "bg-gradient-to-r from-red to-blue py-28",
  },
};
