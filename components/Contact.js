'use client';
import { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedinIn, FaLocationDot, FaPaperPlane, FaPhone } from 'react-icons/fa6';
import { api } from '@/lib/api';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', text: '' });
    try {
      await api('/api/contact', { method: 'POST', body: form });
      setStatus({ type: 'ok', text: 'Message sent! I will get back to you shortly.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'err', text: err.message });
    }
    setSending(false);
  }

  const items = [
    [FaEnvelope, 'Email', profile.email, `mailto:${profile.email}`],
    [FaPhone, 'Phone', [profile.phone, profile.phone2].filter(Boolean).join(' / '), `tel:${profile.phone}`],
    [FaLinkedinIn, 'LinkedIn', profile.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, ''), profile.linkedin],
    [FaGithub, 'GitHub', profile.github.replace(/^https?:\/\//, ''), profile.github],
    [FaLocationDot, 'Location', profile.location, null],
  ];

  return (
    <section id="contact" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">Get In Touch</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Open to full-time, remote, freelance, and internship opportunities.</p>
          <div className="mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-brand to-indigo-500" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">I'd love to hear from you</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Whether you have a job opening, a project to discuss, or just want to connect, my inbox is always open.
            </p>
            <div className="mt-6 space-y-4">
              {items.map(([Icon, label, value, href]) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-dark dark:text-brand"><Icon /></span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-800 hover:text-brand-dark dark:text-slate-100 dark:hover:text-brand">{value}</a>
                    ) : (
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="card space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Send a Message</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Your name" value={form.name} onChange={set('name')} className="input" />
              <input required type="email" placeholder="Email" value={form.email} onChange={set('email')} className="input" />
            </div>
            <input placeholder="Subject" value={form.subject} onChange={set('subject')} className="input" />
            <textarea required rows={5} placeholder="Hi Tonmoy, I'd like to discuss..." value={form.message} onChange={set('message')} className="input" />
            <button disabled={sending} className="btn-primary disabled:opacity-60">
              <FaPaperPlane /> {sending ? 'Sending...' : 'Send Message'}
            </button>
            {status.text && (
              <p className={`text-sm ${status.type === 'ok' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{status.text}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
