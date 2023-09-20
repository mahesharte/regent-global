import { CSSProperties, ReactNode } from 'react';

type Logo = {
  imageUrl: string;
  text: string;
};

const LogoWall = ({
  headline,
  items,
  style,
}: {
  headline: string;
  items: Logo[];
  style: CSSProperties;
}) => {
  return (
    <div className="text-center text-white px-24" style={style}>
      <h2 className="text-5xl pb-16">{headline}</h2>
      <ul className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <li key={i} className="mb-4 w-44">
            <img alt={item.text} src={item.imageUrl} className="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { LogoWall };
