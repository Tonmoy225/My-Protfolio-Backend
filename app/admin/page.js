'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import defaultData from '@/lib/defaultData.json';
import { ObjectEditor, ListEditor } from '@/components/Editor';
import ThemeToggle from '@/components/ThemeToggle';

const T = (key, label) => ({ key, label, type: 'text' });
const A = (key, label) => ({ key, label, type: 'area' });
const L = (key, label) => ({ key, label, type: 'lines' });

// Each tab: where its data lives in the portfolio object and which fields to show
const sections = {
  profile: { label: 'Profile & Hero', kind: 'object', path: 'profile', fields: [
    T('fullName', 'Full name'), T('firstLine', 'Hero first line'), T('secondLine', 'Hero second line'),
    T('title', 'Title'), L('roles', 'Typing roles (one per line)'), T('badge', 'Badge text'),
    A('heroDesc', 'Hero description'), T('location', 'Location'), T('photoUrl', 'Photo URL (e.g. /photo.jpg)'),
    T('cvUrl', 'CV link'), T('email', 'Email'), T('phone', 'Phone'), T('phone2', 'Second phone'),
    T('github', 'GitHub URL'), T('linkedin', 'LinkedIn URL'),
  ] },
  stats: { label: 'Stats', kind: 'list', path: 'stats', titleKey: 'label', fields: [T('num', 'Number'), T('label', 'Label')], newItem: () => ({ num: '', label: '' }) },
  about: { label: 'About', kind: 'about' },
  skills: { label: 'Skills', kind: 'list', path: 'skills', titleKey: 'title', fields: [T('title', 'Category'), { key: 'icon', label: 'Icon', type: 'icon' }, L('items', 'Skills (one per line)')], newItem: () => ({ title: '', icon: 'code', items: [] }) },
  projects: { label: 'Projects', kind: 'list', path: 'projects', titleKey: 'title', fields: [
    T('title', 'Title'), { key: 'icon', label: 'Icon', type: 'icon' }, T('stack', 'Tech stack line'), A('desc', 'Description'),
    L('bullets', 'Bullet points (one per line)'), L('tags', 'Tags (one per line)'), T('github', 'GitHub link'), T('live', 'Live demo link'),
  ], newItem: () => ({ title: '', icon: 'code', stack: '', desc: '', bullets: [], tags: [], github: '', live: '' }) },
  education: { label: 'Education', kind: 'list', path: 'education', titleKey: 'degree', fields: [T('year', 'Years'), T('degree', 'Degree'), T('inst', 'Institution'), T('meta1', 'Result / GPA'), T('meta2', 'Extra line')], newItem: () => ({ year: '', degree: '', inst: '', meta1: '', meta2: '' }) },
  achievements: { label: 'Achievements', kind: 'list', path: 'achievements', titleKey: 'title', fields: [T('title', 'Title'), T('sub', 'Issuer and year'), T('link', 'Certificate link (optional)')], newItem: () => ({ title: '', sub: '', link: '' }) },
  activities: { label: 'Activities', kind: 'list', path: 'activities', titleKey: 'org', fields: [T('org', 'Organization'), T('role', 'Role'), T('period', 'Period'), L('bullets', 'Bullet points (one per line)')], newItem: () => ({ org: '', role: '', period: '', bullets: [] }) },
};

const fmt = (d) => new Date(d).toLocaleString();
const device = (ua = '') => {
  const os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iOS' : /Windows/i.test(ua) ? 'Windows' : /Mac/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'Other';
  const br = /Edg/i.test(ua) ? 'Edge' : /Chrome/i.test(ua) ? 'Chrome' : /Firefox/i.test(ua) ? 'Firefox' : /Safari/i.test(ua) ? 'Safari' : 'Browser';
  return `${br} on ${os}`;
};

export default function Admin() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('profile');
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [unseen, setUnseen] = useState(0);
  const [messages, setMessages] = useState([]);
  const [toast, setToast] = useState('');
  const lastCount = useRef(null);

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  }, [router]);

  // Load token + portfolio
  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) return router.push('/admin/login');
    setToken(t);
    api('/api/portfolio').then(setData).catch(() => setData(defaultData));
  }, [router]);

  const loadVisitors = useCallback(async () => {
    if (!token) return;
    try {
      const r = await api('/api/visitors', { token });
      setVisitors(r.visitors);
      setUnseen(r.unseen);
      // Notify when a new visitor arrives while the dashboard is open
      if (lastCount.current !== null && r.unseen > lastCount.current) {
        const v = r.visitors[0];
        const text = `New visitor: ${v.ip} at ${fmt(v.createdAt)}`;
        setToast(text);
        setTimeout(() => setToast(''), 6000);
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') new Notification('Portfolio visitor', { body: text });
      }
      lastCount.current = r.unseen;
    } catch (e) {
      if (/login|Session/i.test(e.message)) logout();
    }
  }, [token, logout]);

  const loadMessages = useCallback(async () => {
    if (!token) return;
    try { setMessages(await api('/api/contact', { token })); } catch {}
  }, [token]);

  useEffect(() => {
    if (!token) return;
    loadVisitors();
    loadMessages();
    const id = setInterval(loadVisitors, 15000);
    return () => clearInterval(id);
  }, [token, loadVisitors, loadMessages]);

  async function save() {
    setSaving(true);
    setMsg('');
    try {
      await api('/api/portfolio', { method: 'PUT', body: data, token });
      setMsg('Saved. Your website is updated.');
    } catch (e) {
      setMsg(e.message);
    }
    setSaving(false);
  }

  async function markSeen() {
    await api('/api/visitors/mark-seen', { method: 'POST', token });
    lastCount.current = 0;
    loadVisitors();
  }

  if (!data) return <p className="p-8">Loading...</p>;

  const s = sections[tab];
  const setPath = (path, v) => setData({ ...data, [path]: v });
  const tabs = [...Object.keys(sections), 'messages', 'visitors'];
  const tabLabel = (k) => (sections[k] ? sections[k].label : k === 'messages' ? 'Messages' : 'Visitors');
  const unreadMsgs = messages.filter((m) => !m.seen).length;

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Portfolio admin</h1>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="btn-outline">View site</a>
          <ThemeToggle />
          <button onClick={logout} className="btn-outline">Logout</button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((k) => (
          <button key={k} onClick={() => { setTab(k); setMsg(''); }} className={tab === k ? 'btn-primary' : 'btn-outline'}>
            {tabLabel(k)}
            {k === 'visitors' && unseen > 0 && <span className="rounded-full bg-red-500 px-2 text-xs text-white">{unseen}</span>}
            {k === 'messages' && unreadMsgs > 0 && <span className="rounded-full bg-red-500 px-2 text-xs text-white">{unreadMsgs}</span>}
          </button>
        ))}
      </div>

      {s && (
        <>
          {s.kind === 'object' && <ObjectEditor fields={s.fields} value={data[s.path]} onChange={(v) => setPath(s.path, v)} />}
          {s.kind === 'list' && <ListEditor fields={s.fields} items={data[s.path]} titleKey={s.titleKey} newItem={s.newItem} onChange={(v) => setPath(s.path, v)} />}
          {s.kind === 'about' && (
            <div className="space-y-6">
              <ObjectEditor
                fields={[T('sub', 'Subtitle'), { key: 'paragraphs', label: 'Paragraphs (separate with a blank line)', type: 'paras' }]}
                value={data.about}
                onChange={(v) => setPath('about', { ...data.about, ...v })}
              />
              <h2 className="font-bold text-slate-900 dark:text-white">Info table</h2>
              <ListEditor fields={[T('key', 'Label'), T('value', 'Value')]} items={data.about.info} titleKey="key" newItem={() => ({ key: '', value: '' })} onChange={(v) => setPath('about', { ...data.about, info: v })} />
            </div>
          )}
          <div className="sticky bottom-4 mt-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-white/90 p-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
            <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">{saving ? 'Saving...' : 'Save changes'}</button>
            {msg && <span className="text-sm text-slate-600 dark:text-slate-300">{msg}</span>}
          </div>
        </>
      )}

      {tab === 'messages' && (
        <div className="space-y-4">
          {messages.length === 0 && <p className="text-slate-500">No messages yet.</p>}
          {messages.map((m) => (
            <div key={m._id} className="card space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-slate-900 dark:text-white">{m.subject || 'No subject'} {!m.seen && <span className="ml-2 rounded bg-red-500 px-1.5 text-xs text-white">new</span>}</span>
                <span className="text-xs text-slate-500">{fmt(m.createdAt)}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">From <b>{m.name}</b> (<a className="text-brand-dark dark:text-brand" href={`mailto:${m.email}`}>{m.email}</a>) · IP {m.ip}</p>
              <p className="whitespace-pre-wrap pt-2 text-sm text-slate-700 dark:text-slate-200">{m.message}</p>
              <div className="flex gap-2 pt-2">
                {!m.seen && <button className="btn-outline px-3 py-1" onClick={async () => { await api(`/api/contact/${m._id}/seen`, { method: 'PATCH', token }); loadMessages(); }}>Mark read</button>}
                <button className="btn-outline px-3 py-1 text-red-600" onClick={async () => { if (confirm('Delete this message?')) { await api(`/api/contact/${m._id}`, { method: 'DELETE', token }); loadMessages(); } }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'visitors' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={markSeen} className="btn-primary">Mark all seen</button>
            <button onClick={() => typeof Notification !== 'undefined' && Notification.requestPermission()} className="btn-outline">Enable browser notifications</button>
            <button onClick={async () => { if (confirm('Delete all visitor records?')) { await api('/api/visitors', { method: 'DELETE', token }); lastCount.current = 0; loadVisitors(); } }} className="btn-outline text-red-600">Clear all</button>
            <span className="text-sm text-slate-500">Refreshes every 15 seconds</span>
          </div>
          <div className="card overflow-x-auto p-0">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs text-slate-500 dark:border-slate-800">
                <tr><th className="p-3">IP address</th><th className="p-3">Date & time</th><th className="p-3">Page</th><th className="p-3">Device</th><th className="p-3">Came from</th></tr>
              </thead>
              <tbody>
                {visitors.length === 0 && <tr><td className="p-3 text-slate-500" colSpan={5}>No visitors yet.</td></tr>}
                {visitors.map((v) => (
                  <tr key={v._id} className={`border-b border-slate-100 dark:border-slate-800 ${v.seen ? '' : 'bg-brand/10'}`}>
                    <td className="p-3 font-mono">{v.ip}</td>
                    <td className="p-3 whitespace-nowrap">{fmt(v.createdAt)}</td>
                    <td className="p-3">{v.path}</td>
                    <td className="p-3 whitespace-nowrap">{device(v.userAgent)}</td>
                    <td className="p-3 max-w-[200px] truncate">{v.referrer || 'Direct'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {toast && <div className="fixed right-5 top-5 z-50 rounded-xl bg-navy px-4 py-3 text-sm text-white shadow-xl">{toast}</div>}
    </div>
  );
}
