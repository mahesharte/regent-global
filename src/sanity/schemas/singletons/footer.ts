import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import defineRichtextField from "../helpers/richtext";

export default defineType({
  type: "document",
  name: "footer",
  title: "Footer",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "link" }],
        },
      ],
    }),

    defineField({
      name: "form",
      title: "Form",
      type: "reference",
      to: [{ type: "form" }],
    }),

    // 🔹 Social URLs (already done)
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "facebook",
          title: "Facebook URL",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        }),
        defineField({
          name: "tiktok",
          title: "TikTok URL",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
        }),
      ],
    }),

    // 🔹 NEW: Social icons (uploadable images)
    defineField({
      name: "socialIcons",
      title: "Social icons",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "facebook",
          title: "Facebook icon",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "instagram",
          title: "Instagram icon",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "tiktok",
          title: "TikTok icon",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn icon",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),

    // 🔹 Legal links group (for Cookies | Privacy)
    defineField({
      name: "legalLinks",
      title: "Legal links",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "cookies",
          title: "Cookies page URL",
          type: "url",
        }),
        defineField({
          name: "privacy",
          title: "Privacy policy URL",
          type: "url",
        }),
      ],
    }),

    defineRichtextField({
      name: "copyrightText",
      title: "Copyright Text",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Footer",
    }),
  },
});
