import { Meta, StoryObj } from "@storybook/react";
import image from "../assets/regent-logo.svg";

import { BigNumbers } from "@/components/BigNumbers";

const meta: Meta<typeof BigNumbers> = {
  title: "BigNumbers",
  component: BigNumbers,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof BigNumbers>;

export const Base: Story = {
  render: (args) => (
    <div className="bg-gradient-to-r from-red to-blue px-24 pb-28 pt-20">
      <BigNumbers {...args}></BigNumbers>
    </div>
  ),
  args: {
    headline: "We are global by design",
    items: [
      { subText: <>Big number here</>, imageUrl: image.src, number: "100+" },
      { subText: <>Big number here</>, imageUrl: image.src, number: "100+" },
      { subText: <>Big number here</>, imageUrl: image.src, number: "100+" },
    ],
  },
};
