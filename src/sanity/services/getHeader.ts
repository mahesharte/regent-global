import { groq } from 'next-sanity';
import type { SanityClient } from '../client';
import type { SanityHeader } from '../types/documents';

const getHeaderQuery = groq`
  *[_type == "header"][0] {
    links[]-> {
      title,
      url,
      type,
      reference->{ _type, slug },
      children[]-> {
        title,
        url,
        type,
        reference->{ _type, slug }
      }
    }
  }
`;

const getHeader = async (client: SanityClient): Promise<SanityHeader> =>
  client.fetch<SanityHeader>(getHeaderQuery);

export default getHeader;

