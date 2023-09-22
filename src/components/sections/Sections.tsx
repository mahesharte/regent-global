import { FC } from "react";

import Articles from "./articles/Articles";
import BigNumbers from "./big-numbers/BigNumbers";
import ContentBlock from "./content-block/ContentBlock";
import Hero from "./hero/Hero";
import LogoWall from "./logo-wall/LogoWall";
import MultiColumn from "./multi-column/MultiColumn";
import Team from "./team/Team";
import { SanitySection } from "@/sanity/types/documents";
import { SectionVariables } from "./types";

type Props = {
  sections: SanitySection[];
  variables: SectionVariables;
};

const Sections: FC<Props> = ({ sections, variables }) => (
  <div>
    {sections.map((section, index) => (
      <section key={`${section?._id}-${index}`}>
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
            case "contentBlock":
              return <ContentBlock section={section} />;
            case "hero":
              return <Hero section={section} />;
            case "logoWall":
              return <LogoWall section={section} />;
            case "multiColumn":
              return <MultiColumn section={section} />;
            case "team":
              return <Team section={section} team={variables.team ?? []} />;
            default:
              return <></>;
          }
        })()}
      </section>
    ))}
  </div>
);

export default Sections;
