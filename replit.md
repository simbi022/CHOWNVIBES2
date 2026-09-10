# CHOW 'N' VIBES

A Supabase-powered restaurant service-floor console with a guest-facing VIP QR ordering flow.

## Run & Operate

- `pnpm --filter @workspace/restaurant-ordering run dev` — run the web app
- `pnpm --filter @workspace/restaurant-ordering run serve` — serve the production bundle locally
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/restaurant-ordering run typecheck` — check the web app
- Required env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

The Supabase values must be configured as Replit environment secrets before publishing. The app intentionally shows a readable configuration state when they are absent.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + TypeScript
- Data/auth: Supabase client
- UI: Tailwind CSS, Radix UI, Lucide

## Where things live

- `artifacts/restaurant-ordering/src/App.tsx` — staff login, floor console, menu management, and payments
- `artifacts/restaurant-ordering/src/VIPApp.tsx` — guest VIP ordering flow
- `artifacts/restaurant-ordering/src/supabase.ts` — Supabase client and configuration guard
- `artifacts/restaurant-ordering/src/index.css` — shared theme and responsive styling
- `artifacts/restaurant-ordering/.env.example` — required variable names without values

## Architecture decisions

- The staff console is served at `/`; the guest QR experience is served at `/vip?table=<number>`.
- Supabase remains the source of truth for authentication, menu data, orders, payments, and realtime updates.
- Missing Supabase configuration is rendered in the UI instead of causing an import-time crash.

## Product

- Staff sign-in and account creation
- Table selection and regular menu ordering
- Open/paid order tracking and payment confirmation
- Menu category and item management
- QR code generation for guest ordering
- VIP menu ordering by table

## User preferences

No additional preferences recorded.

## Gotchas

- Do not commit `.env` files or paste Supabase values into source code.
- Use the production bundle checks with `PORT` and `BASE_PATH` supplied when running Vite outside the managed workflow.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
# CHOW 'N' VIBES

A Supabase-powered restaurant service-floor console with a guest-facing VIP QR ordering flow.

## Run & Operate

- `pnpm --filter @workspace/restaurant-ordering run dev` — run the web app
- `pnpm --filter @workspace/restaurant-ordering run serve` — serve the production bundle locally
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/restaurant-ordering run typecheck` — check the web app
- Required env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

The Supabase values must be configured as Replit environment secrets before publishing. The app intentionally shows a readable configuration state when they are absent.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + TypeScript
- Data/auth: Supabase client
- UI: Tailwind CSS, Radix UI, Lucide

## Where things live

- `artifacts/restaurant-ordering/src/App.tsx` — staff login, floor console, menu management, and payments
- `artifacts/restaurant-ordering/src/VIPApp.tsx` — guest VIP ordering flow
- `artifacts/restaurant-ordering/src/supabase.ts` — Supabase client and configuration guard
- `artifacts/restaurant-ordering/src/index.css` — shared theme and responsive styling
- `artifacts/restaurant-ordering/.env.example` — required variable names without values

## Architecture decisions

- The staff console is served at `/`; the guest QR experience is served at `/vip?table=<number>`.
- Supabase remains the source of truth for authentication, menu data, orders, payments, and realtime updates.
- Missing Supabase configuration is rendered in the UI instead of causing an import-time crash.

## Product

- Staff sign-in and account creation
- Table selection and regular menu ordering
- Open/paid order tracking and payment confirmation
- Menu category and item management
- QR code generation for guest ordering
- VIP menu ordering by table

## User preferences

No additional preferences recorded.

## Gotchas

- Do not commit `.env` files or paste Supabase values into source code.
- Use the production bundle checks with `PORT` and `BASE_PATH` supplied when running Vite outside the managed workflow.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
# CHOW 'N' VIBES

A Supabase-powered restaurant service-floor console with a guest-facing VIP QR ordering flow.

## Run & Operate

- `pnpm --filter @workspace/restaurant-ordering run dev` — run the web app
- `pnpm --filter @workspace/restaurant-ordering run serve` — serve the production bundle locally
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/restaurant-ordering run typecheck` — check the web app
- Required env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

The Supabase values must be configured as Replit environment secrets before publishing. The app intentionally shows a readable configuration state when they are absent.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + TypeScript
- Data/auth: Supabase client
- UI: Tailwind CSS, Radix UI, Lucide

## Where things live

- `artifacts/restaurant-ordering/src/App.tsx` — staff login, floor console, menu management, and payments
- `artifacts/restaurant-ordering/src/VIPApp.tsx` — guest VIP ordering flow
- `artifacts/restaurant-ordering/src/supabase.ts` — Supabase client and configuration guard
- `artifacts/restaurant-ordering/src/index.css` — shared theme and responsive styling
- `artifacts/restaurant-ordering/.env.example` — required variable names without values

## Architecture decisions

- The staff console is served at `/`; the guest QR experience is served at `/vip?table=<number>`.
- Supabase remains the source of truth for authentication, menu data, orders, payments, and realtime updates.
- Missing Supabase configuration is rendered in the UI instead of causing an import-time crash.

## Product

- Staff sign-in and account creation
- Table selection and regular menu ordering
- Open/paid order tracking and payment confirmation
- Menu category and item management
- QR code generation for guest ordering
- VIP menu ordering by table

## User preferences

No additional preferences recorded.

## Gotchas

- Do not commit `.env` files or paste Supabase values into source code.
- Use the production bundle checks with `PORT` and `BASE_PATH` supplied when running Vite outside the managed workflow.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
# CHOW 'N' VIBES

A Supabase-powered restaurant service-floor console with a guest-facing VIP QR ordering flow.

## Run & Operate

- `pnpm --filter @workspace/restaurant-ordering run dev` — run the web app
- `pnpm --filter @workspace/restaurant-ordering run serve` — serve the production bundle locally
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/restaurant-ordering run typecheck` — check the web app
- Required env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

The Supabase values must be configured as Replit environment secrets before publishing. The app intentionally shows a readable configuration state when they are absent.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + TypeScript
- Data/auth: Supabase client
- UI: Tailwind CSS, Radix UI, Lucide

## Where things live

- `artifacts/restaurant-ordering/src/App.tsx` — staff login, floor console, menu management, and payments
- `artifacts/restaurant-ordering/src/VIPApp.tsx` — guest VIP ordering flow
- `artifacts/restaurant-ordering/src/supabase.ts` — Supabase client and configuration guard
- `artifacts/restaurant-ordering/src/index.css` — shared theme and responsive styling
- `artifacts/restaurant-ordering/.env.example` — required variable names without values

## Architecture decisions

- The staff console is served at `/`; the guest QR experience is served at `/vip?table=<number>`.
- Supabase remains the source of truth for authentication, menu data, orders, payments, and realtime updates.
- Missing Supabase configuration is rendered in the UI instead of causing an import-time crash.

## Product

- Staff sign-in and account creation
- Table selection and regular menu ordering
- Open/paid order tracking and payment confirmation
- Menu category and item management
- QR code generation for guest ordering
- VIP menu ordering by table

## User preferences

No additional preferences recorded.

## Gotchas

- Do not commit `.env` files or paste Supabase values into source code.
- Use the production bundle checks with `PORT` and `BASE_PATH` supplied when running Vite outside the managed workflow.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
