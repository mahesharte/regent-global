import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import slugify from "slugify";

import defineRichtextField from "../helpers/richtext";
import { Prepare } from "../../types/utils";

export default defineType({
  type: "document",
  name: "article",
  title: "Articles",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input: string) =>
          slugify(input, {
            lower: true,
            strict: true,
          }),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineRichtextField({
      name: "introduction",
      title: "Introduction",
    }),
    defineRichtextField(
      {
        name: "content",
        title: "Content",
        validation: (rule) => rule.required(),
      },
      {
        attachments: ["image"],
      },
    ),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      hidden: true,
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [
        {
          type: "person",
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "articleTag",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "relatedArticles",
      title: "Related Articles",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "article",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "datePublished",
      title: "Date Published",
      type: "date",
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
      media: "featuredImage",
      title: "title",
    },
    prepare: ({ media, title }: Prepare) => ({
      media,
      title,
      subtitle: "Article",
    }),
  },
});
