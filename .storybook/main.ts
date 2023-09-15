import type { StorybookConfig } from "@storybook/nextjs";
import * as path from 'path'

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-viewport",
    "storybook-css-modules"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    // @ts-ignore
    config.resolve.alias = {
      // @ts-ignore
      ...config.resolve.alias,
      '@': path.resolve(__dirname, "../src/"),
    };
    return config;
  }
};
export default config;
