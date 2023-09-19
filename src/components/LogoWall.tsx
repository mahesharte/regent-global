import { ReactNode } from 'react';

type Logo = {
  imageUrl: string;
  text: string;
};

const LogoWall = ({
  headline,
  items,
}: {
  headline: string;
  items: Logo[];
}) => {
  return (
    <div className="bg-gradient-to-r from-red to-blue text-center text-white pt-20 px-24 pb-28">
      <h2 className="text-5xl pb-16">{headline}</h2>
      <ul className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <li key={i} className="w-44 mb-4">
            <img alt={item.text} src={item.imageUrl} className="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { LogoWall };
