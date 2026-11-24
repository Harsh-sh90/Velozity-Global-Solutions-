# BIR BANGRAN — Netlify-only Admin CMS

This build uses Netlify hosting, Netlify Functions and Netlify Blobs only. No Supabase/Firebase/external database is required.

## Deploy
1. Upload this complete project folder to a GitHub repository and import it into Netlify (recommended), or deploy the folder with Netlify CLI. Do not upload only the HTML files.
2. In Netlify: Site configuration → Environment variables, add:
   - `ADMIN_PASSWORD`: choose a long, unique admin password.
   - `ADMIN_SECRET`: a separate random secret (at least 32 random characters).
3. Trigger a new deploy after adding the variables.
4. Open `https://YOUR-SITE.netlify.app/admin` and sign in with the admin password.
5. Add details, select a section, and tick Publish. Published content appears on that section page for every visitor.

## Access and data
- Public visitors can only read published records.
- Create/update/delete endpoints require a signed admin token; the password and signing secret stay in Netlify environment variables and are never sent to browser code.
- Content and uploaded images are persisted in Netlify Blobs, not browser local storage, so changes are shared across devices and visitors.
- Admin sessions expire after 12 hours.
- Images are limited to 3 MB each.

## Important
Netlify Blobs is a Netlify service; ensure your Netlify site is deployed and Functions/Blobs are available for the site. Keep `ADMIN_PASSWORD` and `ADMIN_SECRET` private.


## Login function compatibility repair
The Netlify functions use the legacy `handler(event)` export so their `{ statusCode, headers, body }` responses are interpreted correctly by Netlify. Keep the Netlify Functions directory set to `netlify/functions` relative to this site base directory.
