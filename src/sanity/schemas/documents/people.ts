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
      groups: "groups",
      media: "photo",
      name: "name",
      title: "title",
    },
    prepare: ({
      groups = [],
      media,
      name,
      title,
    }: Prepare & { groups: string[] }) => ({
      media,
      title: name,
      subtitle: `${
        groups.map((group) => personGroups[group]).join(", ") || "(No group)"
      }${title ? ` - ${title}` : ""}`,
    }),
  },
});
