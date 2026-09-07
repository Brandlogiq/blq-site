import { client, isSanityConfigured } from "@/lib/sanity";
import { PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY } from "@/lib/queries";
import { projects as fallbackProjects, type Project } from "@/lib/data";
import { NPL_PLACEHOLDER_YOUTUBE, toGalleryItem, type GalleryItem } from "@/lib/youtube";

type SanityGalleryItem = {
  _type?: string;
  url?: string | null;
  alt?: string | null;
};

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
  gallery?: SanityGalleryItem[];
};

function withNplPlaceholder(slug: string, gallery: GalleryItem[]): GalleryItem[] {
  if (slug !== "nepal-premier-league") return gallery;
  if (gallery.some((item) => item.type === "youtube")) return gallery;
  const placeholder = toGalleryItem({
    type: "youtubeVideo",
    url: NPL_PLACEHOLDER_YOUTUBE,
    alt: "NPL film",
  });
  return placeholder ? [placeholder, ...gallery] : gallery;
}

function toProject(doc: SanityProject): Project {
  const gallery = (doc.gallery ?? [])
    .map((item) => toGalleryItem({ url: item.url, type: item._type, alt: item.alt }))
    .filter((item): item is GalleryItem => Boolean(item));

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
    gallery: withNplPlaceholder(doc.slug, gallery),
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

export async function getSanityStats() {
  if (!client || !isSanityConfigured) {
    return { connected: false, count: 0 };
  }

  try {
    const count = await client.fetch<number>('count(*[_type == "project"])');
    return { connected: true, count };
  } catch (error) {
    console.warn("Sanity stats fetch failed.", error);
    return { connected: false, count: 0 };
  }
}
