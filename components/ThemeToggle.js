'use client';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
  }

  return (
    <button
      onClick={toggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 transition hover:border-brand hover:text-brand-dark dark:border-slate-700 dark:text-slate-200 dark:hover:text-brand"
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
