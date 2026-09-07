export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: "Client" | "Ventures";
  description: string;
  year: string;
  services: string[];
  videoUrl?: string;
  coverImage?: string;
  gallery?: string[];
  featured?: boolean;
  featuredTitle?: string;
  featuredLabel?: string;
  featuredColor?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "nepal-premier-league",
    title: "Nepal Premier League",
    client: "Cricket Association of Nepal",
    category: "Ventures",
    year: "2025",
    services: ["Brand Identity", "Broadcast Design", "Event Production", "Digital Strategy"],
    description: "Redefining sports entertainment in the Himalayas. We didn't just design a logo; we built a cultural movement. From the electric broadcast packages to the stadium experience, NPL is the new gold standard for South Asian sports leagues.",
    featured: true,
    featuredTitle: "Nepal Premier League",
    featuredLabel: "Sports Franchise",
    featuredColor: "bg-accent",
    videoUrl: "/placeholder-npl.mp4",
    gallery: [
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=2029&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=2066&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2005&auto=format&fit=crop"
    ]
  },
  {
    id: "2",
    slug: "project-alpha",
    title: "Project Alpha",
    client: "Global Tech Giant",
    category: "Client",
    year: "2024",
    services: ["Global Campaign", "Film Production", "CGI"],
    description: "A high-octane global launch for the next generation of wearable tech. Shot across 4 continents, this campaign blends practical effects with cutting-edge CGI to tell a story of human potential unleashed.",
    featured: true,
    featuredTitle: "Global Campaign",
    featuredLabel: "Foreign Client",
    featuredColor: "bg-neutral-900",
  },
  {
    id: "3",
    slug: "kathmandu-vibes",
    title: "Kathmandu Vibes",
    client: "Local Heritage Brand",
    category: "Client",
    year: "2024",
    services: ["Rebranding", "Social Strategy", "Content Creation"],
    description: "Breathing new life into a century-old legacy. We stripped back the noise to reveal the core of Kathmandu's urban spirit, connecting a heritage brand with Gen Z through raw, authentic storytelling.",
    featured: true,
    featuredTitle: "Local Dominance",
    featuredLabel: "Nepal Campaign",
    featuredColor: "bg-neutral-800",
  },
  {
    id: "4",
    slug: "the-series",
    title: "The Series",
    client: "BrandLogiq Studios",
    category: "Ventures",
    year: "2025",
    services: ["Original IP", "Scriptwriting", "Production"],
    description: "Our flagship noir-thriller set in the underbelly of Thamel. 'The Series' is a testament to our studio's capability to produce Netflix-grade narrative content entirely in-house.",
  },
  {
    id: "5",
    slug: "mountain-peak",
    title: "Mountain Peak",
    client: "Nepal Tourism Board",
    category: "Client",
    year: "2023",
    services: ["Destination Marketing", "Documentary Film"],
    description: "Beyond the postcards. We went deeper, higher, and further to capture the soul of the Himalayas. A documentary-style campaign that shifted the narrative from 'conquering peaks' to 'finding oneself'.",
  },
  {
    id: "6",
    slug: "neon-nights",
    title: "Neon Nights",
    client: "BrandLogiq Studios",
    category: "Ventures",
    year: "2026",
    services: ["Music Festival", "IP Development", "Live Experience"],
    description: "An immersive audio-visual festival property owned and operated by BrandLogiq. Neon Nights fuses electronic music with installation art, creating a recurring revenue stream and a cultural touchpoint.",
  },
];

export function getLocalProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
