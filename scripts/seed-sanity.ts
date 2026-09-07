import { createClient } from "@sanity/client";
import { projects } from "../lib/data";
import { fallbackContact, fallbackHome, fallbackSettings, fallbackWork } from "../lib/site-defaults";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function seed() {
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...fallbackSettings,
  });
  console.log("Seeded Site Settings");

  await client.createOrReplace({
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
  });
  console.log("Seeded Home Page");

  await client.createOrReplace({
    _id: "workPage",
    _type: "workPage",
    ...fallbackWork,
  });
  console.log("Seeded Work Page");

  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    ...fallbackContact,
  });
  console.log("Seeded Contact Page");

  for (const [index, project] of projects.entries()) {
    const id = `project-${project.slug}`;
    await client.createOrReplace({
      _id: id,
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
      gallery: (project.gallery ?? []).map((url, imageIndex) => ({
        _type: "externalImage",
        _key: `gallery-${imageIndex}`,
        url,
        alt: `${project.title} ${imageIndex + 1}`,
      })),
    });
    console.log(`Seeded ${project.title}`);
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
