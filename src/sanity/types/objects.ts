import { PortableTextBlock } from "@portabletext/types";

import { SanityGradient, SanityImage, SanityLink } from "./documents";

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
