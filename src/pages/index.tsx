import type { GetStaticProps } from 'next';
import type { FC } from 'react';

import type { SanityPage } from '@/sanity/types/documents';
import Page from '@/components/page/Root';
import { getClient } from '@/sanity/client';
import { writeToken } from '@/sanity/config';
import getPage from '@/sanity/services/getPage';
import { GlobalPageProps } from '@/types/global';

export type HomeProps = GlobalPageProps & {
  page: SanityPage | null;
};

const Home: FC<HomeProps> = ({ page }) => {
  if (!page) {
    return <>Please publish a homepage</>;
  }
  return <Page page={page} />;
};

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const { draftMode = false } = context;
  const preview = draftMode ? writeToken : null;
  const client = getClient(preview);
  const page = await getPage(client, 'home', 'type');
  return {
    props: {
      page,
      preview,
    },
    // Revalidate in 10 seconds
    revalidate: 10,
  };
};

export default Home;
