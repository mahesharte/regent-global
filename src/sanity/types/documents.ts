import type { SanityDocument } from "next-sanity";
import type { ImageAsset, Slug } from "sanity";
import type { ColorValue } from "@sanity/color-input";

import type {
  SanityButton,
  SanityFormInput,
  SanityMeasurements,
  SanityPageMeta,
  SanityRichtext,
  SanitySectionItem,
} from "./objects";

export type HorizontalAlignment = "left" | "center" | "right";
export type VerticalAlignment = "top" | "center" | "bottom";

export type SanitySectionComponent =
  | "articles"
  | "bigNumbers"
  | "contact"
  | "contentBlock"
  | "hero"
  | "logoWall"
  | "multiColumn"
  | "team";
export type SanityPageType = "basic" | "error";

export type SanityPersonGroup = "author" | "team";

export type SanityImage = {
  asset: ImageAsset | null;
};

export type SanityPerson = SanityDocument & {
  name: string;
  photo?: SanityImage | null;
  title?: string;
  description?: string;
  groups?: SanityPersonGroup[];
};

export type SanityArticleTag = SanityDocument & {
  title: string;
  slug: Slug;
};

export type SanityArticle = SanityDocument & {
  title: string;
  slug: Slug;
  featuredImage?: SanityImage | null;
  introduction?: SanityRichtext;
  content: SanityRichtext;
  excerpt?: string;
  author: SanityPerson;
  tags?: SanityArticleTag[];
  relatedArticles?: SanityArticle[];
  datePublished?: string;
  pageMeta: SanityPageMeta;
};

export type SanityLink = SanityDocument & {
  type: "reference" | "url";
  title: "string";
  reference?: SanityArticle | SanityPage | null;
  url?: string;
  target: "_blank" | "_self";
  image?: SanityImage | null;
};

export type SanityGradient = SanityDocument & {
  title: string;
  colors: ColorValue[];
};

export type SanitySection = SanityDocument & {
  component: SanitySectionComponent;
  variant?: string;
  title?: string;
  subtitle?: string;
  content?: SanityRichtext;
  image?: SanityImage | null;
  buttons?: SanityButton[];
  links?: SanityLink[];
  items?: SanitySectionItem[];
  people?: SanityPerson[];
  form?: SanityForm | null;
  styleAlignment?: HorizontalAlignment;
  styleVerticalAlignment?: VerticalAlignment;
  styleMargin?: SanityMeasurements;
  stylePadding?: SanityMeasurements;
  styleGradient?: SanityGradient | null;
  fullSizeToggle?: boolean;
};

export type SanityPage = SanityDocument & {
  title: string;
  type: SanityPageType;
  status: "200" | "404" | "500";
  slug: Slug;
  sections?: SanitySection[];
  pageMeta: SanityPageMeta;
};

export type SanityHeader = SanityDocument & {
  links?: SanityLink[];
};

export type SanityFooter = SanityDocument & {
  links?: SanityLink[];
  form?: SanityForm;
  copyrightText?: SanityRichtext;
};

export type SanitySetting = SanityDocument & {
  articlesHome?: SanityPage | null;
  servicesGtmId?: string;
  themeGlobalGradient?: SanityGradient | null;
};

export type SanityForm = SanityDocument & {
  action: "contact" | "subscribe";
  title: string;
  content?: SanityRichtext;
  inputs: SanityFormInput[];
  cta: string;
};
