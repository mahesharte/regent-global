import { defineField, defineType } from "sanity";

export default defineType({
  type: "object",
  name: "heroSlide",
  title: "Hero Slide",
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
    prepare: ({ title, media }) => ({
      title: title ?? "Slide",
      media,
    }),
  },
});
