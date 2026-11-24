import { json, tokenFor } from './_shared.mjs';

export default async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });
  let body;
  try { body = await request.json(); } catch { return json(400, { error: 'Invalid JSON body' }); }
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET) {
    return json(503, { error: 'Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SECRET in Netlify environment variables.' });
  }
  if (typeof body.password !== 'string' || body.password !== process.env.ADMIN_PASSWORD) {
    return json(401, { error: 'Incorrect admin password' });
  }
  return json(200, { token: tokenFor() });
};
