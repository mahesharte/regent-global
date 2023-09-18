import { Meta, StoryObj } from '@storybook/react';
import image from '../assets/globe.svg';

import { ContentBlock } from '@/components/ContentBlock';

const meta: Meta<typeof ContentBlock> = {
  title: 'ContentBlock',
  component: ContentBlock,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ContentBlock>;

export const Left: Story = {
  render: (args) => <ContentBlock {...args}></ContentBlock>,
  args: {
    align: 'left',
    heading: 'Meet the Minds Behind Regent Group',
    body: "At the heart of our story is the balance of global outreach and family values. While we proudly wear the badge of a global institution, we've never strayed from our authentic roots, ensuring every student feels the warmth of a family-run institution.",
    image: image.src,
  },
};

export const Center: Story = {
  render: (args) => <ContentBlock {...args}></ContentBlock>,
  args: {
    align: 'center',
    heading: 'Meet the Minds Behind Regent Group',
    body: "At the heart of our story is the balance of global outreach and family values. While we proudly wear the badge of a global institution, we've never strayed from our authentic roots, ensuring every student feels the warmth of a family-run institution.",
  },
};

export const Right: Story = {
  render: (args) => <ContentBlock {...args}></ContentBlock>,
  args: {
    align: 'right',
    heading: 'Meet the Minds Behind Regent Group',
    body: "At the heart of our story is the balance of global outreach and family values. While we proudly wear the badge of a global institution, we've never strayed from our authentic roots, ensuring every student feels the warmth of a family-run institution.",
    image: image.src,
  },
};