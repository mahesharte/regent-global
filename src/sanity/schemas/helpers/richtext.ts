import { defineArrayMember, defineField } from "sanity";
import isUndefined from "lodash/isUndefined";
import {
  type Attachment,
  type BlockStyle,
  existingBlockStyles,
} from "@/sanity/types/objects";

type DefineFieldParameters = Parameters<typeof defineField>;
type SchemaField = DefineFieldParameters[0];
type DefineOptions = DefineFieldParameters[1];
type DefineOptionsWithAttachments = DefineOptions & {
  attachments?: Attachment[];
  blockStyles?: BlockStyle[];
};

const defaultBlockStyles: BlockStyle[] = [
  "normal",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
];

const defineRichtextField = (
  schemaField: Omit<SchemaField, "type" | "of">,
  {
    attachments = [],
    blockStyles = defaultBlockStyles,
    ...defineOptions
  }: DefineOptionsWithAttachments = {},
) =>
  defineField(
    {
      ...schemaField,
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: blockStyles.map((value) => ({
            title: existingBlockStyles[value],
            value,
          })),
        }),
        ...attachments
          .map((attachment) => {
            switch (attachment) {
              case "image":
                return defineArrayMember({
                  type: "image",
                  fields: [
                    {
                      type: "text",
                      name: "alt",
                      title: "Alternate text",
                      description: "Enter image alt text",
                    },
                  ],
                });
              default:
                return undefined;
            }
          })
          .filter((arrayMember) => !isUndefined(arrayMember)),
      ],
    } as SchemaField,
    defineOptions as DefineOptions,
  );

export default defineRichtextField;
