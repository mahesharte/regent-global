import { FC } from "react";

import { useAppContext } from "@/components/app/context";
import { SanitySection } from "@/sanity/types/documents";
import Articles from "./articles/Articles";
import BigNumbers from "./big-numbers/BigNumbers";
import Contact from "./contact/Contact";
import ContentBlock from "./content-block/ContentBlock";
import Hero from "./hero/Hero";
import LogoWall from "./logo-wall/LogoWall";
import MultiColumn from "./multi-column/MultiColumn";
import Team from "./team/Team";
import { SectionVariables } from "./types";

type Props = {
  sections: SanitySection[];
  variables: SectionVariables;
};

const Sections: FC<Props> = ({ sections, variables }) => {
  const [{ preview }] = useAppContext();
  return (
    <div id="sections">
      {sections.map((section, index) => (
        <section
          key={`${section?._id}-${index}`}
          data-id={preview.active ? section?._id : undefined}
          className={preview.active ? "scroll-my-5" : undefined}
        >
          {(() => {
            switch (section?.component) {
              case "articles":
                return (
                  <Articles
                    section={section}
                    articles={variables.articles ?? []}
                  />
                );
              case "bigNumbers":
                return <BigNumbers section={section} />;
              case "contact":
                return <Contact section={section} />;
              case "contentBlock":
                return <ContentBlock section={section} />;
              case "hero":
                return <Hero section={section} />;
              case "logoWall":
                return <LogoWall section={section} />;
              case "multiColumn":
                return <MultiColumn section={section} />;
              case "team":
                return <Team section={section} />;
              default:
                return <></>;
            }
          })()}
        </section>
      ))}
    </div>
  );
};

export default Sections;
