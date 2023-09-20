import type { SanityDocument } from 'next-sanity';
import type { ImageAsset, Slug } from 'sanity';
import type { ColorValue } from '@sanity/color-input';

import type {
  SanityButton,
  SanityKeyValue,
  SanityPadding,
  SanityPageMeta,
  SanityRichtext,
  SanitySectionItem,
} from './objects';

export type SanitySectionComponent =
  | 'bigNumbers'
  | 'contentBlock'
  | 'hero'
  | 'logoWall'
  | 'multiColumn';
export type SanityPageType = 'basic' | 'home' | 'notFound';

export type SanityImage = {
  asset: ImageAsset | null;
};

export type SanityPerson = SanityDocument & {
  name: string;
  photo?: SanityImage | null;
  description?: string;
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
  pageMeta: SanityPageMeta;
};

export type SanityLink = SanityDocument & {
  type: 'reference' | 'url';
  title: 'string';
  reference?: SanityArticle | SanityPage | null;
  url?: string;
  target: '_blank' | '_self';
  image?: SanityImage | null;
};

export type SanityGradient = SanityDocument & {
  title: string;
  colors: ColorValue[];
};

export type SanitySection = SanityDocument & {
  component: SanitySectionComponent;
  title?: string;
  subtitle?: string;
  content?: SanityRichtext;
  image?: SanityImage | null;
  buttons?: SanityButton[];
  links?: SanityLink[];
  items?: SanitySectionItem[];
  styleAlignment?: 'left' | 'center' | 'right';
  stylePadding?: SanityPadding;
  styleGradient?: SanityGradient | null;
};

export type SanityPage = SanityDocument & {
  title: string;
  type: SanityPageType;
  slug: Slug;
  sections?: SanitySection[];
  pageMeta: SanityPageMeta;
};

export type SanityHeader = SanityDocument & {
  links?: SanityLink[];
};

export type SanityFooter = SanityDocument & {
  links?: SanityLink[];
};

export type SanitySetting = SanityDocument & {
  variables: SanityKeyValue[];
};
