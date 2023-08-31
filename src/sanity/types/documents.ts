export type SanityPageType = 'basic' | 'home' | 'notFound' | 'product';

export type SanityPage = {
  _id: string;
  name: string;
  type: SanityPageType;
};
