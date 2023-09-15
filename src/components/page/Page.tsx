import type { FC } from 'react';

import Sections from '@/components/sections/Sections';
import { PageProps } from './types';

const Page: FC<PageProps> = ({ page }) => (
  <Sections sections={page.sections ?? []} />
);

export default Page;
