import { groq } from "next-sanity";

import type { SanityClient } from "../client";
import type { SanityPage } from "../types/documents";

const pageFields = `
  _id,
  _type,
  title,
  type,
  slug,
  sections[]-> {
    ...,
     "filterTags": filterTags[]->{
      _id,
      title,
      "slug": slug.current
    },

    image {
      ...,
      asset->
    },
    buttons[] {
      ...,
      link-> {
        ...,
        reference->
      }
    },
    items[] {
      ...,
      image {
        ...,
        asset->
      },
      button {
        ...,
        icon {
          ...,
          asset->
        },
        link-> {
          ...,
          reference->
        }
      }
    },
    links[]-> {
      ...,
      image {
        ...,
        asset->
      },
      reference->
    },
    people[]-> {
      _id,
      _type,
      name,
      photo {
        ...,
        asset->
      },
      title,
      description,
      slug,
      groups[]
    },
    form->,
    styleGradient->,
    heroCarousel[] {
      ...,
      image {
        ...,
        asset->
      }
    }
  },
  pageMeta {
    ...,
    image {
      ...,
      asset->
    }
  }
`;

export const getPageByIdQuery = groq`
  *[_type == "page" && _id == $id][0] {
    ${pageFields}
  }
`;

export const getPageBySlugQuery = groq`
  *[_type == "page" && type == "basic" && slug.current == $slug][0] {
    ${pageFields}
  }
`;

export const getPageByStatusQuery = groq`
  *[_type == "page" && type == "error" && status == $status][0] {
    ${pageFields}
  }
`;

export const getPageByTypeQuery = groq`
  *[_type == "page" && type == $type][0] {
    ${pageFields}
  }
`;

const queryBy = {
  id: getPageByIdQuery,
  slug: getPageBySlugQuery,
  status: getPageByStatusQuery,
  type: getPageByTypeQuery,
};

const getPage = async (
  client: SanityClient,
  query: string,
  by: "id" | "slug" | "status" | "type" = "slug",
): Promise<SanityPage | null> =>
  client.fetch<SanityPage | null>(queryBy[by], {
    [by]: query,
  });

export const getPersonBySlugQuery = groq`
  *[_type == "person" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    photo {
      ...,
      asset->
    },
    title,
    description,
    bio,
    linkedinUrl,
    slug,
    groups[]
  }
`;

export const getPerson = async (
  client: SanityClient,
  slug: string,
): Promise<any | null> =>
  client.fetch<any | null>(getPersonBySlugQuery, { slug });

export default getPage;
