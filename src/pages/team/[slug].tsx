import type { GetServerSideProps } from "next";
import type { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PortableText } from "@portabletext/react";

import type { SanityPerson } from "@/sanity/types/documents";
import { getClient } from "@/sanity/client";
import { writeToken } from "@/sanity/config";
import { getPerson } from "@/sanity/services/getPage";
import getHeader from "@/sanity/services/getHeader";
import getFooter from "@/sanity/services/getFooter";
import imageUrlBuilder from "@/sanity/utils/imageUrlBuilder";
import { ArrowCornerRight, LinkedIn } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { GlobalPageProps } from "@/types/global";

export type TeamMemberProps = GlobalPageProps & {
  person: SanityPerson | null;
};

const TeamMember: FC<TeamMemberProps> = ({ person }) => {
  const router = useRouter();

  if (!person) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Team member not found
        </h1>
      </div>
    );
  }

  const photoUrl = person.photo?.asset?.url
    ? imageUrlBuilder(person.photo).url()
    : null;

  return (
    <div className="bg-white">
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center text-sm font-semibold text-blue transition-colors hover:text-red md:text-base"
        >
          ← Back
        </button>
      </div>

      {/* Main content: Centered Photo + Name + Title */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-8">

          {/* Profile Photo */}
          {photoUrl && (
            <div className="relative aspect-square w-full max-w-[250px] overflow-hidden">
              <Image
                src={photoUrl}
                alt={person.name}
                fill
                className="object-cover [clip-path:circle(50%)]"
                priority
              />
            </div>
          )}

          {/* Name + Title */}
          <div>
            <h2 className="text-4xl font-black text-blue md:text-5xl lg:text-6xl">
              {person.name}
            </h2>

            {person.title && (
              <p className="mt-3 text-lg font-semibold text-neutral-700 md:text-xl">
                {person.title}
              </p>
            )}
          </div>

          {/* Description */}
          {person.description && (
            <p className="mt-4 max-w-2xl text-base text-neutral-600 md:text-lg">
              {person.description}
            </p>
          )}

          {/* LinkedIn Button */}
          {person.linkedinUrl && (
            <a
              href={person.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-6 inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3 font-semibold text-white transition-all hover:bg-red hover:shadow-lg"
              )}
            >
              <LinkedIn className="h-5 w-5" />
              View LinkedIn Profile
              <ArrowCornerRight className="h-4 w-4 stroke-white" />
            </a>
          )}
        </div>
      </div>

      {/* Full-width Bio section */}
      {person.bio && (
        <div className="bg-neutral-50 py-12">
          <div className="container mx-auto px-4">
            <div className="prose prose-lg max-w-none text-neutral-700 text-left">
              <PortableText value={person.bio} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TeamMemberProps> = async ({
  params,
}) => {
  const slug = params?.slug;

  if (!slug || typeof slug !== "string") {
    return { notFound: true };
  }

  try {
    const draftMode = false;
    const preview = draftMode ? writeToken : null;
    const client = getClient(preview);

    const person = await getPerson(client, slug);

    console.log("Fetching person with slug:", slug);
    console.log("Person found:", person ? person.name : "NOT FOUND");

    if (!person) {
      console.warn(`Person not found for slug: ${slug}`);
      return { notFound: true };
    }

    const header = await getHeader(client);
    const footer = await getFooter(client);

    return {
      props: {
        person,
        header: header ?? null,
        footer: footer ?? null,
        pageMeta: {
          title: person.name,
          description: person.description || person.title,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching team member:", error);
    return { notFound: true };
  }
};

export default TeamMember;
