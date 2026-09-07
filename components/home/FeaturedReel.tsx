"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/data";

const CARD_COLORS = ["bg-neutral-900", "bg-neutral-800", "bg-accent"];

export default function FeaturedReel({ projects }: { projects: Project[] }) {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  if (!projects.length) {
    return null;
  }

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10 px-10 md:px-20 items-center">
          {projects.map((project, index) => (
            <Link href={`/work/${project.slug}`} key={project.id} className="block group flex-shrink-0">
              <div
                className={`h-[50vh] lg:h-[70vh] w-[85vw] md:w-[70vw] lg:w-[60vw] ${project.featuredColor || CARD_COLORS[index % CARD_COLORS.length]} flex flex-col justify-end p-8 md:p-12 relative overflow-hidden transition-transform duration-500 group-hover:scale-[0.98] rounded-sm`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                <span className="absolute top-8 left-8 md:top-12 md:left-12 text-white/30 text-sm font-mono uppercase tracking-widest z-10 border border-white/20 px-3 py-1 rounded-full">
                  0{index + 1}
                </span>

                <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white mb-4 leading-[0.9]">
                    {project.featuredTitle || project.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-accent" />
                    <p className="uppercase tracking-widest text-white/80 text-xs md:text-sm font-medium">
                      {project.featuredLabel || project.category}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
