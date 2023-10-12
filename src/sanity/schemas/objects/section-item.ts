import { defineField, defineType } from "sanity";

import { Prepare } from "../../types/utils";
import defineRichtextField from "../helpers/richtext";

export default defineType({
  type: "object",
  name: "sectionItem",
  title: "Section Item",
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineRichtextField({
      name: "content",
      title: "Content",
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "button",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare: ({ media, title }: Prepare) => {
      return {
        title,
        media,
        subtitle: "Section Item",
      };
    },
  },
});
