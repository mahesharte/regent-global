import Link from "next/link";

type Tag = {
  title: string;
};

const Tag = ({ title }: { title: string }) => (
  <div className="inline-block rounded-sm bg-red p-1 text-xs font-medium uppercase leading-none text-white">
    {title}
  </div>
);

const ArticleCard = ({
  image,
  title,
  tags,
  url = "/",
}: {
  image: string;
  title: string;
  tags?: Tag[];
  url?: string;
}) => {
  return (
    <div className="flex flex-col bg-neutral-100">
      <div>
        <Link href={url}>
          <img
            className="aspect-video w-full object-cover"
            src={image}
            alt=""
          />
        </Link>
      </div>
      <div className="mb-4 mt-6 flex flex-wrap justify-center gap-3 px-4 tracking-wide">
        {tags && tags.map((tag, i) => <Tag key={i} title={tag.title} />)}
      </div>
      <div className="mb-12 text-center text-2xl px-4">
        <Link href={url}>{title}</Link>
      </div>
    </div>
  );
};

export { ArticleCard };
