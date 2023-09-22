import type { SanityClient } from "../client";
import type { SanityPerson, SanityPersonGroup } from "../types/documents";

const getPeople = async (
  client: SanityClient,
  groups: SanityPersonGroup[] = [],
): Promise<SanityPerson[]> =>
  client.fetch<SanityPerson[]>(`
  *[_type == "person" && ${`(${groups
    .map((group) => `("${group}" in groups)`)
    .join(" or ")})`}] {
    _id,
    _type,
    name,
    photo {
      ...,
      asset->
    },
    title,
    description,
    groups[]
  }
`);

export default getPeople;
