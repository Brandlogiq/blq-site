"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import type { SiteSettings } from "@/lib/site";

export default function AppShell({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SiteSettings;
}) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <>
      <CustomCursor />
      <Preloader brandName={settings.brandName} />
      <SmoothScroll>
        <Header
          brandName={settings.brandName}
          workLabel={settings.workNavLabel}
          contactLabel={settings.contactNavLabel}
        />
        <main className="min-h-screen pt-24">{children}</main>
        <Footer
          brandName={settings.brandName}
          location={settings.location}
          copyright={settings.copyright}
        />
      </SmoothScroll>
    </>
  );
}
