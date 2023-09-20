import { Meta, StoryObj } from '@storybook/react';
import image from '../../assets/avatar.png';

import { SocialShare } from '@/components/article/SocialShare';

const meta: Meta<typeof SocialShare> = {
  title: 'Article/SocialShare',
  component: SocialShare,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SocialShare>;

export const Base: Story = {
  render: (args) => <SocialShare {...args}></SocialShare>,
  args: {
    url: 'foo',
  },
};
