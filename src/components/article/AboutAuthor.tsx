import { Avatar } from "../Avatar";
import image from "@/assets/avatar.png";

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
    <div className="px-12 py-14 bg-gradient-to-r text-white  from-blue to-red text-center flex flex-col gap-10">
      <span className="font-black text-3xl">About the author</span>
      <Avatar image={image.src} name={author} />
      <p>{text}</p>
    </div>
  );
};

export { AboutAuthor };
