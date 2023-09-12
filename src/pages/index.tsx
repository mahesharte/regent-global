import type { GetStaticProps } from 'next';
import type { FC } from 'react';

import type { SanityPage } from '@/sanity/types/documents';
import Page from '@/components/page/Page';
import { getClient } from '@/sanity/client';
import getPage from '@/sanity/services/getPage';

export type HomeProps = {
  page: SanityPage | null;
};

const Home: FC<HomeProps> = ({ page }) => {
  if (!page) {
    return <>Please publish a homepage</>;
  }
  return <Page page={page} />;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const client = getClient();
  const page = await getPage(client, 'home', 'type');
  return {
    props: {
      page,
    },
  };
};

export default Home;
