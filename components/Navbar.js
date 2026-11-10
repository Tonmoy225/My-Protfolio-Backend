'use client';
import { useEffect, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import ThemeToggle from './ThemeToggle';

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Education', '#education'],
  ['Achievements', '#achievements'],
];

export default function Navbar({ name }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const ids = [...links.map((l) => l[1].slice(1)), 'contact'];
    function onScroll() {
      let cur = '';
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) cur = id;
      });
      setActive(cur);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = (id) =>
    `text-sm font-medium transition hover:text-brand-dark dark:hover:text-brand ${
      active === id ? 'text-brand-dark dark:text-brand' : 'text-slate-600 dark:text-slate-300'
    }`;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur dark:border-slate-800 dark:bg-slate-950/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#" className="text-lg font-extrabold tracking-tight text-brand-dark dark:text-brand">
          {name.split(' ').slice(-2).join(' ')}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className={linkClass(href.slice(1))}>{label}</a>
          ))}
          <ThemeToggle />
          <a href="#contact" className="btn-primary">Hire Me</a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="text-xl text-slate-700 dark:text-slate-200">
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className={linkClass(href.slice(1))}>{label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-fit">Hire Me</a>
        </div>
      )}
    </nav>
  );
}
