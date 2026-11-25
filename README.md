This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Trading performance

The portfolio retrieves current position P&L and realized P&L from today onward
from Delta Exchange India through `/api/trading/performance`. The UI displays
the current month and next five months; future dates remain blank until fills
occur. The server fetches a six-month fill baseline to calculate daily P&L
changes, but displays only dates from the current UTC day. Configure
`DELTA_EXCHANGE_API_KEY` and `DELTA_EXCHANGE_API_SECRET` as private server
environment variables in your deployment platform or local `.env` file. Never
use `NEXT_PUBLIC_` variables or commit credentials. The integration uses GET
requests only and does not place or manage orders. For Vercel, add both
variables under Project Settings → Environment Variables for Production (and
Preview if needed), then redeploy. GitHub `.env` ignore rules do not configure
Vercel environment variables.

`TRADING_PUBLIC_METRICS` is a server-side allowlist and defaults to connection
status, position P&L, realized/unrealized values from open positions, and
historical performance. Remove any fields you do not want public. Open
positions and historical daily P&L are grouped by settlement asset. Historical
P&L is derived from Delta fill position snapshots. When snapshots are
incomplete, displayed amounts are labelled as known and may be partial; dates
without a verifiable total remain unavailable rather than estimated. No-fill
days from today show `$0.00` only when the fill snapshot baseline is complete.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
