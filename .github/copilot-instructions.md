# Kord Frontend – Copilot Guide

Guidance for GitHub Copilot when assisting with the Kord frontend (Next.js-based Discord-inspired chat application). This complements the backend API docs in `docs/api/` and integration guide in `docs/frontend-guide.md`.

## Project Overview

- **Purpose**: Client-side interface for Kord, a real-time community platform inspired by Discord. Supports user authentication, server/channel navigation, messaging with threading/reactions, role-based permissions, and user profiles.
- **Frontend**:
  - Next.js 16 App Router for server-side rendering, routing, and data fetching.
  - TanStack Query for caching/sync.
  - Zustand for lightweight state.
  - Socket.io for real-time updates.
- **Core Features**:
  - **Authentication**: Cookie-based JWT (HttpOnly, secure); automatic token refresh via interceptors.
  - **Servers & Channels**: List/join servers, create/manage channels (text/voice, public/private), DMs.
  - **Messaging**: Send/edit/delete messages with rich content (JSON embeds, attachments), threading, reactions.
  - **Profiles**: User bios, avatars, social links.
  - **Roles & Permissions**: Display role hierarchies, check permissions client-side where possible.
  - **Real-time**: WebSocket events for messages, reactions, typing, presence.
- **Data Flow Visualization**:

  ```ini
  [Next.js 16] → server-side caching & render
          ↓ (hydration)
  [TanStack Query] → client/server data sync
          ↓
  [Zustand] → local UI & interaction state
  ```

- **Key Behaviors**:
  - Optimistic updates for messages/reactions (via TanStack Query mutations).
  - Infinite scrolling for message history (React Window + TanStack Query infinite queries).
  - Form validation with React Hook Form + Zod (aligned with backend DTOs).
  - Animations/transitions via Framer Motion (e.g., modals, loading states).
  - UI components from shadcn/ui styled with Tailwind CSS 4.

## Core Architecture

- `app/` uses App Router for pages/layouts (e.g., `/servers/[id]`, `/channels/[id]`); leverage server components for initial data fetches.
- Client components marked with `'use client'` for interactivity (hooks, events).
- Data fetching via TanStack Query hooks (queries/mutations); cache keys based on entities (e.g., `['servers', userId]`).
- State management with Zustand stores (e.g., authStore, serverStore, channelStore) for transient UI state (selected channel, typing status).
- API clients in `lib/api/` (Axios with interceptors for auth refresh); organized by domain (auth.ts, servers.ts, etc.).
- WebSockets via Socket.io client in `lib/services/socket.ts`; event handlers update TanStack Query cache or Zustand stores.
- UI components in `components/` (shadcn/ui primitives, custom like MessageList, ServerSidebar).
- Types in `lib/types/` mirroring backend entities/DTOs for type safety.

## Data & Fetching

- Use TanStack Query for all API interactions: queries for reads (with staleTime/infinite queries), mutations for writes (with optimistic updates/rollbacks).
- Align Zod schemas with backend DTOs (from `docs/api/*`) for form validation.
- Handle pagination: Cursor-based for messages (infinite queries), offset for lists (servers/users).
- Cache invalidation: On WebSocket events, invalidate relevant queries (e.g., new message → invalidate channel messages).
- Error handling: Global interceptor for 401 (refresh/redirect), TanStack Query error boundaries.

## UI & Components

- Base styling: Tailwind CSS 4 in `globals.css`; extend with shadcn/ui components (Button, Input, etc.).
- Forms: React Hook Form for handling, Zod resolvers for validation (e.g., message input, profile edit).
- Lists: React Window for virtualized rendering in long chats (integrate with TanStack Query data).
- Animations: Framer Motion for presence (e.g., slide-in modals, fade loaders).
- Layouts: Root layout with providers (QueryClientProvider, Zustand providers); server-side auth checks in middleware (now proxy in NextJS 16).
- Protected routes: Use middleware (now proxy in NextJS 16) or client wrappers to redirect unauth users.

## Real-time Integration

- Socket.io client connects on mount with `withCredentials: true` for cookie auth.
- Join/leave channel rooms; listen for events (messageCreated, reactionAdded, userTyping).
- Update UI: Invalidate TanStack Query caches or patch Zustand stores on events.
- Typing indicators: Debounce keypress, emit 'typing', display ephemeral UI.

## Error Handling & Validation

- Axios interceptors: Auto-refresh on 401, handle 403/404 with toasts.
- TanStack Query: Use `useErrorBoundary` for global errors; display fallback UI.
- Forms: Zod validation errors shown inline via React Hook Form.
- Custom hooks: For permission checks (query user roles, cache results).

## Testing Strategy

- Unit: React Testing Library for components/hooks; mock TanStack Query/Zustand.
- Integration: MSW for API mocking; test data flows.
- E2E: Playwright/Cypress for flows (login, send message).
- Run with `npm test`; aim for coverage on critical paths (auth, messaging).

## Developer Workflow

- Setup: `npm install`; run with `npm run dev`.
- Env: `.env.local` with `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WS_URL`.
- Lint/Format: ESLint + Prettier; `npm run lint`, `npm run format`.
- Build: `npm run build` for production.
- Reference `docs/frontend-guide.md` for integration patterns (auth setup, API clients, real-time).

## AI Tools and Resources

Use these tools to query the latest documentation for packages and components:

### `next-devtools`

- **Application Runtime Access**

  - **Error Detection**: Retrieve current build errors, runtime errors, and type errors from your dev server.
  - **Live State Queries**: Access real-time application state and runtime information.
  - **Page Metadata**: Query page routes, components, and rendering details.
  - **Server Actions**: Inspect Server Actions and component hierarchies.
  - **Development Logs**: Access development server logs and console output.

- **Development Tools**

  - **Next.js Knowledge Base**: Query comprehensive Next.js documentation and best practices.
  - **Migration and Upgrade Tools**: Automated helpers for upgrading to Next.js 16 with codemods.
  - **Cache Components Guide**: Setup and configuration assistance for Cache Components.
  - **Browser Testing**: Playwright MCP integration for verifying pages in the browser.

### `shadcn`

- **Browse Components** - List all available components, blocks, and templates from any configured registry.
- **Search Across Registries** - Find specific components by name or functionality across multiple sources.
- **Install with Natural Language** - Add components using simple conversational prompts like "add a login form".
- **Support for Multiple Registries** - Access public registries, private company libraries, and third-party sources.

### `upstash/context7`

- Latest docs about popular packages.

## Conventions & Tips

- Think before you code: prefer to propose a small plan and then implement incrementally.
- When adding new files, include a minimal README or doc string at top explaining purpose.
- If you modify API contract assumptions, update `docs/api-endpoints-matrix.md` accordingly.
- Type everything; prefer explicit types for public APIs.
- Use server components by default; opt into client for interactivity.
- Keep client components small and interactive bits in `use client` modules.
- Cache aggressively with TanStack Query; use Zustand only for non-persisted state.
- Align types/Zod with backend (from `docs/api/*`).
- Follow Discord-like UI patterns (sidebar servers, channel lists, message bubbles).
- Optimize: Virtualize lists, debounce inputs, lazy-load components.
- Security: No direct token handling; rely on cookies.
- Read `docs/api/` for endpoints, `docs/frontend-guide.md` for patterns.
