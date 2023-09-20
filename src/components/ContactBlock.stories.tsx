import { Meta, StoryObj } from "@storybook/react";
import image from "../assets/globe.svg";

import { ContactBlock } from "@/components/ContactBlock";

const meta: Meta<typeof ContactBlock> = {
  title: "ContactBlock",
  component: ContactBlock,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ContactBlock>;

export const Base: Story = {
  render: (args) => <ContactBlock></ContactBlock>,
  args: {},
};
