import ProjectCard from './ProjectCard';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">Key Projects</h2>
          <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">Real projects built with real tech, from ML models to full-stack web apps.</p>
          <div className="mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-brand to-indigo-500" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>
      </div>
    </section>
  );
}