import type { FC } from "react";
import { PortableText } from "@portabletext/react";
import omit from "lodash/omit";

import { Header } from "./Header";
import { ArticleProps } from "./types";

const Article: FC<ArticleProps> = ({ article }) => {
  const { title, author } = article;
  return (
    <div>
      <Header
        title={title}
        author={author.name}
        authorImage={author.photo?.asset?.url ?? ""}
      />
    </div>
  );
};

export default Article;
