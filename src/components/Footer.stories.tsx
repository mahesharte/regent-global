import { Meta, StoryObj } from "@storybook/react";

import { Footer } from "@/components/Footer";

const meta: Meta<typeof Footer> = {
  title: "Footer",
  component: Footer,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

const links = [
  { name: "About us", url: "#", currentPage: false },
  { name: "Economy", url: "#", currentPage: false },
  { name: "Investment", url: "#", currentPage: true },
  { name: "Mission", url: "#", currentPage: false },
  { name: "Team", url: "#", currentPage: false },
  { name: "Blog", url: "#", currentPage: false },
  { name: "Contact", url: "#", currentPage: false },
  { name: "Regent Global", url: "#", currentPage: false },
];

// simple mock richtext block to satisfy <RichText />
const copyrightText = [
  {
    _type: "block",
    _key: "copy1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "copy1span1",
        text: "© 2025 Regent Global. All rights reserved.",
        marks: [],
      },
    ],
  },
];

const socialLinks = {
  facebook: "https://facebook.com/regentglobal",
  instagram: "https://instagram.com/regentglobal",
  tiktok: "https://tiktok.com/@regentglobal",
  linkedin: "https://linkedin.com/company/regentglobal",
};

const legalLinks = {
  cookies: "/cookies",
  privacy: "/privacy-policy",
};

type Story = StoryObj<typeof Footer>;

export const Base: Story = {
  render: (args) => <Footer {...args} />,
  args: {
    links,
    socialLinks,
    legalLinks,
    copyrightText,
  },
};
