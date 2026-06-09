# Pokédex Lite

A web app that lets you browse, search, filter, and favorite Pokémon.

**Live demo:** https://pokedex-lite-iota.vercel.app/

---

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To create a production build:

```bash
npm run build
npm start
```

---

## What's built

**Mandatory**

- Pokémon grid fetched from [PokéAPI](https://pokeapi.co) — name and sprite on each card
- Search by name (debounced, filters as you type)
- Filter by type via dropdown — fetches the type's Pokémon list and intersects with the index
- Pagination — 20 per page, previous/next buttons
- Favorites — heart button on each card, saved to `localStorage`, survives refresh
- Detail page — separate route (`/pokemon/[name]`) showing stats, abilities, height, weight, and official artwork
- Loading and error states handled
- Responsive layout — works on mobile, tablet, and desktop

**Bonus**

- Server-side rendering on the detail page — it's a Next.js server component, so the page renders on the server and ships HTML directly, faster initial load
- Subtle hover animation on cards (`hover:-translate-y-1`)

---

## Tech stack

| Library | Why |
|---|---|
| **Next.js 15** | App router, server components for the detail page (SSR bonus), file-based routing |
| **TanStack Query** | Client-side data fetching with built-in caching — avoids re-fetching the Pokémon index on every render |
| **Tailwind CSS v4** | Utility-first styling, fast to iterate |
| **PokéAPI** | Free, no auth required, has everything needed |

---

## Challenges

**Filtering by type without per-card fetches**
The PokéAPI index only returns names and URLs — no type information. The obvious approach (fetch every Pokémon's details to check its type) would mean thousands of requests. Instead, when a type is selected, a single call to `/type/{type}` returns all Pokémon of that type. That list is turned into a `Set` and used to filter the already-loaded index client-side. Fast and cheap.

**Search + type filter together**
Both filters needed to compose cleanly. This is handled in `filterPipline.ts` — a pure function that takes the full index, the active type set, and the search term, applies them in sequence, then slices the result for the current page. Easy to test, easy to change.

**SSR detail page with Next.js app router**
The detail page is an async server component. `params` in Next.js 15 is a Promise, so it needs to be awaited before reading `name`. Took a moment to figure out from the docs but works cleanly.
