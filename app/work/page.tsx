import ProjectList from "@/components/work/ProjectList";
import { getProjects } from "@/lib/projects";
import { getWorkContent } from "@/lib/site";

export default async function WorkPage() {
  const [projects, work] = await Promise.all([getProjects(), getWorkContent()]);

  return (
    <div className="pt-20 px-6 md:px-12 pb-20">
      <h1 className="text-[10vw] font-bold uppercase tracking-tighter leading-none mb-12">
        {work.title}
      </h1>
      <ProjectList
        projects={projects}
        filters={{
          all: work.filterAllLabel,
          client: work.filterClientLabel,
          ventures: work.filterVenturesLabel,
        }}
        viewLabel={work.viewProjectLabel}
      />
    </div>
  );
}
