import { Meta, StoryObj } from "@storybook/react";
import image from "../assets/AdobeStock_166338789_Preview 3.jpg";

import { TwoColumns } from "@/components/TwoColumns";

const meta: Meta<typeof TwoColumns> = {
  title: "TwoColumns",
  component: TwoColumns,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TwoColumns>;

export const Base: Story = {
  render: (args) => <TwoColumns {...args}></TwoColumns>,
  args: {
    columns: [
      {
        heading: "Meet the Minds Behind Regent Group",
        body: (
          <p>
            At the heart of our story is the balance of global outreach and
            family values. While we proudly wear the badge of a global
            institution, we&apos;ve never strayed from our authentic roots,
            ensuring every student feels the warmth of a family-run institution.
          </p>
        ),
        image: image.src,
      },
      {
        heading: "Meet the Minds Behind Regent Group",
        body: (
          <p>
            At the heart of our story is the balance of global outreach and
            family values. While we proudly wear the badge of a global
            institution, we&apos;ve never strayed from our authentic roots,
            ensuring every student feels the warmth of a family-run institution.
          </p>
        ),
        image: image.src,
      },
    ],
  },
};
