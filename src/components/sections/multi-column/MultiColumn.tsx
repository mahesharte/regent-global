import type { SanitySection } from '@/sanity/types/documents';
import type { FC } from 'react';

import { FourColumns } from '@/components/FourColumns';
import { PortableText } from '@portabletext/react';
import { getSectionStyle } from '../utils';
import Image from 'next/image';

type Props = {
  section: SanitySection;
};

const MultiColumn: FC<Props> = ({ section }) => {
  const style = getSectionStyle(section, ['gradient', 'padding']);
  return (
    <FourColumns
      columns={(section.items ?? []).map((item) => ({
        headline: item.title,
        icon: (
          <>
            {!!item.image && (
              <Image
                className="inline"
                src={item.image.asset?.url ?? ''}
                alt={item.title ?? ''}
                width={24}
                height={24}
              />
            )}
          </>
        ),
        body: <PortableText value={item.content ?? []} />,
      }))}
      style={style}
    />
  );
};

export default MultiColumn;
