import { DocumentsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { components, componentsWithPadding } from "../documents/section";

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
    {
      name: "style",
      title: "Style",
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
    defineField({
      name: "styleSectionPadding",
      title: "Default Section Padding",
      group: "style",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "component",
              title: "Component",
              type: "string",
              validation: (rule) => rule.required(),
              options: {
                list: componentsWithPadding.map((value) => ({
                  title: components[value],
                  value,
                })),
              },
            }),
            defineField({
              name: "value",
              title: "Padding",
              type: "measurements",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              component: "component",
            },
            prepare: ({ component }) => ({
              title: components[component],
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Settings",
    }),
  },
});
