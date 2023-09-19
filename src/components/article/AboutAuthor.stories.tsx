import { Meta, StoryObj } from '@storybook/react';
import image from '../../assets/avatar.png';

import { AboutAuthor } from '@/components/article/AboutAuthor';

const meta: Meta<typeof AboutAuthor> = {
  title: 'Article/AboutAuthor',
  component: AboutAuthor,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof AboutAuthor>;

export const Base: Story = {
    render: (args) => <AboutAuthor {...args}></AboutAuthor>,
    args: { 
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at nibh quis risus euismod feugiat non in augue. Proin mollis sem tellus, quis iaculis purus congue ut.',
      authorImage: image.src,
      author: 'John Isaiah Smith'
    },
  };