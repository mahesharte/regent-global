import { ReactNode, forwardRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import { SanityImage, Theme } from "@/sanity/types/documents";

type Props = {
  children?: ReactNode;
  heading?: string;
  className?: string;
  image?: SanityImage;
  theme?: Theme;
};

const Hero = forwardRef<HTMLDivElement, Props>(
  ({ children, heading, className, image, theme }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "relative flex items-center px-9 py-24 md:px-16 md:py-36",
          theme === "light" ? "text-black" : "text-white",
          className,
        )}
      >
        {image?.asset?.url && (
          <Image
            className="-z-10"
            src={image?.asset?.url ?? ""}
            fill={true}
            objectFit="cover"
            alt={image?.asset?.title || ""}
          />
        )}
        {!!heading && (
          <div className="container mx-auto">
            <h1
              className={clsx(
                "text-4xl font-black md:text-7xl lg:w-3/4",
                theme === "light" ? "text-blue" : "text-white",
              )}
            >
              {heading}
            </h1>
          </div>
        )}
        {children}
      </div>
    );
  },
);
Hero.displayName = "Hero";

export { Hero };
