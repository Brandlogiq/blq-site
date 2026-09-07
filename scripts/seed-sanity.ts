import { createClient } from "@sanity/client";
import { getPlaceholderDocuments } from "../sanity/placeholderDocs";

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
  for (const doc of getPlaceholderDocuments()) {
    await client.createOrReplace(doc);
    console.log(`Seeded ${doc._type} ${doc._id}`);
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
