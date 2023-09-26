import { groq } from "next-sanity";

import type { SanityClient } from "../client";
import type { SanityFooter } from "../types/documents";

const getFooterQuery = groq`
  *[_type == "footer"][0] {
    links[]-> {
      ...,
      reference->
    },
    form->
  }
`;

const getFooter = async (client: SanityClient): Promise<SanityFooter> =>
  client.fetch<SanityFooter>(getFooterQuery);

export default getFooter;
