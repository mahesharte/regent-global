import { Meta, StoryObj } from '@storybook/react';
import image from '../../assets/avatar.png';

import { Header } from '@/components/article/Header';

const meta: Meta<typeof Header> = {
  title: 'Article/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Base: Story = {
    render: (args) => <Header {...args}></Header>,
    args: { 
      title: 'Easd',
      authorImage: image.src,
      author: 'John Isaiah Smith'
    },
  };