import { cache } from "react";
import { client, isSanityConfigured } from "@/lib/sanity";
import {
  CONTACT_PAGE_QUERY,
  HOME_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  WORK_PAGE_QUERY,
} from "@/lib/queries";
import type { Capability, ContactContent, HomeContent, SiteSettings, WorkContent } from "@/lib/site-defaults";
import {
  fallbackContact,
  fallbackHome,
  fallbackSettings,
  fallbackWork,
} from "@/lib/site-defaults";

export type { Capability, ContactContent, HomeContent, SiteSettings, WorkContent };
export { fallbackContact, fallbackHome, fallbackSettings, fallbackWork };

function merge<T extends object>(fallback: T, doc?: Partial<T> | null): T {
  if (!doc) return fallback;
  return { ...fallback, ...Object.fromEntries(Object.entries(doc).filter(([, value]) => value != null && value !== "")) };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!client || !isSanityConfigured) return fallbackSettings;
  try {
    const doc = await client.fetch<Partial<SiteSettings> | null>(SITE_SETTINGS_QUERY);
    return merge(fallbackSettings, doc);
  } catch {
    return fallbackSettings;
  }
});

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  if (!client || !isSanityConfigured) return fallbackHome;
  try {
    const doc = await client.fetch<(Partial<HomeContent> & { capabilities?: Capability[] }) | null>(HOME_PAGE_QUERY);
    const capabilities = doc?.capabilities?.filter((item) => item.title && item.image);
    return merge(fallbackHome, {
      ...doc,
      capabilities: capabilities?.length ? capabilities : fallbackHome.capabilities,
    });
  } catch {
    return fallbackHome;
  }
});

export const getWorkContent = cache(async (): Promise<WorkContent> => {
  if (!client || !isSanityConfigured) return fallbackWork;
  try {
    return merge(fallbackWork, await client.fetch(WORK_PAGE_QUERY));
  } catch {
    return fallbackWork;
  }
});

export const getContactContent = cache(async (): Promise<ContactContent> => {
  if (!client || !isSanityConfigured) return fallbackContact;
  try {
    return merge(fallbackContact, await client.fetch(CONTACT_PAGE_QUERY));
  } catch {
    return fallbackContact;
  }
});
