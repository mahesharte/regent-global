import { groq } from 'next-sanity';

import type { SanityClient } from '../client';
import type { SanitySetting } from '../types/documents';

const getSettingQuery = groq`
  *[_type == "setting"][0] {
    variables[]
  }
`;

const getSetting = async (client: SanityClient): Promise<SanitySetting> =>
  client.fetch<SanitySetting>(getSettingQuery);

export default getSetting;
