export type SiteSettings = {
  brandName: string;
  siteTitle: string;
  siteDescription: string;
  workNavLabel: string;
  contactNavLabel: string;
  location: string;
  email: string;
  copyright: string;
};

export type Capability = {
  title: string;
  description: string;
  image: string;
};

export type HomeContent = {
  heroTitle: string;
  heroAccent: string;
  heroSubtitle: string;
  heroVideo?: string;
  marqueeLeft: string;
  marqueeRight: string;
  capabilities: Capability[];
  aboutText: string;
  aboutCtaLabel: string;
  aboutCtaHref: string;
};

export type WorkContent = {
  title: string;
  filterAllLabel: string;
  filterClientLabel: string;
  filterVenturesLabel: string;
  viewProjectLabel: string;
  backLabel: string;
  clientLabel: string;
  yearLabel: string;
  categoryLabel: string;
  briefLabel: string;
  servicesLabel: string;
  galleryLabel: string;
  nextLabel: string;
};

export type ContactContent = {
  title: string;
  intro: string;
  location: string;
  email: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  briefPlaceholder: string;
  submitLabel: string;
};

export const fallbackSettings: SiteSettings = {
  brandName: "BrandLogiq",
  siteTitle: "BrandLogiq | Unified Powerhouse",
  siteDescription: "Visions Scaled. Legacies Owned.",
  workNavLabel: "Work",
  contactNavLabel: "Contact",
  location: "Kathmandu / Global Remote",
  email: "hello@brandlogiq.org",
  copyright: "© 2026 BrandLogiq",
};

export const fallbackHome: HomeContent = {
  heroTitle: "Visions Scaled.",
  heroAccent: "Legacies Owned.",
  heroSubtitle: "We build the brands that define the world and own the assets that define the culture.",
  marqueeLeft: "We Build Legacy.",
  marqueeRight: "Own The Future.",
  capabilities: [
    {
      title: "Global Strategy",
      description: "High-end work for foreign clients.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Nepal Execution",
      description: "Dominant local campaigns.",
      image: "https://images.unsplash.com/photo-1544735038-179ad682ee5d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Venture & IP",
      description: "Acquiring and developing original assets in Media, Sports, and Tech.",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop",
    },
  ],
  aboutText:
    "BrandLogiq is a creative infrastructure. We are an interface between global brands and local execution, and a studio producing the next generation of original assets.",
  aboutCtaLabel: "Partner With Us",
  aboutCtaHref: "/contact",
};

export const fallbackWork: WorkContent = {
  title: "The Work",
  filterAllLabel: "All",
  filterClientLabel: "Client",
  filterVenturesLabel: "Ventures",
  viewProjectLabel: "View Project",
  backLabel: "Back to Work",
  clientLabel: "Client",
  yearLabel: "Year",
  categoryLabel: "Category",
  briefLabel: "The Brief",
  servicesLabel: "Services",
  galleryLabel: "Project Gallery",
  nextLabel: "Next Project",
};

export const fallbackContact: ContactContent = {
  title: "Partner With Us",
  intro: "We build brands for the world and own the stories that define them.",
  location: "Kathmandu / Global Remote",
  email: "hello@brandlogiq.org",
  namePlaceholder: "Name",
  emailPlaceholder: "Email",
  briefPlaceholder: "Brief",
  submitLabel: "Submit Request",
};
