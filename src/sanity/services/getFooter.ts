import { groq } from "next-sanity";

import type { SanityClient } from "../client";
import type { SanityFooter } from "../types/documents";

const getFooterQuery = groq`
  *[_type == "footer"][0] {
    links[]->{
      ...,
      reference->
    },
    form->,
    socialLinks,
    socialIcons{
      facebook{asset->,crop,hotspot},
      instagram{asset->,crop,hotspot},
      tiktok{asset->,crop,hotspot},
      linkedin{asset->,crop,hotspot}
    },
    legalLinks,
    copyrightText
  }
`;


const getFooter = async (client: SanityClient): Promise<SanityFooter> =>
  client.fetch<SanityFooter>(getFooterQuery);

export default getFooter;
