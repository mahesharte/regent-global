import { createClient } from 'next-sanity';
import type { NextApiRequest, NextApiResponse } from 'next';

import getSecret from '@/sanity/utils/getSecret';
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
  readToken,
  useCdn,
} from '@/sanity/config';

const redirectToPreview = (
  res: NextApiResponse<string>,
  Location: string
): void => {
  // Enable Draft Mode by setting the cookies
  res.setDraftMode({ enable: true });
  res.writeHead(307, { Location });
  res.end();
};

const _client = createClient({ projectId, dataset, apiVersion, useCdn });

const preview = async (
  req: NextApiRequest,
  res: NextApiResponse<string>
): Promise<void> => {
  if (!req.query.secret) {
    return res.status(401).send('Invalid secret');
  }
  const token = readToken;
  if (!token) {
    throw new Error(
      'A secret is provided but there is no `NEXT_PUBLIC_SANITY_API_READ_TOKEN` environment variable setup.'
    );
  }
  const client = _client.withConfig({ useCdn: false, token });
  const secret = await getSecret(client, previewSecretId);
  if (req.query.secret !== secret) {
    return res.status(401).send('Invalid secret');
  }
  const href = req.query.href as string;

  if (!href) {
    return res
      .status(400)
      .send(
        'Unable to resolve preview URL based on the current document type and slug'
      );
  }
  return redirectToPreview(res, href);
};

export default preview;
