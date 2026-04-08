import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from 'next-sanity';
import { dataset, projectId, apiVersion, writeToken } from '@/sanity/config';

type ResponseData = {
  success?: boolean;
  pdfUrl?: string;
  message?: string;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getPdfUrl = async (
  pdfFileRef?: string,
  pdfExternalUrl?: string
): Promise<string | null> => {
  if (pdfExternalUrl) {
    return pdfExternalUrl;
  }

  if (pdfFileRef) {
    try {
      // Resolve Sanity asset URL from the reference
      // Asset references are in format: file-{id}-{format}
      const client = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
      });

      // Try to fetch the asset directly
      const asset = await client.fetch(
        `*[_id == $id][0]`,
        { id: pdfFileRef }
      ) as any;

      if (asset?.url) {
        return asset.url;
      }

      // If direct fetch fails, try building URL from Sanity CDN
      // Sanity file assets follow pattern: https://cdn.sanity.io/files/{projectId}/{dataset}/{id}-{originalName}
      if (pdfFileRef.startsWith('file-')) {
        // Parse file reference to get ID
        const fileId = pdfFileRef.replace('file-', '').split('-').slice(0, -1).join('-');
        return `https://cdn.sanity.io/files/${projectId}/${dataset}/${pdfFileRef}`;
      }
    } catch (error) {
      console.error('Error resolving Sanity asset:', error);
      // Try direct CDN URL as fallback
      if (pdfFileRef.startsWith('file-')) {
        return `https://cdn.sanity.io/files/${projectId}/${dataset}/${pdfFileRef}`;
      }
    }
  }

  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { organisationName, email, pageSlug, pdfLabel, pdfFileRef, pdfExternalUrl } =
      req.body;

    console.log('📥 PDF Gate Submission Request received:', {
      organisationName,
      email,
      pageSlug,
      pdfLabel,
      pdfFileRef,
      pdfExternalUrl,
    });

    // Validation
    if (!organisationName?.trim()) {
      return res.status(400).json({
        message: 'Organisation Name is required',
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        message: 'Email is required',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email address',
      });
    }

    if (!pageSlug?.trim()) {
      return res.status(400).json({
        message: 'Page slug is required',
      });
    }

    // Validate that at least one PDF source is provided
    if (!pdfFileRef && !pdfExternalUrl) {
      console.error('❌ Validation failed: No PDF source provided', {
        pdfFileRef,
        pdfExternalUrl,
      });
      return res.status(400).json({
        message: 'Either PDF file or external URL must be provided',
      });
    }

    // Get client IP address
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      '';

    // Write submission to Sanity
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token: writeToken,
      useCdn: false,
    });

    const submission = await writeClient.create({
      _type: 'pdfGateSubmission',
      organisationName: organisationName.trim(),
      email: email.trim(),
      pageSlug: pageSlug.trim(),
      pdfLabel: pdfLabel?.trim(),
      ipAddress,
      submittedAt: new Date().toISOString(),
    });

    if (!submission?._id) {
      throw new Error('Failed to create submission in Sanity');
    }

    // Resolve PDF URL
    const pdfUrl = await getPdfUrl(pdfFileRef, pdfExternalUrl);

    if (!pdfUrl) {
      return res.status(500).json({
        message: 'Could not resolve PDF URL',
      });
    }

    return res.status(200).json({
      success: true,
      pdfUrl,
    });
  } catch (error) {
    console.error('PDF Gate submission error:', error);
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
