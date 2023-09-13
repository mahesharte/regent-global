import { type FC, useEffect } from 'react';
import { useLiveQuery } from 'next-sanity/preview';

import { useAppContext } from '@/components/app/context';
import { getPageByIdQuery } from '@/sanity/services/getPage';
import { SanityPage } from '@/sanity/types/documents';
import type { PageProps } from './types';
import Page from './Page';

const Preview: FC<PageProps> = ({ page: initialPage }) => {
  const [, setState] = useAppContext();
  const [page, loading] = useLiveQuery<SanityPage | null>(
    initialPage,
    getPageByIdQuery,
    {
      id: initialPage._id,
    }
  );

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      preview: {
        ...prev.preview,
        loading,
      },
    }));
  }, [loading, setState]);

  return <Page page={page ?? initialPage} />;
};

export default Preview;
