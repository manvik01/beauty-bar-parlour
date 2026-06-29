# Beauty Bar Parlour

## Deployment on Vercel

This project is configured to be easily deployed on Vercel. Follow these steps to deploy:

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Go to [Vercel](https://vercel.com) and sign in or create an account
3. Click "New Project" and import your repository
4. Select the repository you want to deploy
5. Keep all default settings as the project is already configured for Vercel
6. Click "Deploy"

Vercel will automatically build and deploy your site. Once deployed, you'll receive a URL where your site is live.

## Local Development

```bash
# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customer enquiry form: email notifications

The `/contact` page submits leads through `POST /api/enquiry`, which validates the data and generates a lead reference (`BBP-YYYYMMDD-XXXX`). Emails to `enquiry@beautybarparlour.com` are dispatched by **one** of two providers — pick whichever fits your setup and add the matching env var(s) in Vercel → Project Settings → Environment Variables.

### Option A — Web3Forms (no DNS, browser-side)

Web3Forms' free tier only accepts browser submissions, so the call happens client-side. Their access keys are designed to be public (each one is locked to a single verified inbox and they handle spam protection on their side).

1. Go to <https://web3forms.com/>, sign in with `enquiry@beautybarparlour.com`.
2. Create an access key (delivery is bound to that inbox).
3. (Optional) Enable **Autoresponder** in the dashboard to auto-send a confirmation to the customer.
4. In Vercel add (for Production and Preview):
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — your access key.

> The `NEXT_PUBLIC_` prefix is required so Next.js exposes the key to the browser bundle. Don't use `WEB3FORMS_ACCESS_KEY` (no prefix) — the form won't see it.

### Option B — Resend (server-side, branded emails from your domain)

1. Sign up at <https://resend.com/>, verify the `beautybarparlour.com` domain by adding the three DNS records they show.
2. Create an API key.
3. In Vercel add:
   - `RESEND_API_KEY` — your Resend key.
   - `BBP_STAFF_EMAIL` *(optional)* — destination; defaults to `enquiry@beautybarparlour.com`.
   - `BBP_FROM_EMAIL` *(optional)* — sender; defaults to `Beauty Bar Parlour <enquiry@beautybarparlour.com>`. Must be on a verified domain.

If **Resend** is configured server-side, it dispatches both the staff email *and* a branded customer confirmation. If only **Web3Forms** is configured, the browser fires the staff email and (optionally) Web3Forms' Autoresponder handles the customer reply. If both are set, the server-side Resend send wins and the browser skips Web3Forms to avoid duplicates. If neither is set, the lead is still captured (and a warning is logged in the Vercel function logs), but no email goes out.

### Local development

Create a `.env.local` (already gitignored) with the same keys to test against `npm run dev`. The form submits to `/api/enquiry` and then hits Web3Forms from the browser exactly as it does in production.
