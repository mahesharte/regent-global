import type { SanitySection } from '@/sanity/types/documents';
import type { FC } from 'react';

import { LogoWall as LogoWallComponent } from '@/components/LogoWall';
import { getSectionStyle } from '../utils';

type Props = {
  section: SanitySection;
};

const LogoWall: FC<Props> = ({ section }) => {
  const style = getSectionStyle(section, ['gradient', 'padding']);
  return (
    <LogoWallComponent
      headline={section.title ?? ''}
      items={(section.links ?? []).map((link) => ({
        imageUrl: link.image?.asset?.url ?? '',
        text: link.title ?? '',
      }))}
      style={style}
    />
  );
};

export default LogoWall;
