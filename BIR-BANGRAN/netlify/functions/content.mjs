import { json, store } from './_shared.mjs';

export default async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });
  try {
    const page = new URL(request.url).searchParams.get('page');
    const blobStore = store();
    const all = await blobStore.list();
    const rows = [];
    for (const item of all.blobs) {
      const record = await blobStore.get(item.key, { type: 'json' });
      if (record && record.is_published && (!page || record.page_slug === page)) rows.push(record);
    }
    rows.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    return json(200, { records: rows });
  } catch (error) {
    console.error('Public content load failed:', error);
    return json(500, { error: 'Unable to load content' });
  }
};
