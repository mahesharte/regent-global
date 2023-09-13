import type { FC } from 'react';

import Article from './Article';
import Preview from './Preview';
import { useAppContext } from '@/components/app/context';
import { ArticleProps } from './types';

const RootArticle: FC<ArticleProps> = ({ article }) => {
  const [{ preview }] = useAppContext();
  return preview.active ? (
    <Preview article={article} />
  ) : (
    <Article article={article} />
  );
};

export default RootArticle;
