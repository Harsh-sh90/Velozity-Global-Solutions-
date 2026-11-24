# Bir Bangran — Cinematic Digital Heritage V5

This is a self-contained, beginner-friendly major-project prototype.

## Main experience

The entire page shares one cinematic village background. Scroll controls one continuous day:

Sunrise → Daytime → Golden Sunset → Moonrise → Night.

When the user stops scrolling, the scene is still alive through:
- moving clouds
- flying birds
- subtle village depth/parallax
- stars
- fireflies at night
- village lights appearing at night
- gentle background movement

## Working features

- Responsive navigation
- Hero landing experience
- Scroll-driven world
- Heroes database in JavaScript
- Search and category filters
- Hero detail modal
- Digital archive filters
- Archive lightbox
- Historical timeline
- Animated statistics
- Heritage AI demo
- Express API endpoint for AI demo
- Contribution form using localStorage
- Demo admin dashboard
- Mobile responsive design
- Reduced-motion support

## Run

Install Node.js 18+.

Then:

```bash
npm install
npm start
```

Open:

http://localhost:3000

The project uses a tiny Express server so the Heritage AI demo can call `/api/ask`.

## Important

People, dates and stories in the starter are placeholders. They must be replaced with verified Bir Bangran information before being presented as real history.

## How to make the AI real

The `/api/ask` route is deliberately simple. For the final project:

1. Add PostgreSQL for heroes/events/archive.
2. Store documents/images in cloud storage.
3. Extract text from scanned documents using OCR.
4. Create embeddings/RAG over verified records.
5. Call an LLM only from the server.
6. Return source records with AI answers.
7. Add admin authentication and approval before publishing.

Never put an LLM secret/API key in `app.js` or any browser-side file.

## Folder structure

bir-bangran-v4/
- index.html
- styles.css
- app.js
- server.js
- package.json
- README.md

The code is intentionally kept in a small number of readable files so it is easy to understand during a college viva. As the project grows, split the data and UI into separate modules/components.


## V5 background architecture

The village world is a single fixed layer behind the entire document. Content sections are transparent/glass overlays, so the same village remains visible while the single sunrise-to-night timeline progresses. There are no per-section background resets.


## V6 additions

- Continuous full-page cinematic world remains behind all content.
- Interactive heritage map with clickable village points.
- Global search across heroes, archive items and timeline records.
- “Light a Memory” night interaction using localStorage.
- Admin demo reflects local submissions.
- Same lightweight architecture; no heavy 3D library required, making the project easy to explain and maintain.


## Contact Form
The contribution form validates required fields and posts to `/api/contact`. Submissions are kept in memory in demo mode; connect a database or email service before production use.
