import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import slugify from "slugify";
import isUndefined from "lodash/isUndefined";

import { Prepare } from "../../types/utils";

const pageTypes: { [value: string]: string } = {
  basic: "Basic",
  error: "Error",
};

const pageStatuses: { [value: string]: string } = {
  "200": "200: OK",
  "404": "404: Not Found",
  "500": "500: Server Error",
};

export default defineType({
  type: "document",
  name: "page",
  title: "Pages",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      initialValue: "basic",
      validation: (rule) => rule.required(),
      options: {
        list: Object.keys(pageTypes).map((value) => ({
          title: pageTypes[value],
          value,
        })),
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "200",
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.type) {
            case "error":
              return !isUndefined(field) || "Status is required";
            default:
              return true;
          }
        }),
      hidden: ({ document }) =>
        !["error"].includes((document?.type as string | undefined) ?? ""),
      options: {
        list: Object.keys(pageStatuses).map((value) => ({
          title: pageStatuses[value],
          value,
        })),
      },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input: string) =>
          `/${slugify(input, {
            lower: true,
            strict: true,
          })}`,
      },
      hidden: ({ document }) =>
        !["basic"].includes((document?.type as string | undefined) ?? ""),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.type) {
            case "basic":
              return !isUndefined(field) || "Slug is required";
            default:
              return true;
          }
        }),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "section",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "pageMeta",
      title: "Page Meta",
      type: "pageMeta",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      slug: "slug.current",
      status: "status",
      title: "title",
      type: "type",
    },
    prepare: ({ slug, status, title, type }: Prepare) => {
      switch (type) {
        case "basic":
          return {
            title,
            subtitle: slug,
          };
        case "error":
          return {
            title,
            subtitle: `Error: ${status}`,
          };
        default:
          return {
            title: title ?? "Untitled",
            subtitle: `Unknown page type`,
          };
      }
    },
  },
});
