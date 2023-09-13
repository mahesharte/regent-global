import type { FC } from 'react';

import { PageProps } from './types';

const Page: FC<PageProps> = ({ page }) => (
  <div className="p-4">
    <h1 className="mb-4">{page?.title}</h1>
    <pre className="text-xs  whitespace-pre-wrap">
      {JSON.stringify(page, null, 2)}
    </pre>
  </div>
);

export default Page;
