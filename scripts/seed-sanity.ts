import { createClient } from "@sanity/client";
import { projects } from "../lib/data";

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
