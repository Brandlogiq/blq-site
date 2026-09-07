import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import type { Metadata } from "next";
import Studio from "./Studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Admin | BrandLogiq",
  robots: { index: false, follow: false },
};

export const viewport = studioViewport;

export default function AdminPage() {
  return <Studio />;
}
