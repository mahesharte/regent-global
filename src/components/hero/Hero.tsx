import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type Props = {
  children?: ReactNode;
  heading: string;
  className?: string;
  imageUrl?: string;
};

const Hero = forwardRef<HTMLDivElement, Props>(
  ({ children, heading, className, imageUrl }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "relative flex items-center px-9 py-24 text-white md:px-16 md:py-36 lg:aspect-[2.5/1]",
          className,
        )}
      >
        {imageUrl && (
          <img
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            src={imageUrl}
          />
        )}
        <div className="container mx-auto">
          <h1 className="text-4xl font-black md:text-7xl lg:w-3/4">
            {heading}
          </h1>
        </div>
        {children}
      </div>
    );
  },
);
Hero.displayName = "Hero";

export { Hero };
