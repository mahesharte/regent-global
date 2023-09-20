import { type FC, useEffect } from "react";
import { useLiveQuery } from "next-sanity/preview";

import { useAppContext } from "@/components/app/context";
import { getArticleByIdQuery } from "@/sanity/services/getArticle";
import { SanityArticle, SanitySetting } from "@/sanity/types/documents";
import type { ArticleProps } from "./types";
import Article from "./Article";

const Preview: FC<ArticleProps> = ({ article: initialArticle }) => {
  const [, setState] = useAppContext();
  const [article, loading] = useLiveQuery<SanityArticle | null>(
    initialArticle,
    getArticleByIdQuery,
    {
      id: initialArticle._id,
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

  return <Article article={article ?? initialArticle} />;
};

export default Preview;
