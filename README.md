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

The `/contact` page submits leads through `POST /api/enquiry`, which then emails the team at `enquiry@beautybarparlour.com`. Pick **one** provider and add the matching env var(s) in Vercel → Project Settings → Environment Variables.

### Option A — Web3Forms (no DNS setup)

1. Go to <https://web3forms.com/>, sign in with `enquiry@beautybarparlour.com`.
2. Create an access key (this binds delivery to that inbox).
3. (Optional) Enable **Autoresponder** in the dashboard to auto-send a confirmation to the customer.
4. In Vercel add:
   - `WEB3FORMS_ACCESS_KEY` — your access key.

### Option B — Resend (custom branded emails from your domain)

1. Sign up at <https://resend.com/>, verify the `beautybarparlour.com` domain by adding the three DNS records they show.
2. Create an API key.
3. In Vercel add:
   - `RESEND_API_KEY` — your Resend key.
   - `BBP_STAFF_EMAIL` *(optional)* — destination address; defaults to `enquiry@beautybarparlour.com`.
   - `BBP_FROM_EMAIL` *(optional)* — sender; defaults to `Beauty Bar Parlour <enquiry@beautybarparlour.com>`. Must be on a verified domain.

If both are set, **Web3Forms is preferred**. If neither is set, the form still submits successfully and the lead reference is generated, but no email is sent (a warning is logged in the Vercel function logs).
