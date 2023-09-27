import { PortableTextBlock } from "@portabletext/types";

import { SanityGradient, SanityImage, SanityLink } from "./documents";

export const existingBlockStyles = {
  normal: "Normal",
  h1: "H1",
  h2: "H2",
  h3: "H3",
  h4: "H4",
  h5: "H5",
  h6: "H6",
  blockquote: "Quote",
};

export type Attachment = "image";
export type BlockStyle = keyof typeof existingBlockStyles;
export type ListItemType = "bullet" | "number";

export type SanityKeyValueType =
  | "string"
  | "number"
  | "richtext"
  | "image"
  | "gradient";
export type SanityKeyValueTypes =
  | string
  | number
  | SanityRichtext
  | SanityImage
  | SanityGradient
  | null;

export type SanityButtonVariant = "primary";

export type SanityRichtext = PortableTextBlock[];

export type SanityKeyValue = {
  type: SanityKeyValueType;
  key: string;
  stringValue?: string;
  numberValue?: number;
  richtextValue?: SanityRichtext;
  imageValue?: SanityImage | null;
};

export type SanityPageMeta = {
  title: string;
  description?: string;
  canonicalUrl?: string;
  image?: SanityImage | null;
};

export type SanityButton = {
  title: string;
  variant: SanityButtonVariant;
  link?: SanityLink;
  icon?: SanityImage | null;
  alignment?: "left" | "right";
  size?: "medium";
};

export type SanityMeasurementBreakpoint = {
  size: "xs" | "sm" | "md" | "lg" | "xl";
  top?: string;
  bottom?: string;
};
export type SanityMeasurements = {
  breakpoints?: SanityMeasurementBreakpoint[];
};

export type SanitySectionItem = {
  title: string;
  image?: SanityImage | null;
  content?: SanityRichtext;
};

export type SanityFormInput = {
  type: "email" | "tel" | "text" | "textarea";
  title?: string;
  placeholder?: string;
  required?: boolean;
};
