'use client';
import { useEffect, useState } from 'react';
import { FaCode, FaEnvelope, FaGithub, FaLinkedinIn, FaLocationDot } from 'react-icons/fa6';

export default function Hero({ profile, stats }) {
  const [text, setText] = useState('');
  const [photoOk, setPhotoOk] = useState(true);

  // Typing effect over the roles list
  useEffect(() => {
    const roles = profile.roles?.length ? profile.roles : [profile.title];
    let ri = 0, ci = 0, deleting = false, timer;
    function tick() {
      const cur = roles[ri];
      if (!deleting) {
        ci++;
        setText(cur.slice(0, ci));
        if (ci === cur.length) { deleting = true; timer = setTimeout(tick, 1800); return; }
      } else {
        ci--;
        setText(cur.slice(0, ci));
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      timer = setTimeout(tick, deleting ? 50 : 100);
    }
    tick();
    return () => clearTimeout(timer);
  }, [profile.roles, profile.title]);

  const initials = profile.fullName.split(' ').filter((w) => !w.endsWith('.')).map((w) => w[0]).slice(0, 2).join('');
  const social = 'flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:border-brand hover:text-brand-dark dark:border-slate-700 dark:text-slate-300 dark:hover:text-brand';

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 md:pt-40">
      <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-brand/20 blur-3xl dark:bg-brand/10" />
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[380px] w-[380px] rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-500/10" />

      <div className="relative mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 md:flex-row md:gap-16">
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {profile.badge}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Hi, I'm {profile.firstLine}
            <br />
            <span className="bg-gradient-to-r from-brand-dark to-indigo-500 bg-clip-text text-transparent dark:from-brand dark:to-indigo-400">
              {profile.secondLine}
            </span>
          </h1>

          <p className="mt-4 h-7 font-mono text-lg text-slate-500 dark:text-slate-400">
            {'< '}<span className="text-brand-dark dark:text-brand">{text}</span>{' />'}
          </p>

          <p className="mt-4 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">{profile.heroDesc}</p>

          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <FaLocationDot className="text-brand-dark dark:text-brand" /> {profile.location}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary"><FaCode /> View My Work</a>
            <a href="#contact" className="btn-outline"><FaEnvelope /> Contact Me</a>
          </div>

          <div className="mt-6 flex gap-3">
            <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub" className={social}><FaGithub /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className={social}><FaLinkedinIn /></a>
            <a href={`mailto:${profile.email}`} title="Email" className={social}><FaEnvelope /></a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-slate-200 pt-6 dark:border-slate-800">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-brand-dark dark:text-brand">{s.num}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative shrink-0">
          <div className="absolute -inset-3 rounded-full border border-dashed border-brand/40" />
          {photoOk ? (
            <img
              src={profile.photoUrl}
              alt={profile.fullName}
              onError={() => setPhotoOk(false)}
              className="h-56 w-56 rounded-full border-4 border-brand object-cover shadow-xl md:h-64 md:w-64"
            />
          ) : (
            <div className="flex h-56 w-56 items-center justify-center rounded-full border-4 border-brand bg-navy-mid text-6xl font-extrabold text-brand shadow-xl md:h-64 md:w-64">
              {initials}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
