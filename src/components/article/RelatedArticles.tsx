import { ArrowLeft, ArrowRight } from "../Icons";
import image from "@/assets/blog-img.svg";

type Article = {
  title: string;
  image: string;
};

const RelatedArticles = ({ articles }: { articles: Article[] }) => {
  return (
    <div>
      <div className="mb-4 flex justify-end gap-4 stroke-neutral-900">
        <ArrowLeft />
        <ArrowRight />
      </div>
      <div className="flex flex-col gap-4 bg-neutral-50 px-6 py-7">
        <span className="text-2xl font-bold">Recommended reading</span>
        <div className="flex items-center gap-6">
          <img className="basis-2/6" src={image.src} />
          <span className="text-2xl">A story of a freshman in Sydney</span>
        </div>
      </div>
    </div>
  );
};

export { RelatedArticles };
