import { defineField, defineType } from "sanity";

import { Prepare } from "../../types/utils";

const types: { [value: string]: string } = {
  email: "Email",
  tel: "Phone",
  text: "Text",
  textarea: "Text Area",
};

export default defineType({
  type: "object",
  name: "formInput",
  title: "Form Input",
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: Object.keys(types).map((value) => ({
          title: types[value],
          value,
        })),
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
    }),
    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
    }),
  ],
  preview: {
    select: {
      placeholder: "placeholder",
      title: "title",
      type: "type",
    },
    prepare: ({ placeholder, title, type }: Prepare) => {
      return {
        title: title || placeholder || types[type],
        subtitle: types[type],
      };
    },
  },
});
