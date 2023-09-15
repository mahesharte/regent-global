import { SanityDocument } from 'next-sanity';
import type { Image, Slug } from 'sanity';

import type { SanityKeyValue, SanityPageMeta, SanityRichtext } from './objects';

export type SanitySectionComponent = 'hero';
export type SanityPageType = 'basic' | 'home' | 'notFound';

export type SanityPerson = SanityDocument & {
  name: string;
  photo?: Image | null;
  description?: string;
};

export type SanityArticleTag = SanityDocument & {
  title: string;
  slug: Slug;
};

export type SanityArticle = SanityDocument & {
  title: string;
  slug: Slug;
  featuredImage?: Image | null;
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
  image?: Image | null;
};

export type SanitySection = SanityDocument & {
  component: SanitySectionComponent;
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
