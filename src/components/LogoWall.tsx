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
        className={clsx(
          "px-8 py-10 text-center text-white md:px-24 md:pb-28 md:pt-20",
          className,
        )}
        ref={ref}
      >
        <h2 className="pb-16 text-4xl font-black md:text-5xl">{headline}</h2>
        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4">
          {items.map((item, i) => (
            <li
              key={i}
              className="mb-4 basis-[calc(50%-16px)] lg:basis-[calc(25%-16px)]"
            >
              <img alt={item.text} src={item.imageUrl} />
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
LogoWall.displayName = "LogoWall";

export { LogoWall };
