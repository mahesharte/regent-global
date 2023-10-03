import { ReactNode, forwardRef } from "react";
import clsx from "clsx";
import { Theme } from "@/sanity/types/documents";
import { cn } from "@/lib/utils";

type Column = {
  icon?: ReactNode;
  headline: string;
  body: ReactNode;
};
export type Props = {
  className?: string;
  columns: Column[];
  theme?: Theme;
};

const basis = [
  "",
  "md:basis-1/2",
  "md:basis-1/3",
  "md:basis-1/4",
  "md:basis-1/5",
  "md:basis-1/6",
  "md:basis-1/7",
  "md:basis-1/8",
  "md:basis-1/9",
  "md:basis-1/10",
  "md:basis-1/11",
  "md:basis-1/12",
];

const FourColumns = forwardRef<HTMLDivElement, Props>(
  ({ className, columns, theme }, ref) => {
    return (
      <div
        className={clsx(
          "pb-10 pt-8 lg:px-24 lg:pb-28 lg:pt-20",
          theme === "light" ? "text-black" : "text-white",
          className,
        )}
        ref={ref}
      >
        <div className="container mx-auto flex flex-col gap-4 px-4 lg:flex-row">
          {columns.map((column, i) => (
            <div
              className={cn("basis-full", basis[columns.length - 1])}
              key={i}
            >
              <div className="flex items-center gap-2 pb-2 lg:gap-4 lg:pb-6">
                {!!column.icon && <span>{column.icon}</span>}
                <h3
                  className={clsx(
                    "text-xl font-bold lg:text-2xl",
                    theme === "light" ? "text-blue" : "text-white",
                  )}
                >
                  {column.headline}
                </h3>
              </div>
              <div className="text-sm">{column.body}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
FourColumns.displayName = "FourColumns";

export { FourColumns };
