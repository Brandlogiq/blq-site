import Hero from "@/components/home/Hero";
import Capabilities from "@/components/home/Capabilities";
import FeaturedReel from "@/components/home/FeaturedReel";
import AboutNarrative from "@/components/home/AboutNarrative";
import ParallaxText from "@/components/ui/ParallaxText";
import { getFeaturedProjects, getProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getProjects();
  const featured = getFeaturedProjects(projects);

  return (
    <div className="flex flex-col">
      <Hero />
      <div className="py-8 border-y border-neutral-200 dark:border-neutral-800">
        <ParallaxText baseVelocity={-5}>We Build Legacy.</ParallaxText>
        <ParallaxText baseVelocity={5}>Own The Future.</ParallaxText>
      </div>
      <div className="py-10 lg:py-20">
        <Capabilities />
      </div>
      <FeaturedReel projects={featured} />
      <AboutNarrative />
    </div>
  );
}
