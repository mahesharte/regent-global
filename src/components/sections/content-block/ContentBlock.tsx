import type { SanitySection } from '@/sanity/types/documents';
import type { FC } from 'react';

import { ContentBlock as ContentBlockComponent } from '@/components/ContentBlock';
import { PortableText } from '@portabletext/react';
import { getSectionStyle } from '../utils';

type Props = {
  section: SanitySection;
};

const ContentBlock: FC<Props> = ({ section }) => {
  const style = getSectionStyle(section, ['padding']);
  return (
    <ContentBlockComponent
      align={section.styleAlignment ?? 'left'}
      heading={section.title ?? ''}
      image={section.image?.asset?.url}
      body={<PortableText value={section.content ?? []} />}
      cta={(section.buttons ?? []).map((button) => ({
        text: button.title ?? button.link?.title,
        url: button.link?.url ?? '',
      }))}
      style={style}
    />
  );
};

export default ContentBlock;
