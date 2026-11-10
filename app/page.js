import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { About, Skills, Projects, Education, Achievements, Activities } from '@/components/Sections';
import Contact from '@/components/Contact';
import Tracker from '@/components/Tracker';
import defaultData from '@/lib/defaultData.json';
import { API } from '@/lib/api';

// Always fetch fresh data so admin changes show up immediately
export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const res = await fetch(`${API}/api/portfolio`, { cache: 'no-store' });
    if (!res.ok) throw new Error('bad response');
    return await res.json();
  } catch {
    return defaultData; // server down or not seeded yet
  }
}

export default async function Home() {
  const d = await getData();
  return (
    <>
      <Tracker />
      <Navbar name={d.profile.fullName} />
      <main>
        <Hero profile={d.profile} stats={d.stats} />
        <About about={d.about} profile={d.profile} />
        <Skills skills={d.skills} />
        <Projects projects={d.projects} />
        <Education education={d.education} />
        <Achievements achievements={d.achievements} />
        <Activities activities={d.activities} />
        <Contact profile={d.profile} />
      </main>
      <footer className="border-t border-slate-200 px-5 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>Designed & built by <span className="font-semibold text-slate-700 dark:text-slate-200">{d.profile.fullName}</span> · {d.profile.title} · {d.profile.location}</p>
        <p className="mt-1">© {new Date().getFullYear()} All rights reserved · {d.profile.email}</p>
      </footer>
    </>
  );
}
