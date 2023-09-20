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
    body: (
      <p>
        At the heart of our story is the balance of global outreach and family
        values. While we proudly wear the badge of a global institution,
        we&apos;ve never strayed from our authentic roots, ensuring every
        student feels the warmth of a family-run institution.
      </p>
    ),
    image: image.src,
    cta: [
      { text: 'Button', url: '#' },
      { text: 'Button', url: '#' },
    ],
  },
};

export const Center: Story = {
  render: (args) => <ContentBlock {...args}></ContentBlock>,
  args: {
    align: 'center',
    heading: 'Meet the Minds Behind Regent Group',
    body: (
      <p>
        At the heart of our story is the balance of global outreach and family
        values. While we proudly wear the badge of a global institution,
        we&apos;ve never strayed from our authentic roots, ensuring every
        student feels the warmth of a family-run institution.
      </p>
    ),
    cta: [
      { text: 'Button', url: '#' },
      { text: 'Button', url: '#' },
    ],
  },
};

export const Right: Story = {
  render: (args) => <ContentBlock {...args}></ContentBlock>,
  args: {
    align: 'right',
    heading: 'Meet the Minds Behind Regent Group',
    body: (
      <p>
        At the heart of our story is the balance of global outreach and family
        values. While we proudly wear the badge of a global institution,
        we&apos;ve never strayed from our authentic roots, ensuring every
        student feels the warmth of a family-run institution.
      </p>
    ),
    image: image.src,
    cta: [
      { text: 'Button', url: '#' },
      { text: 'Button', url: '#' },
    ],
  },
};
