import type { SanitySection } from "@/sanity/types/documents";
import { useMemo, type FC } from "react";

import { BigText } from "@/components/bigtext";
import { Hero as HeroComponent } from "@/components/hero";
import useDynamicStyles, { DynamicStyles } from "@/lib/hooks/useDynamicStyles";
import { StyleName, useSectionStyles } from "../utils";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  section: SanitySection;
};

const Hero: FC<Props> = ({ section }) => {
  const variant = section.variant ?? "default";
  const styleNames = useMemo<StyleName[]>(() => {
    switch (variant) {
      case "image":
        return ["gradient", "margin"];
      default:
        return ["gradient", "margin", "padding"];
    }
  }, [variant]);
  const styles = useSectionStyles(section, styleNames);
  const withExtraStyles = useMemo<DynamicStyles>(() => {
    const extraStyles: DynamicStyles = {};
    if (variant === "image" && section.image) {
      const height = section.image.asset?.metadata?.dimensions?.height;
      extraStyles["h-[var(--hero-image-height-xs)]"] = [
        "--hero-image-height-xs",
        section?.styleFullSizeToggle ? "auto" : "25vh",
      ];
      extraStyles["md:h-[var(--hero-image-height-md)]"] = [
        "--hero-image-height-md",
        height ? `${height / 2}px` : "auto",
      ];
    }
    return {
      ...styles,
      ...extraStyles,
    };
  }, [section, styles, variant]);
  const { ref, className } = useDynamicStyles<HTMLDivElement>(withExtraStyles);

  switch (variant) {
    case "bigText":
      return (
        <BigText
          ref={ref}
          className={className}
          heading={section.title ?? ""}
          subheading={section.subtitle}
          theme={section.styleTheme}
        />
      );
    case "image":
      return (
        section.image?.asset?.url && (
          <div ref={ref} className={cn("container mx-auto overflow-hidden")}>
            <Image
              className={cn(
                section?.styleFullSizeToggle
                  ? "object-contain"
                  : "object-cover",
                className,
              )}
              src={section.image.asset.url}
              width={section.image.asset.metadata.dimensions.width}
              height={section.image.asset.metadata.dimensions.height}
              alt={section.title ?? ""}
            />
          </div>
        )
      );
    default:
      return (
        <HeroComponent
          ref={ref}
          className={className}
          heading={section.title ?? ""}
          image={section.image ?? undefined}
          theme={section.styleTheme}
        />
      );
  }
};

export default Hero;
