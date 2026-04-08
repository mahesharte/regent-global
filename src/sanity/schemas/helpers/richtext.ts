import { defineArrayMember, defineField } from "sanity";
import isUndefined from "lodash/isUndefined";
import {
  type Attachment,
  type BlockStyle,
  existingBlockStyles,
} from "@/sanity/types/objects";
import gatedPdfLinkAnnotation from "@/sanity/schemas/objects/gated-pdf-link-annotation";

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
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
              {
                name: "gatedPdfLink",
                type: "object",
                title: "PDF Gate",
                fields: [
                  {
                    name: "pdfFile",
                    type: "file",
                    title: "PDF File",
                    description: "Upload a PDF directly to Sanity",
                    options: {
                      accept: "application/pdf",
                    },
                  },
                  {
                    name: "pdfExternalUrl",
                    type: "url",
                    title: "External PDF URL",
                    description: "Optional: URL to an externally hosted PDF",
                  },
                  {
                    name: "label",
                    type: "string",
                    title: "Label (for admin tracking)",
                    description: "Optional label to identify this PDF in submissions",
                  },
                ],
                validation: (rule) =>
                  rule.custom((value: { pdfFile?: unknown; pdfExternalUrl?: string } | undefined) => {
                    if (!value) return true;
                    const hasPdfFile = value.pdfFile;
                    const hasPdfUrl = value.pdfExternalUrl;
                    if (!hasPdfFile && !hasPdfUrl) {
                      return "At least one of PDF File or External PDF URL must be set";
                    }
                    return true;
                  }),
              },
            ],
          },
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
              case "video":
                return defineArrayMember({
                  type: "object",
                  name: "videoBlock",
                  title: "Video",
                  preview: {
                    select: {
                      mediaType: "mediaType",
                      videoUrl: "videoUrl",
                      videoFileName: "videoFile.asset.originalFilename",
                    },
                    prepare({ mediaType, videoUrl, videoFileName }) {
                      const subtitle = mediaType === "videoUrl" ? videoUrl : videoFileName || "Video File";
                      return {
                        title: "🎬 Video",
                        subtitle,
                      };
                    },
                  },
                  fields: [
                    {
                      name: "mediaType",
                      title: "Media Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Video File", value: "videoFile" },
                          { title: "Video URL", value: "videoUrl" },
                        ],
                      },
                    },
                    {
                      name: "videoFile",
                      title: "Video File",
                      type: "file",
                      options: {
                        accept: "video/mp4,video/webm,.mp4,.webm",
                      },
                      hidden: ({ parent }) => (parent as any)?.mediaType !== "videoFile",
                      validation: (rule) =>
                        rule.custom((value, context) => {
                          const mediaType = (context.parent as any)?.mediaType;
                          if (mediaType === "videoFile" && !value) {
                            return "Video file is required when mediaType is videoFile";
                          }
                          return true;
                        }),
                    },
                    {
                      name: "videoUrl",
                      title: "Video URL (YouTube/Vimeo)",
                      type: "url",
                      hidden: ({ parent }) => (parent as any)?.mediaType !== "videoUrl",
                      validation: (rule) =>
                        rule.custom((value, context) => {
                          const mediaType = (context.parent as any)?.mediaType;
                          const urlValue = (context.parent as any)?.videoUrl as string | undefined;
                          if (mediaType === "videoUrl" && !value) {
                            return "URL is required when mediaType is videoUrl";
                          }
                          if (mediaType === "videoUrl" && urlValue) {
                            const val = String(urlValue);
                            const validDomains = ["youtube.com", "youtu.be", "vimeo.com"];
                            const isValid = validDomains.some((domain) => val.includes(domain));
                            if (!isValid) {
                              return "URL must be from YouTube or Vimeo";
                            }
                          }
                          return true;
                        }),
                    },
                    {
                      name: "posterImage",
                      title: "Poster Image (Optional)",
                      type: "image",
                      options: {
                        hotspot: true,
                      },
                      hidden: ({ parent }) =>
                        !["videoFile", "videoUrl"].includes(
                          (parent as any)?.mediaType,
                        ),
                    },
                    {
                      name: "caption",
                      title: "Caption / Alt Text (Optional)",
                      type: "string",
                      hidden: ({ parent }) =>
                        !["videoFile", "videoUrl"].includes(
                          (parent as any)?.mediaType,
                        ),
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
