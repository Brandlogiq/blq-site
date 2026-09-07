import { client, isSanityConfigured } from "@/lib/sanity";
import { PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY } from "@/lib/queries";
import { projects as fallbackProjects, type Project } from "@/lib/data";

type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  client: string;
  category: Project["category"];
  year: string;
  description: string;
  services?: string[];
  videoUrl?: string;
  featured?: boolean;
  featuredTitle?: string;
  featuredLabel?: string;
  featuredColor?: string;
  coverImage?: string;
  gallery?: Array<string | null>;
};

function toProject(doc: SanityProject): Project {
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    client: doc.client,
    category: doc.category,
    year: doc.year,
    description: doc.description,
    services: doc.services ?? [],
    videoUrl: doc.videoUrl,
    featured: Boolean(doc.featured),
    featuredTitle: doc.featuredTitle,
    featuredLabel: doc.featuredLabel,
    featuredColor: doc.featuredColor,
    coverImage: doc.coverImage,
    gallery: (doc.gallery ?? []).filter((url): url is string => Boolean(url)),
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!client || !isSanityConfigured) {
    return fallbackProjects;
  }

  try {
    const docs = await client.fetch<SanityProject[]>(PROJECTS_QUERY);
    if (!docs?.length) {
      return fallbackProjects;
    }
    return docs.map(toProject);
  } catch (error) {
    console.warn("Sanity project fetch failed, using local data.", error);
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!client || !isSanityConfigured) {
    return fallbackProjects.find((project) => project.slug === slug);
  }

  try {
    const doc = await client.fetch<SanityProject | null>(PROJECT_BY_SLUG_QUERY, { slug });
    if (!doc) {
      return fallbackProjects.find((project) => project.slug === slug);
    }
    return toProject(doc);
  } catch (error) {
    console.warn("Sanity project fetch failed, using local data.", error);
    return fallbackProjects.find((project) => project.slug === slug);
  }
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  const featured = projects.filter((project) => project.featured);
  return featured.length > 0 ? featured : projects.slice(0, 3);
}
