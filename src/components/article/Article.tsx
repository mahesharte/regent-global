import type { FC } from 'react';
import type { SanityArticle } from '@/sanity/types/documents';
import { PortableText } from '@portabletext/react';
import omit from 'lodash/omit';

type ArticleProps = {
  article: SanityArticle;
};
const Article: FC<ArticleProps> = ({ article }) => (
  <main className="p-4">
    <h1 className="mb-4">{article?.title}</h1>
    {!!article.introduction && (
      <>
        <div className="[&>p]:mb-2 [&>h1]:mb-2 [&>h2]:mb-2 [&>h3]:mb-2 [&>h4]:mb-2 [&>h5]:mb-2 [&>h6]:mb-2">
          <PortableText value={article.introduction} />
        </div>
        <hr className="mt-4 mb-5" />
      </>
    )}
    <div className="[&>p]:mb-2 [&>h1]:mb-2 [&>h2]:mb-2 [&>h3]:mb-2 [&>h4]:mb-2 [&>h5]:mb-2 [&>h6]:mb-2">
      <PortableText value={article.content} />
    </div>
    <hr className="mt-4 mb-5" />
    <pre className="text-xs whitespace-pre-wrap">
      {JSON.stringify(omit(article, ['introduction', 'content']), null, 2)}
    </pre>
  </main>
);

export default Article;
