import type { SanitySection } from "@/sanity/types/documents";
import { useMemo, type FC } from "react";

import { BigText } from "@/components/bigtext";
import { Hero as HeroComponent } from "@/components/hero";
import useDynamicStyles, { DynamicStyles } from "@/lib/hooks/useDynamicStyles";
import { StyleName, useSectionStyles } from "../utils";

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
        "50vh",
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

  if (variant === "bigText") {
    return (
      <BigText
        ref={ref}
        className={className}
        heading={section.title ?? ""}
        subheading={section.subtitle}
      />
    );
  }
  return (
    <HeroComponent
      ref={ref}
      className={className}
      heading={section.title ?? ""}
      imageUrl={section.image?.asset?.url}
    />
  );
};

export default Hero;
