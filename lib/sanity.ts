import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export { isSanityConfigured };

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = client ? createImageUrlBuilder(client) : null;

export function urlFor(source: Parameters<NonNullable<typeof builder>["image"]>[0]) {
  return builder?.image(source);
}
