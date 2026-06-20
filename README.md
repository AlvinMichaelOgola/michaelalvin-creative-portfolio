# Michael Alvin Creative Portfolio

This portfolio reads its hero, gallery, videos, gear, footer, and site contact data from the CMS-backed Supabase project.

Create a `.env.local` file in this folder with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_STORAGE_BUCKET=gallery
```

## Performance guardrails

Run the performance budget check before release:

```bash
npm run perf:budget
```

Current gzip budgets:

- `main-js` (`index-*.js`): <= 60kb
- `cms-content-js` (`cms-content-*.js`): <= 60kb
- `main-css` (`index-*.css`): <= 14kb

## Release checklist (mobile-first)

1. iOS Safari and Android Chrome sanity pass on hero, gallery, videos, and contact modal.
2. Confirm no horizontal overflow at 360px width.
3. Verify gallery/video media stays lazy until needed.
4. Run `npm run perf:budget` and keep all checks passing.

## Supabase image compression webhook

Edge Function path:

- `supabase/functions/compress-image/index.ts`

Deploy command:

```bash
supabase functions deploy compress-image --no-verify-jwt
```

Required secret before it will accept webhook calls:

```bash
supabase secrets set WEBHOOK_SECRET=<a-random-string-I-generate>
```

After deploy, create a **Database Webhook** in Supabase Dashboard:

1. Go to **Database > Webhooks**
2. Table: `storage.objects`
3. Schema: `storage`
4. Event: **Insert only**
5. Type: **HTTP request**
6. URL: your deployed `compress-image` function URL
7. Add header: `x-webhook-secret` = same value as `WEBHOOK_SECRET`

## Supabase user invite function (CMS admin)

Edge Function path:

- `supabase/functions/invite-cms-user/index.ts`

Deploy command:

```bash
supabase functions deploy invite-cms-user
```

This function is called by the CMS Users page to invite users by email, create/update their
`profiles` row, and assign role (`admin`, `editor`, or `viewer`). It only allows callers whose
`profiles.role` is `admin`.

## CMS image delivery settings column

Run this SQL migration so the CMS Site Settings page can persist image compression parameters:

```bash
supabase db push
```

Migration file:

- `supabase/migrations/20260620_add_image_delivery_settings.sql`
