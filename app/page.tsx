import Hero from "@/components/home/Hero";
import Capabilities from "@/components/home/Capabilities";
import FeaturedReel from "@/components/home/FeaturedReel";
import AboutNarrative from "@/components/home/AboutNarrative";
import ParallaxText from "@/components/ui/ParallaxText";
import { getFeaturedProjects, getProjects } from "@/lib/projects";
import { getHomeContent } from "@/lib/site";

export default async function Home() {
  const [projects, home] = await Promise.all([getProjects(), getHomeContent()]);
  const featured = getFeaturedProjects(projects);

  return (
    <div className="flex flex-col">
      <Hero
        title={home.heroTitle}
        accent={home.heroAccent}
        subtitle={home.heroSubtitle}
        videoSrc={home.heroVideo}
      />
      <div className="py-8 border-y border-neutral-200 dark:border-neutral-800">
        <ParallaxText baseVelocity={-5}>{home.marqueeLeft}</ParallaxText>
        <ParallaxText baseVelocity={5}>{home.marqueeRight}</ParallaxText>
      </div>
      <div className="py-10 lg:py-20">
        <Capabilities items={home.capabilities} />
      </div>
      <FeaturedReel projects={featured} />
      <AboutNarrative
        text={home.aboutText}
        ctaLabel={home.aboutCtaLabel}
        ctaHref={home.aboutCtaHref}
      />
    </div>
  );
}
