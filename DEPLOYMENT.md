# DEPLOYMENT GUIDE

## STEP 1 — SET UP SUPABASE

1. Go to https://supabase.com and create a new project.
2. Choose a region close to you (e.g. Southeast Asia → Singapore).
3. Save your database password somewhere safe.
4. Once the project is ready, go to Settings → API and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret — never expose it publicly)

5. Go to SQL Editor → New Query.
   Paste the entire contents of `supabase/schema.sql` → Run.
   Then paste `supabase/seed.sql` → Run.

6. Go to Authentication → Users → Add User.
   Enter the admin email and password you will use to log in.
   (This is the only login that will ever exist for this site.)

7. Go to Storage → Buckets.
   Confirm the "portfolio-assets" bucket was created by the schema.
   If not, create it manually: name = portfolio-assets, public = true.

---

## STEP 2 — SET UP LOCAL DEVELOPMENT

1. Clone or unzip the project.
2. Run: `npm install`
3. Copy `.env.example` to `.env.local`:
   ```
   cp .env.example .env.local
   ```
4. Fill in `.env.local` with your Supabase values from Step 1.
5. Run: `npm run dev`
6. Open http://localhost:3000 — the public site should show seed data.
7. Open http://localhost:3000/admin/login — log in with your admin credentials.
8. Test: add a new item using a Canva link, confirm it appears on the public site.

---

## STEP 3 — DEPLOY TO VERCEL

1. Push the project to a GitHub repository (public or private).
2. Go to https://vercel.com → New Project → Import from GitHub.
3. Select your repository.
4. Framework Preset: Next.js (auto-detected).
5. Under Environment Variables, add all values from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to your Vercel URL after the first deploy)
   - `NEXT_PUBLIC_ADMIN_EMAIL`
6. Click Deploy.
7. After the deploy completes, copy the Vercel URL (e.g. yourname.vercel.app).
8. Go back to Vercel → Settings → Environment Variables.
   Update `NEXT_PUBLIC_SITE_URL` to your actual Vercel URL → Redeploy.

---

## STEP 4 — CONNECT A CUSTOM DOMAIN (optional)

1. Buy a domain from Namecheap, GoDaddy, Cloudflare, or similar.
2. In Vercel → Project → Settings → Domains → Add domain.
3. Vercel shows DNS records to add (usually a CNAME or A record).
4. Add those records in your domain registrar's DNS settings.
5. Wait 5–30 minutes for DNS to propagate.
6. Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables to your custom domain.
7. Redeploy.

---

## STEP 5 — ADD SUPABASE CORS FOR PRODUCTION

1. In Supabase → Authentication → URL Configuration.
2. Add your Vercel URL to "Site URL": `https://yourname.vercel.app`
3. Add to "Redirect URLs": `https://yourname.vercel.app/admin`
4. If using a custom domain, add that too.
5. Save.

---

## STEP 6 — FINAL CHECKS

- [ ] Public site loads at your domain
- [ ] Admin login works at /admin/login
- [ ] Can paste a Canva link, see live preview, publish, and have it appear on site
- [ ] Can drag and drop a file, upload, publish, and have it appear on site
- [ ] Drag-to-reorder works in /admin/items
- [ ] Contact form submits and appears in /admin/messages
- [ ] Site looks correct on mobile
- [ ] All images load (no broken assets)
