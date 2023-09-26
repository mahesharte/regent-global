import { forwardRef, type ReactNode } from "react";

import { Cta } from "./ui/button";
import { cn } from "@/lib/utils";

type Column = {
  image?: string;
  heading: string;
  body?: ReactNode;
};

type TwoColumnsProps = {
  className?: string;
  columns: Column[];
};

const TwoColumns = forwardRef<HTMLDivElement, TwoColumnsProps>(
  ({ className, columns }, ref) => {
    return (
      <div
        className={cn(
          "container mx-auto flex flex-col md:flex-row md:gap-10 lg:gap-14",
          className,
        )}
        ref={ref}
      >
        {columns.map((column, i) => (
          <div key={i}>
            <img
              className="aspect-[4/3] w-full object-cover"
              src={column.image}
            />
            <div className="mt-6 max-md:mb-2 max-md:px-4 md:mt-10 lg:mt-14">
              <h3 className="pb-8 text-3xl font-black text-blue lg:text-5xl">
                {column.heading}
              </h3>
              {column.body && (
                <div className="text-lg [&>p]:pb-8">{column.body}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  },
);
TwoColumns.displayName = "TwoColumns";

export { TwoColumns };
