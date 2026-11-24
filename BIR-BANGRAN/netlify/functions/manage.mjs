import { randomUUID } from 'node:crypto';
import { json, store, authorised } from './_shared.mjs';

export default async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (!authorised(request)) return json(401, { error: 'Admin login required' });

  try {
    // Blobs context is available because this is a Functions v2 default export.
    const blobStore = store();
    if (request.method === 'GET') {
      const all = await blobStore.list();
      const rows = [];
      for (const item of all.blobs) {
        const record = await blobStore.get(item.key, { type: 'json' });
        if (record) rows.push(record);
      }
      rows.sort((a, b) => String(a.page_slug || '').localeCompare(String(b.page_slug || '')) || (a.sort_order || 0) - (b.sort_order || 0));
      return json(200, { records: rows });
    }
    if (request.method === 'POST') {
      let recordInput;
      try { recordInput = await request.json(); } catch { return json(400, { error: 'Invalid JSON body' }); }
      if (!recordInput.title || !recordInput.details || !recordInput.page_slug) {
        return json(400, { error: 'Section, title and details are required' });
      }
      const id = recordInput.id || randomUUID();
      const record = { ...recordInput, id, updated_at: new Date().toISOString() };
      await blobStore.setJSON(id, record);
      return json(200, { record });
    }
    if (request.method === 'DELETE') {
      const id = new URL(request.url).searchParams.get('id');
      if (!id) return json(400, { error: 'Missing record id' });
      await blobStore.delete(id);
      return json(200, { ok: true });
    }
    return json(405, { error: 'Method not allowed' });
  } catch (error) {
    console.error('Admin content operation failed:', error);
    return json(500, { error: 'Could not save data. Check the Netlify function logs.' });
  }
};
