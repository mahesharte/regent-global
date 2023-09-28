import { type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Theme } from "@/sanity/types/documents";

type NumberData = {
  imageUrl: string;
  number: string;
  subText: ReactNode;
};
type Props = {
  className?: string;
  headline: string;
  items: NumberData[];
  theme?: Theme;
};

const BigNumbers = forwardRef<HTMLDivElement, Props>(
  ({ className, headline, items, theme = "dark" }, ref) => {
    const textColor = theme === "light" ? "text-black" : "text-white";
    return (
      <div className="pb-10 pt-10 md:pb-28 md:pt-20">
        <div
          className={cn("container mx-auto text-center", className)}
          ref={ref}
        >
          <div className="">
            <h2 className={cn("pb-16 text-4xl md:text-5xl", textColor)}>
              {headline}
            </h2>
            <ul
              className={cn(
                "mx-auto flex max-w-6xl flex-col justify-between md:flex-row",
                textColor,
              )}
            >
              {items.map((item, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_24px_auto] grid-rows-2"
                >
                  <img
                    src={item.imageUrl}
                    className="col-span-1 row-span-1 self-center max-md:justify-self-end md:w-16 lg:w-20"
                  />
                  <span className="col-start-3 self-center py-4 text-5xl font-black max-md:justify-self-start lg:text-6xl">
                    {item.number}
                  </span>
                  <div className="col-start-3 row-start-2 row-end-3 flex flex-col">
                    <svg className="mb-4 mt-3 h-1 w-12">
                      <rect
                        className={cn(
                          "h-full w-full",
                          theme === "light" ? "fill-black" : "fill-white",
                        )}
                      />
                    </svg>
                    <span className="text-left text-sm">{item.subText}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  },
);
BigNumbers.displayName = "BigNumbers";

export { BigNumbers };
