import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "setting",
  title: "Settings",
  icon: DocumentsIcon,
  groups: [
    {
      name: "articles",
      title: "Articles",
    },
    {
      name: "services",
      title: "Services",
    },
    {
      name: "theme",
      title: "Theme",
    },
  ],
  fields: [
    defineField({
      name: "articlesHome",
      title: "Articles Home Page",
      type: "reference",
      group: "articles",
      to: [
        {
          type: "page",
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "servicesGtmId",
      title: "GTM ID",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "themeGlobalGradient",
      title: "Global Gradient",
      type: "reference",
      group: "theme",
      to: [
        {
          type: "gradient",
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Settings",
    }),
  },
});
