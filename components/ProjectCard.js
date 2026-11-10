'use client';
import { useState } from 'react';
import { FaArrowUpRightFromSquare, FaChevronLeft, FaChevronRight, FaGithub, FaImages, FaXmark } from 'react-icons/fa6';
import { getIcon } from '@/lib/icons';
import { imgUrl } from '@/lib/api';

export default function ProjectCard({ p }) {
  const [open, setOpen] = useState(null); // index of the screenshot being previewed
  const Icon = getIcon(p.icon);
  const shots = (p.screenshots || []).map(imgUrl);

  const next = () => setOpen((open + 1) % shots.length);
  const prev = () => setOpen((open - 1 + shots.length) % shots.length);

  return (
    <article className="card flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      {shots.length > 0 && (
        <button type="button" onClick={() => setOpen(0)} className="-mx-6 -mt-6 mb-5 block overflow-hidden">
          <img src={shots[0]} alt={p.title} className="h-48 w-full object-cover object-top" />
        </button>
      )}

      <div className="flex items-start gap-4">
        {p.iconImage ? (
          <img src={imgUrl(p.iconImage)} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-indigo-500 text-lg text-white">
            <Icon />
          </span>
        )}
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

      <div className="mt-auto flex flex-wrap gap-3 pt-5">
        {shots.length > 0 && (
          <button type="button" onClick={() => setOpen(0)} className="btn-outline"><FaImages /> Preview</button>
        )}
        {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline"><FaGithub /> GitHub</a>}
        {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary"><FaArrowUpRightFromSquare /> Live Demo</a>}
      </div>

      {open !== null && (
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-slate-950/90 p-4">
          <button type="button" onClick={() => setOpen(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <FaXmark />
          </button>
          <p className="text-sm font-semibold text-white">{p.title}</p>
          <div onClick={(e) => e.stopPropagation()} className="flex w-full max-w-5xl items-center justify-center gap-3">
            {shots.length > 1 && (
              <button type="button" onClick={prev} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><FaChevronLeft /></button>
            )}
            <img src={shots[open]} alt={p.title} className="max-h-[75vh] min-w-0 max-w-full rounded-lg bg-white object-contain" />
            {shots.length > 1 && (
              <button type="button" onClick={next} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"><FaChevronRight /></button>
            )}
          </div>
          <p className="text-sm text-slate-300">{open + 1} / {shots.length}</p>
        </div>
      )}
    </article>
  );
}