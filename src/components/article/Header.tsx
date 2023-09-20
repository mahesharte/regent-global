import { Avatar } from "../Avatar";
import { BigText } from "../bigtext";

const Header = ({
  title,
  author,
  authorImage,
}: {
  title: string;
  author?: string;
  authorImage?: string;
}) => {
  return (
    <BigText heading={title}>
      {author && authorImage && (
        <Avatar className="mt-10" image={authorImage} name={author} />
      )}
    </BigText>
  );
};

export { Header };
