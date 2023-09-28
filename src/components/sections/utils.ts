import { useMemo } from "react";
import isUndefined from "lodash/isUndefined";

import { SanityGradient, SanitySection } from "@/sanity/types/documents";
import { DynamicStyles } from "@/lib/hooks/useDynamicStyles";
import { useAppContext } from "@/components/app/context";

export type StyleName = "gradient" | "margin" | "padding";
export type StylePair = [property: string, className: string];

const gradientStyles: {
  [name: string]: StylePair;
} = {
  gradient: [
    "--section-linear-gradient",
    "bg-[linear-gradient(var(--section-linear-gradient))]",
  ],
};
const marginStyles: {
  [size: string]: {
    top: StylePair;
    bottom: StylePair;
  };
} = {
  xs: {
    top: ["--section-margin-top-xs", "mt-[var(--section-margin-top-xs)]"],
    bottom: [
      "--section-margin-bottom-xs",
      "mb-[var(--section-margin-bottom-xs)]",
    ],
  },
  sm: {
    top: ["--section-margin-top-sm", "sm:mt-[var(--section-margin-top-sm)]"],
    bottom: [
      "--section-margin-bottom-sm",
      "sm:mb-[var(--section-margin-bottom-sm)]",
    ],
  },
  md: {
    top: ["--section-margin-top-md", "md:mt-[var(--section-margin-top-md)]"],
    bottom: [
      "--section-margin-bottom-md",
      "md:mb-[var(--section-margin-bottom-md)]",
    ],
  },
  lg: {
    top: ["--section-margin-top-lg", "lg:mt-[var(--section-margin-top-lg)]"],
    bottom: [
      "--section-margin-bottom-lg",
      "lg:mb-[var(--section-margin-bottom-lg)]",
    ],
  },
  xl: {
    top: ["--section-margin-top-xl", "xl:mt-[var(--section-margin-top-xl)]"],
    bottom: [
      "--section-margin-bottom-xl",
      "xl:mb-[var(--section-margin-bottom-xl)]",
    ],
  },
};
const paddingStyles: {
  [size: string]: {
    top: StylePair;
    bottom: StylePair;
  };
} = {
  xs: {
    top: ["--section-padding-top-xs", "pt-[var(--section-padding-top-xs)]"],
    bottom: [
      "--section-padding-bottom-xs",
      "pb-[var(--section-padding-bottom-xs)]",
    ],
  },
  sm: {
    top: ["--section-padding-top-sm", "sm:pt-[var(--section-padding-top-sm)]"],
    bottom: [
      "--section-padding-bottom-sm",
      "sm:pb-[var(--section-padding-bottom-sm)]",
    ],
  },
  md: {
    top: ["--section-padding-top-md", "md:pt-[var(--section-padding-top-md)]"],
    bottom: [
      "--section-padding-bottom-md",
      "md:pb-[var(--section-padding-bottom-md)]",
    ],
  },
  lg: {
    top: ["--section-padding-top-lg", "lg:pt-[var(--section-padding-top-lg)]"],
    bottom: [
      "--section-padding-bottom-lg",
      "lg:pb-[var(--section-padding-bottom-lg)]",
    ],
  },
  xl: {
    top: ["--section-padding-top-xl", "xl:pt-[var(--section-padding-top-xl)]"],
    bottom: [
      "--section-padding-bottom-xl",
      "xl:pb-[var(--section-padding-bottom-xl)]",
    ],
  },
};

export const applyGradientStyles = (
  dynamicStyles: DynamicStyles,
  gradient?: SanityGradient | null,
): DynamicStyles => {
  if (!gradient) {
    return dynamicStyles;
  }
  dynamicStyles[gradientStyles.gradient[1]] = [
    gradientStyles.gradient[0],
    `to right, ${(gradient?.colors ?? []).map(
      (color) =>
        `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
    )}`,
  ];
  return dynamicStyles;
};

export const useSectionStyles = (
  section: SanitySection,
  styleNames: StyleName[] = ["gradient", "margin", "padding"],
): DynamicStyles => {
  const [{ setting }] = useAppContext();
  return useMemo<DynamicStyles>(() => {
    const dynamicStyles: DynamicStyles = {};
    if (styleNames.includes("gradient") && section.styleGradient) {
      if (section.styleGradient) {
        applyGradientStyles(dynamicStyles, section.styleGradient);
      }
    }
    if (styleNames.includes("margin") && section.styleMargin) {
      (section.styleMargin.breakpoints ?? []).forEach(
        ({ size, top, bottom }) => {
          if (!isUndefined(top)) {
            dynamicStyles[marginStyles[size].top[1]] = [
              marginStyles[size].top[0],
              top,
            ];
          }
          if (!isUndefined(bottom)) {
            dynamicStyles[marginStyles[size].bottom[1]] = [
              marginStyles[size].bottom[0],
              bottom,
            ];
          }
        },
      );
    }
    if (styleNames.includes("padding")) {
      const globalSectionPadding = (setting?.styleSectionPadding ?? []).find(
        (item) => item.component === section.component,
      );
      (
        section.stylePadding?.breakpoints ??
        globalSectionPadding?.value?.breakpoints ??
        []
      ).forEach(({ size, top, bottom }) => {
        if (!isUndefined(top)) {
          dynamicStyles[paddingStyles[size].top[1]] = [
            paddingStyles[size].top[0],
            top,
          ];
        }
        if (!isUndefined(bottom)) {
          dynamicStyles[paddingStyles[size].bottom[1]] = [
            paddingStyles[size].bottom[0],
            bottom,
          ];
        }
      });
    }
    return dynamicStyles;
  }, [section, setting, styleNames]);
};
