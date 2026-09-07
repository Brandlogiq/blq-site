import { getProjectBySlug, getProjects } from "@/lib/projects";
import { getWorkContent } from "@/lib/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ProjectGallery from "@/components/work/ProjectGallery";
import VideoBackground from "@/components/ui/VideoBackground";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export const dynamicParams = true;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, projects, work] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
    getWorkContent(),
  ]);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="h-[80vh] relative overflow-hidden flex flex-col justify-end p-6 md:p-12 border-b border-neutral-200 dark:border-neutral-800">
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 -z-10">
          <div className="w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
        <VideoBackground src={project.videoUrl} poster={project.coverImage} />
        
        <div className={`relative z-10 max-w-7xl w-full mx-auto ${(project.videoUrl || project.coverImage) ? "text-white" : ""}`}>
          <Link 
            href="/work" 
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest mb-8 hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} /> {work.backLabel}
          </Link>
          <h1 className="text-[10vw] md:text-[8vw] font-bold uppercase tracking-tighter leading-none mb-4">
            {project.title}
          </h1>
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 text-sm uppercase tracking-widest opacity-80">
            <div>
              <span className="block opacity-60 mb-1">{work.clientLabel}</span>
              {project.client}
            </div>
            <div>
              <span className="block opacity-60 mb-1">{work.yearLabel}</span>
              {project.year}
            </div>
            <div>
              <span className="block opacity-60 mb-1">{work.categoryLabel}</span>
              {project.category}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Services List */}
          <div className="md:col-span-4">
            <h3 className="text-sm uppercase tracking-widest opacity-50 mb-6">{work.servicesLabel}</h3>
            <ul className="space-y-2">
              {project.services.map((service) => (
                <li key={service} className="text-lg md:text-xl font-medium border-b border-neutral-200 dark:border-neutral-800 py-2">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="md:col-span-8">
            <h3 className="text-sm uppercase tracking-widest opacity-50 mb-6">{work.briefLabel}</h3>
            <p className="text-2xl md:text-4xl leading-tight font-medium">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <ProjectGallery images={project.gallery || []} heading={work.galleryLabel} />

      {nextProject && (
        <section className="px-6 md:px-12 py-20 border-t border-neutral-200 dark:border-neutral-800 mt-20">
          <Link href={`/work/${nextProject.slug}`} className="group block">
            <span className="text-sm uppercase tracking-widest opacity-50 mb-4 block">{work.nextLabel}</span>
            <div className="flex items-center justify-between">
              <h2 className="text-[6vw] font-bold uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">
                {nextProject.title}
              </h2>
              <ArrowRight className="w-12 h-12 md:w-20 md:h-20 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
          </Link>
        </section>
      )}
    </article>
  );
}
