'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { token } = await api('/api/auth/login', { method: 'POST', body: { email, password } });
      localStorage.setItem('admin_token', token);
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Admin login</h1>
        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        <button disabled={busy} className="btn-primary w-full justify-center disabled:opacity-60">{busy ? 'Signing in...' : 'Sign in'}</button>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      </form>
    </div>
  );
}
