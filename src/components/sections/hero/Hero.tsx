import { SanitySection } from '@/sanity/types/documents';
import { FC } from 'react';

import { Hero as HeroComponent } from '@/components/hero';

type Props = {
  section: SanitySection;
};

const Hero: FC<Props> = ({ section }) => (
  <HeroComponent heading={section.title ?? ''} />
);

export default Hero;
