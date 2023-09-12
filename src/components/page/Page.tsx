import type { FC } from 'react';
import type { SanityPage } from '@/sanity/types/documents';

type PageProps = {
  page: SanityPage;
};
const Page: FC<PageProps> = ({ page }) => (
  <main className="p-4">
    <h1 className="mb-4">{page?.title}</h1>
    <pre className="text-xs  whitespace-pre-wrap">
      {JSON.stringify(page, null, 2)}
    </pre>
  </main>
);

export default Page;
