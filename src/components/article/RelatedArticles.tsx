import Link from "next/link";
import { ArrowLeft, ArrowRight } from "../Icons";

type Article = {
  title: string;
  image: string;
  url: string;
};

const RelatedArticles = ({ articles: [article] }: { articles: Article[] }) => {
  return (
    <div>
      <div className="mb-4 flex justify-end gap-4 stroke-neutral-900">
        <ArrowLeft />
        <ArrowRight />
      </div>
      <div className="flex flex-col gap-4 bg-neutral-50 px-6 py-7">
        <span className="text-2xl font-bold">Recommended reading</span>
        <Link className="flex items-center gap-6" href={article.url}>
          {!!article.image && (
            <img className="w-[210px] basis-2/6" src={article.image} />
          )}
          <span className="text-2xl">{article.title}</span>
        </Link>
      </div>
    </div>
  );
};

export { RelatedArticles };
