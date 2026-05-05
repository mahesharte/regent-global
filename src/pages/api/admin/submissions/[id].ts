import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { createClient } from 'next-sanity';
import { authOptions } from '@/lib/auth';
import { apiVersion, dataset, projectId, writeToken } from '@/sanity/config';

type ResponseData = {
  success?: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid submission id' });
  }

  if (!writeToken) {
    return res.status(500).json({ message: 'Missing SANITY_API_WRITE_TOKEN' });
  }

  try {
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token: writeToken,
      useCdn: false,
    });

    await writeClient.delete(id);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting PDF gate submission:', error);
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
