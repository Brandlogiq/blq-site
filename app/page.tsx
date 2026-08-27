import Hero from "@/components/home/Hero";
import Capabilities from "@/components/home/Capabilities";
import FeaturedReel from "@/components/home/FeaturedReel";
import AboutNarrative from "@/components/home/AboutNarrative";
import ParallaxText from "@/components/ui/ParallaxText";

export default function Home() {
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
      <FeaturedReel />
      <AboutNarrative />
    </div>
  );
}
