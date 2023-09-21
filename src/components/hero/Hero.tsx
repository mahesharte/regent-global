import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type Props = {
  children?: ReactNode;
  heading: string;
  subheading?: string;
  className?: string;
  imageUrl?: string;
};

const Hero = forwardRef<HTMLDivElement, Props>(
  ({ children, heading, subheading, className, imageUrl }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("relative px-14 py-28 text-white", className)}
      >
        {!!imageUrl && (
          <img
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            src={imageUrl}
          />
        )}
        {!!heading && <h1 className="text-hero">{heading}</h1>}
        {children}
      </div>
    );
  },
);
Hero.displayName = "Hero";

export { Hero };
