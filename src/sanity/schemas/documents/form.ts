import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import defineRichtextField from "../helpers/richtext";
import { Prepare } from "../../types/utils";

const actions: { [value: string]: string } = {
  contact: "Contact",
  subscribe: "Subscribe",
};

export default defineType({
  type: "document",
  name: "form",
  title: "Forms",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "action",
      title: "Action",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: Object.keys(actions).map((value) => ({
          title: actions[value],
          value,
        })),
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineRichtextField({
      name: "content",
      title: "Content",
    }),
    defineField({
      name: "inputs",
      title: "Inputs",
      type: "array",
      of: [
        {
          type: "formInput",
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      action: "action",
      title: "title",
    },
    prepare: ({ action, title }: Prepare) => ({
      title,
      subtitle: actions[action],
    }),
  },
});
