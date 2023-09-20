import type { SanitySection } from '@/sanity/types/documents';
import type { FC } from 'react';

import { Hero as HeroComponent } from '@/components/hero';
import { getSectionStyle } from '../utils';

type Props = {
  section: SanitySection;
};

const Hero: FC<Props> = ({ section }) => {
  const style = getSectionStyle(section, ['gradient']);
  // Image only
  if (!!section.image && !section.title) {
    const height = section.image.asset?.metadata?.dimensions?.height;
    style.height = height ? `${height / 2}px` : 'auto';
  }
  return (
    <HeroComponent
      heading={section.title ?? ''}
      imageUrl={section.image?.asset?.url}
      style={style}
    />
  );
};

export default Hero;
