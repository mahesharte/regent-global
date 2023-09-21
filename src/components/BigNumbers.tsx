import { type ReactNode, forwardRef } from "react";
import clsx from "clsx";

type NumberData = {
  imageUrl: string;
  number: string;
  subText: ReactNode;
};
type Props = {
  className?: string;
  headline: string;
  items: NumberData[];
};

const BigNumbers = forwardRef<HTMLDivElement, Props>(
  ({ className, headline, items }, ref) => {
    return (
      <div
        className={clsx("px-24 text-center text-white", className)}
        ref={ref}
      >
        <div className="">
          <h2 className="pb-16 text-5xl">{headline}</h2>
          <ul className="mx-auto flex max-w-6xl justify-between">
            {items.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-[auto_32px_auto] grid-rows-2"
              >
                <img
                  src={item.imageUrl}
                  className="col-span-1 row-span-1 h-24 max-w-[96px] self-center"
                />
                <span className="col-start-3 self-center text-7xl font-black">
                  {item.number}
                </span>
                <div className="col-start-3 row-start-2 row-end-3 flex flex-col">
                  <svg className="mb-4 mt-3 h-1 w-12">
                    <rect className="h-full w-full fill-white" />
                  </svg>
                  <span className="text-left text-sm">{item.subText}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);
BigNumbers.displayName = "BigNumbers";

export { BigNumbers };
