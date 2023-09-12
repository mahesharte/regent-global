import { groq } from 'next-sanity';

import type { SanityClient } from '../client';
import type { SanityArticle } from '../types/documents';

const getArticlesQuery = groq`
  *[_type == "article"] {
    _id,
    _type,
    slug
  }
`;

const getArticles = async (client: SanityClient): Promise<SanityArticle[]> =>
  client.fetch<SanityArticle[]>(getArticlesQuery);

export default getArticles;
