import type { CSSProperties } from 'react';

import { SanitySection } from '@/sanity/types/documents';

type StyleName = 'gradient' | 'padding';

export const getSectionStyle = (
  section: SanitySection,
  styleNames: StyleName[] = ['gradient', 'padding']
): CSSProperties => {
  const style: CSSProperties = {};
  if (styleNames.includes('gradient') && section.styleGradient) {
    if (section.styleGradient) {
      style.background = `linear-gradient(to right, ${(
        section.styleGradient?.colors ?? []
      ).map(
        (color) =>
          `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
      )})`;
    }
  }
  if (styleNames.includes('padding') && section.stylePadding) {
    style.paddingTop = section.stylePadding.top;
    style.paddingBottom = section.stylePadding.bottom;
  }
  return style;
};
