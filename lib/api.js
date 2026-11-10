export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || 'Request failed');
  return json;
}

// Images uploaded from the admin dashboard are saved as /uploads/xxx on the server
export const imgUrl = (u) => (u && u.startsWith('/uploads/') ? API + u : u);
