import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  type: "document",
  name: "footer",
  title: "Footer",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "link",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "form",
      title: "Form",
      type: "reference",
      to: [
        {
          type: "form",
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Footer",
    }),
  },
});
