import { defineField, defineType } from "sanity";
import startCase from "lodash/startCase";

import defineRichtextField from "../helpers/richtext";
import { Prepare } from "../../types/utils";

const keyValueTypes: { [value: string]: string } = {
  string: "String",
  number: "Number",
  richtext: "Richtext",
  image: "Image",
  gradient: "Gradient",
};

export default defineType({
  type: "object",
  name: "keyValue",
  title: "Key Value",
  fields: [
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      initialValue: "string",
      validation: (rule) => rule.required(),
      options: {
        list: Object.keys(keyValueTypes).map((value) => ({
          title: keyValueTypes[value],
          value,
        })),
      },
    }),
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stringValue",
      title: "Value",
      type: "string",
      hidden: ({ parent }) => parent.type !== "string",
    }),
    defineField({
      name: "numberValue",
      title: "Value",
      type: "number",
      hidden: ({ parent }) => parent.type !== "number",
    }),
    defineRichtextField({
      name: "richtextValue",
      title: "Value",
      hidden: ({ parent }) => parent.type !== "richtext",
    }),
    defineField({
      name: "imageValue",
      title: "Value",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent.type !== "image",
    }),
    defineField({
      name: "gradientValue",
      title: "Value",
      type: "reference",
      to: [
        {
          type: "gradient",
        },
      ],
      hidden: ({ parent }) => parent.type !== "gradient",
    }),
  ],
  preview: {
    select: {
      key: "key",
      type: "type",
    },
    prepare: ({ key, type }: Prepare) => {
      return {
        title: startCase(key),
        subtitle: keyValueTypes[type],
      };
    },
  },
});
