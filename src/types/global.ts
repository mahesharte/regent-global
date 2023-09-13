import { SanitySetting } from '@/sanity/types/documents';

export type GlobalPageProps = {
  preview?: string | null;
  setting?: SanitySetting | null;
};
