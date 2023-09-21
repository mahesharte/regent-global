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
      <div className={clsx("text-white", className)} ref={ref}>
        <div className="container mx-auto flex gap-4">
          {columns.map((column, i) => (
            <div key={i}>
              <div className="flex gap-4 pb-6">
                <span>{column.icon}</span>
                <h3 className="text-2xl font-bold">{column.headline}</h3>
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
