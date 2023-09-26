import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type Props = {
  children?: ReactNode;
  heading: string;
  subheading?: string;
  className?: string;
};

const BigText = forwardRef<HTMLDivElement, Props>(
  ({ children, heading, subheading, className }, ref) => {
    return (
      <div
        className={clsx("px-14 text-center text-white", className)}
        ref={ref}
      >
        {subheading && <span className="text-xl uppercase">{subheading}</span>}
        <h1 className="text-4xl font-black md:text-7xl">{heading}</h1>
        {children}
      </div>
    );
  },
);
BigText.displayName = "BigText";

export { BigText };
