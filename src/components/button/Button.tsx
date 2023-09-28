import { FC, forwardRef } from "react";
import Link from "next/link";

import { SanityButton } from "@/sanity/types/objects";
import getLinkAttributes from "@/sanity/utils/getLinkAttributes";
import { useAppContext } from "../app/context";
import { applyGradientStyles } from "../sections/utils";
import useDynamicStyles, { DynamicStyles } from "@/lib/hooks/useDynamicStyles";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  button: SanityButton;
  className?: string;
};

const Button: FC<Props> = ({ button, className }) => {
  const [{ setting }] = useAppContext();
  const dynamicStyles: DynamicStyles = {};
  applyGradientStyles(dynamicStyles, setting?.themeGlobalGradient);
  const { className: dynamicClassName, ref } =
    useDynamicStyles<HTMLAnchorElement>(dynamicStyles);
  return (
    <Link
      ref={ref}
      className={cn(
        "ring-offset-background transition-background focus-visible:ring-ring inline-flex items-center justify-center rounded-full px-8 py-[14px] text-sm",
        "font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        dynamicClassName,
        className,
      )}
      {...getLinkAttributes(button.link)}
    >
      {!!button.icon?.asset?.url && button.alignment === "right" && (
        <Image
          className="mr-2 inline-block h-5 w-auto"
          src={button.icon.asset.url}
          height={20}
          width={20}
          alt="icon"
        />
      )}
      <span className="inline-block">{button.title}</span>
      {!!button.icon?.asset?.url && button.alignment === "left" && (
        <Image
          className="ml-2 inline-block h-5 w-auto"
          src={button.icon.asset.url}
          height={20}
          width={20}
          alt="icon"
        />
      )}
    </Link>
  );
};

export default Button;
