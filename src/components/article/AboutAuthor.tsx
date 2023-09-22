import { Avatar } from "../Avatar";

const AboutAuthor = ({
  text,
  author,
  authorImage,
}: {
  text: string;
  author?: string;
  authorImage?: string;
}) => {
  return (
    <div className="flex flex-col gap-10 bg-gradient-to-r  from-blue to-red px-12 py-14 text-center text-white">
      <span className="text-3xl font-black">About the author</span>
      {!!authorImage && <Avatar image={authorImage} name={author} />}
      {!!text && <p>{text}</p>}
    </div>
  );
};

export { AboutAuthor };
