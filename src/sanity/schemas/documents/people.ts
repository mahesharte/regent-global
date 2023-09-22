import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { Prepare } from "../../types/utils";

const personGroups: { [value: string]: string } = {
  author: "Author",
  team: "Team",
};

export default defineType({
  type: "document",
  name: "person",
  title: "People",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "groups",
      title: "Groups",
      type: "array",
      options: {
        list: Object.keys(personGroups).map((value) => ({
          title: personGroups[value],
          value,
        })),
      },
      of: [
        {
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    select: {
      media: "photo",
      title: "name",
      groups: "groups",
    },
    prepare: ({
      groups = [],
      media,
      title,
    }: Prepare & { groups: string[] }) => ({
      media,
      title,
      subtitle:
        groups.map((group) => personGroups[group]).join(", ") || "(No group)",
    }),
  },
});
