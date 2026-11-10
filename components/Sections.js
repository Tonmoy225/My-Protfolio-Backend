import { FaArrowUpRightFromSquare, FaAward, FaBuildingColumns, FaGithub, FaStar } from 'react-icons/fa6';
import { getIcon } from '@/lib/icons';

function Heading({ title, sub }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">{title}</h2>
      {sub && <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">{sub}</p>}
      <div className="mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-brand to-indigo-500" />
    </div>
  );
}

function Wrap({ id, children }) {
  return (
    <section id={id} className="px-5 py-20">
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function About({ about, profile }) {
  return (
    <Wrap id="about">
      <Heading title="About Me" sub={about.sub} />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-slate-600 dark:text-slate-400">
          {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {profile.cvUrl && (
            <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="btn-primary mt-2">Download CV</a>
          )}
        </div>
        <div className="card divide-y divide-slate-200 py-2 dark:divide-slate-800">
          {about.info.map((row) => (
            <div key={row.key} className="flex justify-between gap-4 py-3 text-sm">
              <span className="text-slate-500 dark:text-slate-400">{row.key}</span>
              <span className="text-right font-medium text-slate-800 dark:text-slate-100">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

export function Skills({ skills }) {
  return (
    <Wrap id="skills">
      <Heading title="Technical Skills" sub="My current tech stack: the tools I use to build real products." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((cat) => {
          const Icon = getIcon(cat.icon);
          return (
            <div key={cat.title} className="card">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand-dark dark:text-brand"><Icon /></span>
                <h3 className="font-bold text-slate-900 dark:text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <span key={s} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">{s}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Wrap>
  );
}

export function Projects({ projects }) {
  return (
    <Wrap id="projects">
      <Heading title="Key Projects" sub="Real projects built with real tech, from ML models to full-stack web apps." />
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p) => {
          const Icon = getIcon(p.icon);
          return (
            <article key={p.title} className="card flex flex-col transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-indigo-500 text-lg text-white"><Icon /></span>
                <div>
                  <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="mt-1 font-mono text-xs text-brand-dark dark:text-brand">{p.stack}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.desc}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
                {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800 dark:bg-sky-500/15 dark:text-sky-300">{t}</span>
                ))}
              </div>
              <div className="mt-auto flex gap-3 pt-5">
                {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline"><FaGithub /> GitHub</a>}
                {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary"><FaArrowUpRightFromSquare /> Live Demo</a>}
              </div>
            </article>
          );
        })}
      </div>
    </Wrap>
  );
}

export function Education({ education }) {
  return (
    <Wrap id="education">
      <Heading title="Education" sub="My formal academic journey in Computer Science & Engineering." />
      <div className="relative space-y-6 border-l-2 border-brand/40 pl-6">
        {education.map((e) => (
          <div key={e.degree} className="relative">
            <span className="absolute -left-[33px] top-6 h-4 w-4 rounded-full border-4 border-white bg-brand dark:border-slate-950" />
            <div className="card">
              <div className="text-sm font-semibold text-brand-dark dark:text-brand">{e.year}</div>
              <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{e.degree}</h3>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><FaBuildingColumns /> {e.inst}</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2"><FaStar className="text-amber-500" /> {e.meta1}</span>
                <span>{e.meta2}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

export function Achievements({ achievements }) {
  return (
    <Wrap id="achievements">
      <Heading title="Achievements & Certifications" sub="Milestones and credentials earned along the way." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a) => (
          <div key={a.title} className="card flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400"><FaAward /></span>
            <div>
              {a.link ? (
                <a href={a.link} target="_blank" rel="noreferrer" className="font-semibold text-slate-900 hover:text-brand-dark dark:text-white dark:hover:text-brand">{a.title}</a>
              ) : (
                <div className="font-semibold text-slate-900 dark:text-white">{a.title}</div>
              )}
              <div className="text-sm text-slate-500 dark:text-slate-400">{a.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

export function Activities({ activities }) {
  return (
    <Wrap id="activities">
      <Heading title="Extracurricular Activities" sub="Communities and activities that shape me as a developer and person." />
      <div className="grid gap-6 md:grid-cols-2">
        {activities.map((c) => (
          <div key={c.org} className="card">
            <div className="text-sm font-semibold text-brand-dark dark:text-brand">{c.period}</div>
            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{c.org}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{c.role}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
              {c.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Wrap>
  );
}
