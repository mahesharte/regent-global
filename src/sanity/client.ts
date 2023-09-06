import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn, readToken } from './config';

export type SanityClient = ReturnType<typeof createClient>;

export const getClient = (preview?: { token?: string }): SanityClient => {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token: readToken,
    perspective: 'published',
  });
  if (!preview) {
    return client;
  }
  return client.withConfig({
    token: preview.token ?? readToken,
    useCdn: false,
    ignoreBrowserTokenWarning: true,
    perspective: 'previewDrafts',
  });
};
