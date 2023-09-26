import { Meta, StoryObj } from "@storybook/react";
import image from "../../assets/avatar.png";
import hero from "../../assets/AdobeStock_166338789_Preview 3.jpg";

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
  args: { heading: "Meet the Minds Behind Regent Group", imageUrl: hero.src },
};

export const Subheading: Story = {
  render: (args) => <Hero {...args}></Hero>,
  args: {
    heading: "From very insipiring people.",
    imageUrl: hero.src,
  },
};

export const Author: Story = {
  render: (args) => (
    <Hero {...args}>
      <div className="mt-10 flex items-center justify-center">
        <img className="mr-12 h-14 w-14" src={image.src} />
        <span>John Isaiah Smith</span>
      </div>
    </Hero>
  ),
  args: { heading: "Meet the Minds Behind Regent Group", imageUrl: hero.src },
};
