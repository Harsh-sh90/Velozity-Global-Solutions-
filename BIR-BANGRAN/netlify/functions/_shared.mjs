import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

export const json = (status, data, extraHeaders = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders },
});

// Call this only from inside a Functions v2 request handler.
export const store = () => getStore('bir-bangran-content');

export function tokenFor() {
  const exp = Date.now() + 12 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ admin: true, exp })).toString('base64url');
  const secret = process.env.ADMIN_SECRET || '';
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

export function authorised(request) {
  try {
    const raw = request.headers.get('authorization') || '';
    const t = raw.replace(/^Bearer\s+/i, '');
    const [p, supplied] = t.split('.');
    if (!p || !supplied || !process.env.ADMIN_SECRET) return false;
    const expected = crypto.createHmac('sha256', process.env.ADMIN_SECRET).update(p).digest();
    const actual = Buffer.from(supplied, 'base64url');
    if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return false;
    return JSON.parse(Buffer.from(p, 'base64url').toString()).exp > Date.now();
  } catch { return false; }
}
