import { defineField, defineType } from "sanity";

import { Prepare } from "../../types/utils";

const buttonVariants: { [value: string]: string } = {
  primary: "Primary",
};

const buttonAlignments: { [value: string]: string } = {
  left: "Left",
  right: "Right",
};

const buttonSizes: { [value: string]: string } = {
  medium: "Medium",
};

export default defineType({
  type: "object",
  name: "button",
  title: "Button",
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "variant",
      type: "string",
      title: "Variant",
      initialValue: "primary",
      options: {
        list: Object.keys(buttonVariants).map((value) => ({
          title: buttonVariants[value],
          value,
        })),
      },
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "reference",
      to: [
        {
          type: "link",
        },
      ],
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
    }),
    defineField({
      name: "alignment",
      type: "string",
      title: "Alignment",
      initialValue: "left",
      options: {
        list: Object.keys(buttonAlignments).map((value) => ({
          title: buttonAlignments[value],
          value,
        })),
      },
    }),
    defineField({
      name: "size",
      type: "string",
      title: "Size",
      initialValue: "medium",
      options: {
        list: Object.keys(buttonSizes).map((value) => ({
          title: buttonSizes[value],
          value,
        })),
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      variant: "variant",
    },
    prepare: ({ title, variant }: Prepare) => {
      return {
        title,
        subtitle: `Button (${buttonVariants[variant]})`,
      };
    },
  },
});
