import { apiFetch } from '../api/api';

export const verifyGoogleToken = async (credential: string) => {
  const res = await apiFetch('/api/v1/auth/google', {
    method: 'POST',
    body: JSON.stringify({ credential }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.message || 'Google authentication failed.');
  }

  return res.json();
};
