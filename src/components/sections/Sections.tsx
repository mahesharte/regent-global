import { FC } from 'react';

import Hero from './hero/Hero';
import { SanitySection } from '@/sanity/types/documents';

type Props = {
  sections: SanitySection[];
};

const Sections: FC<Props> = ({ sections }) => (
  <div>
    {sections.map((section, index) => (
      <section key={`${section._id}-${index}`}>
        {(() => {
          switch (section.component) {
            case 'hero':
              return <Hero section={section} />;
            default:
              return <></>;
          }
        })()}
      </section>
    ))}
  </div>
);

export default Sections;
