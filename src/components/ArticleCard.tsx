type Tag = {
  title: string;
};

const Tag = ({ title }: { title: string }) => (
  <div className="inline rounded-sm bg-red p-1 text-xs font-medium uppercase leading-none text-white">
    {title}
  </div>
);

const ArticleCard = ({
  image,
  title,
  tags,
}: {
  image: string;
  title: string;
  tags?: Tag[];
}) => {
  return (
    <div className="flex flex-col bg-neutral-100">
      <div>
        <img className="aspect-video w-full object-cover" src={image} alt="" />
      </div>
      <div className="mb-4 mt-6 flex h-5 justify-center gap-3 tracking-wide">
        {tags && tags.map((tag, i) => <Tag key={i} title={tag.title} />)}
      </div>
      <div className="mb-12 text-center text-2xl">{title}</div>
    </div>
  );
};

export { ArticleCard };
