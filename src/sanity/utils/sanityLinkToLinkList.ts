import { LinkList } from '@/components/Navbar';
import {
  SanityArticle,
  SanityLink,
  SanityPage,
} from '@/sanity/types/documents';

type Prefixes = {
  [type: string]: string;
};
type Options = {
  currentPath?: string;
  prefixes?: Prefixes;
};

const getReferenceUrl = (
  reference?: SanityArticle | SanityPage | null,
  prefixes: Prefixes = {}
): string => {
  switch (reference?._type) {
    case 'article':
      return `${prefixes.article ?? ''}${
        (reference as SanityArticle)?.slug?.current ?? ''
      }`;
    case 'page':
      return (reference as SanityPage)?.slug?.current ?? '/';
    default:
      return '';
  }
};

const sanityLinkToLinkList = (
  { reference, title, type, url: linkUrl }: SanityLink,
  options?: Options
): LinkList => {
  const url =
    (type === 'url'
      ? linkUrl
      : getReferenceUrl(reference, options?.prefixes)) ?? '';
  return {
    name: title,
    url,
    currentPage: options?.currentPath?.startsWith(url) ?? false,
  };
};

export default sanityLinkToLinkList;
