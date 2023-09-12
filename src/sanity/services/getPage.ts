import { groq } from 'next-sanity';

import type { SanityClient } from '../client';
import type { SanityPage } from '../types/documents';

const pageFields = `
  _id,
  _type,
  title,
  type,
  slug,
  sections[]->,
  pageMeta {
    ...,
    image-> {
      ...,
      asset->
    }
  }
`;

export const getPageByIdQuery = groq`
  *[_type == "page" && _id == $id][0] {
    ${pageFields}
  }
`;

export const getPageBySlugQuery = groq`
  *[_type == "page" && type == "basic" && slug.current == $slug][0] {
    ${pageFields}
  }
`;

export const getPageByTypeQuery = groq`
  *[_type == "page" && type == $type][0] {
    ${pageFields}
  }
`;

const queryBy = {
  id: getPageByIdQuery,
  slug: getPageBySlugQuery,
  type: getPageByTypeQuery,
};

const getPage = async (
  client: SanityClient,
  query: string,
  by: 'id' | 'slug' | 'type' = 'slug'
): Promise<SanityPage | null> =>
  client.fetch<SanityPage | null>(queryBy[by], {
    [by]: query,
  });

export default getPage;
