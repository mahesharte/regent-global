import { forwardRef } from "react";
import clsx from "clsx";

type Logo = {
  imageUrl: string;
  text: string;
};
type Props = {
  className?: string;
  headline: string;
  items: Logo[];
};

const LogoWall = forwardRef<HTMLDivElement, Props>(
  ({ className, headline, items }, ref) => {
    return (
      <div
        className={clsx("px-24 text-center text-white", className)}
        ref={ref}
      >
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
  },
);
LogoWall.displayName = "LogoWall";

export { LogoWall };
