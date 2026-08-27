"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/data";

export default function ProjectList() {
  const [filter, setFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div>
      <div className="flex gap-6 mb-12 text-sm uppercase tracking-widest sticky top-24 z-20 bg-background/80 backdrop-blur-sm py-4">
        {["All", "Client", "Ventures"].map((f) => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`${filter === f ? "text-accent" : "opacity-50 hover:opacity-100"} transition-all relative group`}
          >
            {f}
            {filter === f && (
              <motion.div 
                layoutId="filter-active"
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project) => (
            <Link 
              href={`/work/${project.slug}`} 
              key={project.id}
              data-cursor="view"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="border-t border-neutral-200 dark:border-neutral-800 py-8 lg:py-12 px-4 md:px-8 flex justify-between items-center group cursor-pointer relative overflow-hidden"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex flex-col gap-2 relative z-10">
                  <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-6 group-hover:text-white dark:group-hover:text-white">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-20px] group-hover:translate-x-6 text-accent">
                    <div className="h-[1px] w-8 bg-current" />
                    <span className="text-xs uppercase tracking-[0.3em] font-medium">View Project</span>
                  </div>
                </div>
                
                <div className="text-right relative z-10 pr-4 md:pr-8">
                  <span className="text-xs md:text-sm uppercase tracking-widest opacity-50 group-hover:opacity-100 group-hover:text-white transition-all duration-500 block mb-2 font-medium">
                    {project.client}
                  </span>
                  <span className="text-[10px] md:text-xs font-mono opacity-40 uppercase group-hover:text-white/70 transition-colors block">
                    {project.year}
                  </span>
                </div>
                
                {/* Reveal Background on Hover */}
                <motion.div 
                  className="absolute inset-0 z-0 bg-[#0a0a0a] dark:bg-neutral-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]"
                />
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
