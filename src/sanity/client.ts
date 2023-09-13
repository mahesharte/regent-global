import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn, readToken } from './config';

export type SanityClient = ReturnType<typeof createClient>;

export const getClient = (previewToken?: string | null): SanityClient => {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token: readToken,
    perspective: 'published',
  });
  if (!previewToken) {
    return client;
  }
  return client.withConfig({
    token: previewToken,
    useCdn: false,
    ignoreBrowserTokenWarning: true,
    perspective: 'previewDrafts',
  });
};
