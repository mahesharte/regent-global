import type { Image } from 'sanity';
import { PortableTextBlock } from '@portabletext/types';

export type SanityKeyValueType = 'string' | 'number' | 'richtext' | 'image';
export type SanityKeyValueTypes =
  | string
  | number
  | SanityRichtext
  | Image
  | null;

export type SanityRichtext = PortableTextBlock;

export type SanityKeyValue = {
  type: SanityKeyValueType;
  key: string;
  stringValue?: string;
  numberValue?: number;
  richtextValue?: SanityRichtext;
  imageValue?: Image | null;
};

export type SanityPageMeta = {
  title: string;
  description?: string;
  canonicalUrl?: string;
  image?: Image | null;
};
