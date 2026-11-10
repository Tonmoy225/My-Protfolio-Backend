'use client';
import { useEffect } from 'react';
import { api } from '@/lib/api';

// Tells the server a visitor opened the site (once per browser session).
// The server reads the visitor's IP from the request itself.
export default function Tracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem('tracked')) return;
      sessionStorage.setItem('tracked', '1');
    } catch {}
    api('/api/visitors/track', {
      method: 'POST',
      body: { path: window.location.pathname, referrer: document.referrer },
    }).catch(() => {});
  }, []);
  return null;
}
