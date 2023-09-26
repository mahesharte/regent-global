import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type Column = {
  icon: ReactNode;
  headline: string;
  body: ReactNode;
};
type Props = {
  className?: string;
  columns: Column[];
};

const FourColumns = forwardRef<HTMLDivElement, Props>(
  ({ className, columns }, ref) => {
    return (
      <div
        className={clsx(
          "pb-10 pt-8 text-white lg:px-24 lg:pb-28 lg:pt-20",
          className,
        )}
        ref={ref}
      >
        <div className="container mx-auto flex flex-col gap-4 lg:flex-row">
          {columns.map((column, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 pb-2 lg:gap-4 lg:pb-6">
                <span>{column.icon}</span>
                <h3 className="text-xl font-bold lg:text-2xl">
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
