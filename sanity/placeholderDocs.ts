import type { IdentifiedSanityDocumentStub } from "@sanity/client";
import { projects } from "../lib/data";
import {
  fallbackContact,
  fallbackHome,
  fallbackSettings,
  fallbackWork,
} from "../lib/site-defaults";

export function getPlaceholderDocuments(): IdentifiedSanityDocumentStub[] {
  return [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      ...fallbackSettings,
    },
    {
      _id: "homePage",
      _type: "homePage",
      heroTitle: fallbackHome.heroTitle,
      heroAccent: fallbackHome.heroAccent,
      heroSubtitle: fallbackHome.heroSubtitle,
      marqueeLeft: fallbackHome.marqueeLeft,
      marqueeRight: fallbackHome.marqueeRight,
      aboutText: fallbackHome.aboutText,
      aboutCtaLabel: fallbackHome.aboutCtaLabel,
      aboutCtaHref: fallbackHome.aboutCtaHref,
      capabilities: fallbackHome.capabilities.map((capability, index) => ({
        _type: "capability",
        _key: `capability-${index}`,
        title: capability.title,
        description: capability.description,
        imageUrl: capability.image,
      })),
    },
    {
      _id: "workPage",
      _type: "workPage",
      ...fallbackWork,
    },
    {
      _id: "contactPage",
      _type: "contactPage",
      ...fallbackContact,
    },
    ...projects.map((project, index) => ({
      _id: `project-${project.slug}`,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      client: project.client,
      category: project.category,
      year: project.year,
      description: project.description,
      services: project.services,
      videoUrl: project.videoUrl,
      featured: Boolean(project.featured),
      featuredTitle: project.featuredTitle,
      featuredLabel: project.featuredLabel,
      featuredColor: project.featuredColor,
      order: index + 1,
      gallery: (project.gallery ?? []).map((item, imageIndex) =>
        item.type === "youtube"
          ? {
              _type: "youtubeVideo",
              _key: `gallery-${imageIndex}`,
              url: item.src,
              alt: item.alt,
            }
          : {
              _type: "externalImage",
              _key: `gallery-${imageIndex}`,
              url: item.src,
              alt: item.alt || `${project.title} ${imageIndex + 1}`,
            }
      ),
    })),
  ];
}
