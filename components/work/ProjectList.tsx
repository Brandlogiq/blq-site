"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/data";

const ITEMS_PER_PAGE = 4;

export default function ProjectList({
  projects,
  filters,
  viewLabel,
}: {
  projects: Project[];
  filters: { all: string; client: string; ventures: string };
  viewLabel: string;
}) {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div>
      <div className="flex gap-6 mb-12 text-sm uppercase tracking-widest sticky top-24 z-20 bg-background/80 backdrop-blur-sm py-4">
        {[
          { value: "All", label: filters.all },
          { value: "Client", label: filters.client },
          { value: "Ventures", label: filters.ventures },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`${filter === f.value ? "text-accent" : "opacity-50 hover:opacity-100"} transition-all relative group`}
          >
            {f.label}
            {filter === f.value && (
              <motion.div
                layoutId="filter-active"
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col min-h-[40vh]">
        <AnimatePresence mode="wait">
          {pageProjects.map((project) => (
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
              >
                <div className="flex flex-col gap-2 relative z-10">
                  <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-6 group-hover:text-white dark:group-hover:text-white">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-20px] group-hover:translate-x-6 text-accent">
                    <div className="h-[1px] w-8 bg-current" />
                    <span className="text-xs uppercase tracking-[0.3em] font-medium">{viewLabel}</span>
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

                <motion.div className="absolute inset-0 z-0 bg-[#0a0a0a] dark:bg-neutral-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
              </motion.div>
            </Link>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="group flex items-center gap-4 text-sm uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Prev
          </button>

          <span className="text-sm font-mono tracking-widest opacity-50">
            {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
          </span>

          <button
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            className="group flex items-center gap-4 text-sm uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:text-accent transition-colors"
          >
            Next
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}
