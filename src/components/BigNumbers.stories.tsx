import { Meta, StoryObj } from '@storybook/react';
import image from '../assets/regent-logo.svg';

import { BigNumbers } from '@/components/BigNumbers';

const meta: Meta<typeof BigNumbers> = {
  title: 'BigNumbers',
  component: BigNumbers,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof BigNumbers>;

export const Base: Story = {
  render: (args) => <BigNumbers {...args}></BigNumbers>,
  args: {
    headline: 'We are global by design',
    items: [
      { subText: 'Big number here', imageUrl: image.src, number: '100+' },
      { subText: 'Big number here', imageUrl: image.src, number: '100+' },
      { subText: 'Big number here', imageUrl: image.src, number: '100+' },
    ],
  },
};
