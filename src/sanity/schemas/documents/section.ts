import type { FC } from "react";
import { SanityDocument } from "next-sanity";
import { DocumentsIcon } from "@sanity/icons";
import {
  defineField,
  defineType,
  StringInputProps,
  useFormValue,
} from "sanity";
import isUndefined from "lodash/isUndefined";

import defineRichtextField from "../helpers/richtext";
import { Prepare } from "../../types/utils";

const components: { [value: string]: string } = {
  articles: "Articles",
  bigNumbers: "Big Numbers",
  contact: "Contact",
  contentBlock: "Content Block",
  hero: "Hero",
  logoWall: "Logo Wall",
  multiColumn: "Multi Column",
  team: "Team",
};

const variants: { [variant: string]: { [value: string]: string } } = {
  hero: {
    default: "Default",
    bigText: "Big Text",
    image: "Image",
  },
};

const styleAlignments: { [value: string]: string } = {
  left: "Left",
  center: "Center",
  right: "Right",
};

const DynamicListField: FC<StringInputProps> = (props) => {
  const document = useFormValue([]);
  // @ts-ignore
  props.schemaType.options.list = props.schemaType.options.dynamicList({
    document,
    path: props.path,
  });
  return props.renderDefault(props);
};

export default defineType({
  type: "document",
  name: "section",
  title: "Sections",
  icon: DocumentsIcon,
  fieldsets: [
    {
      name: "style",
      title: "Style",
      options: { collapsible: true },
    },
  ],
  fields: [
    defineField({
      name: "component",
      title: "Component",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: Object.keys(components).map((value) => ({
          title: components[value],
          value,
        })),
      },
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      components: {
        input: DynamicListField,
      },
      hidden: ({ document }) =>
        !Object.keys(variants).includes(
          (document?.component as string | undefined) ?? "",
        ),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.component) {
            case "hero":
              return !isUndefined(field) || "Variant is required";
            default:
              return true;
          }
        }),
      options: {
        // @ts-ignore
        dynamicList: ({ document }: SanityDocument) =>
          Object.keys(variants[document.component]).map((value) => ({
            title: variants[document.component][value],
            value,
          })),
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      hidden: ({ document }) =>
        ![
          "articles",
          "bigNumbers",
          "contact",
          "contentBlock",
          "hero",
          "logoWall",
          "multiColumn",
          "team",
        ].includes((document?.component as string | undefined) ?? "") ||
        (document?.component === "hero" &&
          !["default", "bigText"].includes(
            (document?.variant as string | undefined) ?? "",
          )),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.component) {
            // Add required validation here
            // case 'hero':
            //   return !isUndefined(field) || 'Title is required';
            default:
              return true;
          }
        }),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      hidden: ({ document }) =>
        !["hero"].includes((document?.component as string | undefined) ?? "") ||
        (document?.component === "hero" &&
          !["bigText"].includes(
            (document?.variant as string | undefined) ?? "",
          )),
    }),
    defineRichtextField(
      {
        name: "content",
        title: "Content",
        hidden: ({ document }) =>
          !["contact", "contentBlock"].includes(
            (document?.component as string | undefined) ?? "",
          ),
      },
      {
        attachments: ["image"],
      },
    ),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      hidden: ({ document }) =>
        !["contact", "contentBlock", "hero"].includes(
          (document?.component as string | undefined) ?? "",
        ) ||
        (document?.component === "hero" &&
          !["default", "image"].includes(
            (document?.variant as string | undefined) ?? "",
          )),
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "button",
        },
      ],
      hidden: ({ document }) =>
        !["contentBlock"].includes(
          (document?.component as string | undefined) ?? "",
        ),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "sectionItem",
        },
      ],
      hidden: ({ document }) =>
        !["bigNumbers", "contentBlock", "multiColumn"].includes(
          (document?.component as string | undefined) ?? "",
        ),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.component) {
            case "bigNumbers":
            case "multiColumn":
              return !isUndefined(field) || "Items are required";
            default:
              return true;
          }
        }),
    }),
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
      hidden: ({ document }) =>
        !["logoWall"].includes(
          (document?.component as string | undefined) ?? "",
        ),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.component) {
            case "logoWall":
              return !isUndefined(field) || "Links are required";
            default:
              return true;
          }
        }),
    }),
    defineField({
      name: "people",
      title: "People",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "person",
            },
          ],
        },
      ],
      hidden: ({ document }) =>
        !["team"].includes(
          (document?.component as string | undefined) ?? "",
        ),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.component) {
            case "team":
              return !isUndefined(field) || "People are required";
            default:
              return true;
          }
        }),
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
      hidden: ({ document }) =>
        !["contact"].includes(
          (document?.component as string | undefined) ?? "",
        ),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.component) {
            case "contact":
              return !isUndefined(field) || "Form is required";
            default:
              return true;
          }
        }),
    }),
    defineField({
      name: "styleAlignment",
      type: "string",
      title: "Alignment",
      fieldset: "style",
      options: {
        layout: "radio",
        list: Object.keys(styleAlignments).map((value) => ({
          title: styleAlignments[value],
          value,
        })),
      },
      hidden: ({ document }) =>
        !["contact", "contentBlock"].includes(
          (document?.component as string | undefined) ?? "",
        ),
    }),
    defineField({
      name: "styleMargin",
      title: "Margin",
      type: "measurements",
      fieldset: "style",
      hidden: ({ document }) =>
        ![
          "articles",
          "bigNumbers",
          "contact",
          "contentBlock",
          "hero",
          "logoWall",
          "multiColumn",
          "team",
        ].includes((document?.component as string | undefined) ?? "") ||
        (document?.component === "hero" &&
          !["default", "bigText", "image"].includes(
            (document?.variant as string | undefined) ?? "",
          )),
    }),
    defineField({
      name: "stylePadding",
      title: "Padding",
      type: "measurements",
      fieldset: "style",
      hidden: ({ document }) =>
        ![
          "articles",
          "bigNumbers",
          "contact",
          "contentBlock",
          "hero",
          "logoWall",
          "multiColumn",
          "team",
        ].includes((document?.component as string | undefined) ?? "") ||
        (document?.component === "hero" &&
          !["default", "bigText"].includes(
            (document?.variant as string | undefined) ?? "",
          )),
    }),
    defineField({
      name: "styleGradient",
      title: "Gradient",
      type: "reference",
      fieldset: "style",
      to: [
        {
          type: "gradient",
        },
      ],
      hidden: ({ document }) =>
        !["bigNumbers", "contact", "hero", "logoWall", "multiColumn"].includes(
          (document?.component as string | undefined) ?? "",
        ),
    }),
  ],
  preview: {
    select: {
      component: "component",
      media: "image",
      title: "title",
      variant: "variant",
    },
    prepare: ({ component, media, title, variant }: Prepare) => {
      const variantName = variants?.[component]?.[variant] ?? "";
      switch (component) {
        case "articles":
        case "bigNumbers":
        case "contact":
        case "contentBlock":
        case "form":
        case "hero":
        case "logoWall":
        case "multiColumn":
        case "team":
          return {
            title: title ?? "Untitled",
            media,
            subtitle: `${components[component]}${
              variantName ? ` (${variantName})` : ""
            }`,
          };
        default:
          return {
            title: "Untitled",
            subtitle: "Section",
          };
      }
    },
  },
});
