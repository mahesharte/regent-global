import { Meta, StoryObj } from '@storybook/react';
import image from '../assets/globe.svg';

import { FourColumns } from '@/components/FourColumns';
import { SpaceRocketEarth } from './Icons';

const meta: Meta<typeof FourColumns> = {
  title: 'FourColumns',
  component: FourColumns,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FourColumns>;

export const Base: Story = {
  render: (args) => <FourColumns {...args}></FourColumns>,
  args: {
    columns: [
        {
            icon: <SpaceRocketEarth />,
            headline: 'Headline here',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas lacus lacinia erat maximus, eget facilisis turpis sodales. In et tincidunt ligula, non rhoncus dolor.'
        },
        {
            icon: <SpaceRocketEarth />,
            headline: 'Headline here',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas lacus lacinia erat maximus, eget facilisis turpis sodales. In et tincidunt ligula, non rhoncus dolor.'
        },
        {
            icon: <SpaceRocketEarth />,
            headline: 'Headline here',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas lacus lacinia erat maximus, eget facilisis turpis sodales. In et tincidunt ligula, non rhoncus dolor.'
        },
        {
            icon: <SpaceRocketEarth />,
            headline: 'Headline here',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas lacus lacinia erat maximus, eget facilisis turpis sodales. In et tincidunt ligula, non rhoncus dolor.'
        }
    ]
  },
};