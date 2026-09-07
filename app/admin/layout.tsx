import { NextStudioLayout } from "next-sanity/studio";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <NextStudioLayout>{children}</NextStudioLayout>;
}
