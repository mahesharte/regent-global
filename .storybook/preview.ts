import type { Preview } from "@storybook/react";

import "@fontsource/inter";
import "@fontsource/inter/900.css";
import "@/styles/globals.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
export default preview;
