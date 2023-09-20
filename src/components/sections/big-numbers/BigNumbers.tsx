import type { SanitySection } from '@/sanity/types/documents';
import type { FC } from 'react';

import { BigNumbers as BigNumbersComponent } from '@/components/BigNumbers';
import { PortableText } from '@portabletext/react';
import { getSectionStyle } from '../utils';

type Props = {
  section: SanitySection;
};

const BigNumbers: FC<Props> = ({ section }) => {
  const style = getSectionStyle(section, ['gradient', 'padding']);
  return (
    <BigNumbersComponent
      headline={section.title ?? ''}
      items={(section.items ?? []).map((item) => ({
        number: item.title,
        imageUrl: item.image?.asset?.url ?? '',
        subText: <PortableText value={item.content ?? []} />,
      }))}
      style={style}
    />
  );
};

export default BigNumbers;
