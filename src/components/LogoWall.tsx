import { ReactNode } from "react";

type Logo = {
  imageUrl: string;
  text: string;
};

const LogoWall = ({ headline, items }: { headline: string; items: Logo[] }) => {
  return (
    <div className="bg-gradient-to-r from-red to-blue px-24 pb-28 pt-20 text-center text-white">
      <h2 className="pb-16 text-5xl">{headline}</h2>
      <ul className="mx-auto grid max-w-5xl grid-cols-4 gap-4">
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
