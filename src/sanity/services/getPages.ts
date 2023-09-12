import { groq } from 'next-sanity';

import type { SanityClient } from '../client';
import type { SanityPage, SanityPageType } from '../types/documents';

const getPagesQuery = groq`
  *[_type == "page" && type == $type] {
    _id,
    _type,
    type,
    slug
  }
`;

const getPages = async (
  client: SanityClient,
  type: SanityPageType
): Promise<SanityPage[]> =>
  client.fetch<SanityPage[]>(getPagesQuery, {
    type,
  });

export default getPages;
