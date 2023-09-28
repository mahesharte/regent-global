import { forwardRef } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Theme } from "@/sanity/types/documents";

type Logo = {
  imageUrl: string;
  text: string;
  href?: string;
  target?: string;
};
type Props = {
  className?: string;
  headline: string;
  items: Logo[];
  theme?: Theme;
};

const LogoWall = forwardRef<HTMLDivElement, Props>(
  ({ className, headline, items, theme }, ref) => {
    return (
      <div
        className={clsx(
          "px-8 py-10 text-center text-white md:px-24 md:pb-28 md:pt-20",
          theme === "light" ? "text-black" : "text-white",
          className,
        )}
        ref={ref}
      >
        <h2
          className={clsx(
            "pb-16 text-4xl font-black md:text-5xl",
            theme === "light" ? "text-blue" : "text-white",
          )}
        >
          {headline}
        </h2>
        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4">
          {items.map((item, i) => (
            <li
              key={i}
              className="mb-4 basis-[calc(50%-16px)] lg:basis-[calc(25%-16px)]"
            >
              {!!item.href ? (
                <Link href={item.href} target={item.target}>
                  <img alt={item.text} src={item.imageUrl} />
                </Link>
              ) : (
                <img alt={item.text} src={item.imageUrl} />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
LogoWall.displayName = "LogoWall";

export { LogoWall };
