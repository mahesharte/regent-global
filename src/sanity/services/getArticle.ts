import { groq } from 'next-sanity';

import type { SanityClient } from '../client';
import type { SanityArticle } from '../types/documents';

const articleFields = `
  _id,
  _type,
  title,
  slug,
  featuredImage-> {
    ...,
    asset->
  },
  introduction,
  content,
  excerpt,
  author-> {
    ...,
    photo-> {
      ...,
      asset->
    }
  },
  tags[]->,
  relatedArticles[]-> {
    _id,
    title,
    slug,
    featuredImage-> {
      ...,
      asset->
    },
    excerpt,
    tags[]->
  },
  pageMeta {
    ...,
    image-> {
      ...,
      asset->
    }
  }
`;

export const getArticleByIdQuery = groq`
  *[_type == "article" && _id == $id][0] {
    ${articleFields}
  }
`;

export const getArticleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleFields}
  }
`;

const queryBy = {
  id: getArticleByIdQuery,
  slug: getArticleBySlugQuery,
};

const getArticle = async (
  client: SanityClient,
  query: string,
  by: 'id' | 'slug' = 'slug'
): Promise<SanityArticle | null> =>
  client.fetch<SanityArticle | null>(queryBy[by], {
    [by]: query,
  });

export default getArticle;
