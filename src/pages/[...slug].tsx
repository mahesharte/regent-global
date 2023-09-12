import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import isArray from 'lodash/isArray';

import type {
  SanityArticle,
  SanityPage,
  SanitySetting,
} from '@/sanity/types/documents';
import Article from '@/components/article/Article';
import Page from '@/components/page/Page';
import { getClient } from '@/sanity/client';
import getArticle from '@/sanity/services/getArticle';
import getArticles from '@/sanity/services/getArticles';
import getPage from '@/sanity/services/getPage';
import getPages from '@/sanity/services/getPages';
import getSetting from '@/sanity/services/getSetting';
import getSettingValue from '@/sanity/utils/getSettingValue';

export type CatchAllProps = {
  document: SanityArticle | SanityPage | null;
};

const CatchAll: FC<CatchAllProps> = ({ document }) => {
  switch (document?._type) {
    case 'article':
      return <Article article={document as SanityArticle} />;
    case 'page':
      return <Page page={document as SanityPage} />;
    default:
      return <></>;
  }
};

const getArticleSlugPrefix = (setting: SanitySetting): string =>
  getSettingValue<string>(setting, 'articleSlugPrefix', '/');

export const getStaticProps: GetStaticProps<CatchAllProps> = async (
  context
) => {
  const { params = {} } = context;
  const client = getClient();
  const slug = `/${isArray(params.slug) ? params.slug.join('/') : params.slug}`;
  const setting = await getSetting(client);
  const articleSlugPrefix = getArticleSlugPrefix(setting);
  let document: CatchAllProps['document'] = await getPage(client, slug);
  if (!document && slug.startsWith(articleSlugPrefix)) {
    document = await getArticle(
      client,
      slug.substring(articleSlugPrefix.length)
    );
  }
  if (!document) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      document,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const setting = await getSetting(client);
  const pages = await getPages(client, 'basic');
  const articles = await getArticles(client);
  const articleSlugPrefix = getArticleSlugPrefix(setting);
  return {
    paths: [
      ...pages.map((page) => page.slug.current),
      ...articles.map(
        (article) => `${articleSlugPrefix}${article.slug.current}`
      ),
    ],
    fallback: false,
  };
};

export default CatchAll;
