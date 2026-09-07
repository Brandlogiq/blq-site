import ProjectList from "@/components/work/ProjectList";
import { getProjects } from "@/lib/projects";

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="pt-20 px-6 md:px-12 pb-20">
      <h1 className="text-[10vw] font-bold uppercase tracking-tighter leading-none mb-12">The Work</h1>
      <ProjectList projects={projects} />
    </div>
  );
}
