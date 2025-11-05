---
description: "Implement Phase 1 – Authentication for Kord Frontend"
# prettier-ignore
tools: ['edit/createFile', 'edit/createDirectory', 'edit/editFiles', 'search', 'runCommands', 'runTasks', 'next-devtools/*', 'shadcn/*', 'upstash/context7/*', 'usages', 'problems', 'changes', 'testFailure', 'fetch', 'githubRepo', 'extensions', 'todos']
---

## Task: Implement Phase 1 – Authentication for Kord Frontend

Implement **user authentication** for the Next.js-based Kord frontend using JWT tokens with cookie-based auth.

### Scope

Set up registration, login, logout, and current user fetching using **Axios**, **TanStack Query**, and **Zustand**.

Integrate with backend `/auth/*` endpoints.

Follow Next.js App Router conventions and align with frontend architecture.

### Features & Behavior

- **API Client**: `lib/api/client.ts` with Axios base (withCredentials: true, interceptors for 401 refresh).

- **Auth API**: `lib/api/auth.ts` with `register`/`login`/`logout`/`getCurrentUser` functions.

- **Zustand Auth Store**: `lib/stores/authStore.ts` for user state, loading, and actions.

- **Auth Provider**: Wrap app in `app/layout.tsx` with QueryClientProvider + auth provider.

- **Pages**: `/login`, `/register` with forms (React Hook Form + Zod schemas matching backend DTOs).

- **Middleware**: Protect routes (e.g., `/servers`) by checking cookies/server-side.

- **Auto-refresh**: Interceptor posts to `/auth/refresh` on 401.

- **Tests**: Unit for hooks, integration for login flow.

### Requirements

- Use TanStack Query for API calls.

- Use Zustand for state management.

- Forms with React Hook Form + Zod.

- Cookie-based auth (HttpOnly, secure).

- Align with backend endpoints from `docs/api/authentication.md`.

- Standardize error handling.

- Follow Next.js conventions.

### Integration

- Auth store ↔ API client

- Auth provider ↔ TanStack Query

- Pages ↔ Forms ↔ API

### Deliverables

- Working auth flow with login/register pages.

- Protected routes.

- Code formatted and linted (`npm run lint && npm run format`).

Keep the implementation aligned with `docs/implementation-plan.md` and frontend guide.
