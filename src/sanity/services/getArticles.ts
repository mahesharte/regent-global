import { groq } from "next-sanity";

import type { SanityClient } from "../client";
import type { SanityArticle } from "../types/documents";

const getArticlesQuery = groq`
  *[_type == "article" && datePublished != null] {
    _id,
    _type,
    slug
  }
`;

const getArticlesWithTagsQuery = groq`
  *[_type == "article" && datePublished != null] {
    _id,
    _type,
    title,
    slug,
    featuredImage {
      ...,
      asset->
    },
    excerpt,
    tags[]-> {
      _id,
      title,
      slug
    },
    datePublished
  }
`;

const getArticles = async (client: SanityClient): Promise<SanityArticle[]> =>
  client.fetch<SanityArticle[]>(getArticlesQuery);

export const getArticlesWithTags = async (
  client: SanityClient,
): Promise<SanityArticle[]> =>
  client.fetch<SanityArticle[]>(getArticlesWithTagsQuery);

export default getArticles;
