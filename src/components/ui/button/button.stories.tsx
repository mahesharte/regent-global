import { Meta, StoryObj } from "@storybook/react"
import { Button, Cta } from "@/components/ui/button"

const meta: Meta<typeof Button> = {
  title: "ui/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {},
}
export default meta

type Story = StoryObj<typeof Button>

export const Base: Story = {
  render: (args) => <Button {...args}>Button</Button>,
  args: {},
}

export const LongText: Story = {
  render: (args) => <Button {...args}>Button with a long CTA text</Button>,
  args: {},
}

export const CTA: Story = {
  render: (args) => <Cta {...args}>Button</Cta>,
  args: {},
}