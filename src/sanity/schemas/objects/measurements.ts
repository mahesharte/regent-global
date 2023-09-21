import { defineArrayMember, defineField, defineType } from "sanity";

import { Prepare } from "@/sanity/types/utils";

const sizes: { [name: string]: string } = {
  xs: "Extra Small (Default)",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra Large",
};

export default defineType({
  type: "object",
  name: "measurements",
  title: "Measurements",
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: "breakpoints",
      title: "Breakpoints",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "breakpoint",
          title: "Breakpoint",
          fields: [
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              initialValue: "xs",
              validation: (rule) => rule.required(),
              options: {
                list: Object.keys(sizes).map((value) => ({
                  title: sizes[value],
                  value,
                })),
              },
            }),
            defineField({
              name: "top",
              title: "Top",
              type: "string",
              description: "Please append the unit to use (e.g. px, pt, rem)",
            }),
            defineField({
              name: "bottom",
              title: "Bottom",
              type: "string",
              description: "Please append the unit to use (e.g. px, pt, rem)",
            }),
          ],
          preview: {
            select: {
              size: "size",
              top: "top",
              bottom: "bottom",
            },
            prepare: ({ size, top, bottom }: Prepare) => ({
              title: `${top ?? "0px"} ${bottom ?? "0px"}`,
              subtitle: sizes[size],
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Measurements",
    }),
  },
});
