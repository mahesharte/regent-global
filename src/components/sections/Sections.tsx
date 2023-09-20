import { FC } from 'react';

import BigNumbers from './big-numbers/BigNumbers';
import ContentBlock from './content-block/ContentBlock';
import Hero from './hero/Hero';
import LogoWall from './logo-wall/LogoWall';
import MultiColumn from './multi-column/MultiColumn';
import { SanitySection } from '@/sanity/types/documents';

type Props = {
  sections: SanitySection[];
};

const Sections: FC<Props> = ({ sections }) => (
  <div>
    {sections.map((section, index) => (
      <section key={`${section?._id}-${index}`}>
        {(() => {
          switch (section?.component) {
            case 'bigNumbers':
              return <BigNumbers section={section} />;
            case 'contentBlock':
              return <ContentBlock section={section} />;
            case 'hero':
              return <Hero section={section} />;
            case 'logoWall':
              return <LogoWall section={section} />;
            case 'multiColumn':
              return <MultiColumn section={section} />;
            default:
              return <></>;
          }
        })()}
      </section>
    ))}
  </div>
);

export default Sections;
