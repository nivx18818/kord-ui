---
description: "Implement Phase 0 – Initial Setup for Kord Frontend"
# prettier-ignore
tools: ['edit/createFile', 'edit/createDirectory', 'edit/editFiles', 'search', 'runCommands', 'runTasks', 'next-devtools/*', 'shadcn/*', 'upstash/context7/*', 'usages', 'problems', 'changes', 'testFailure', 'fetch', 'githubRepo', 'extensions', 'todos']
---

## Task: Implement Phase 0 – Initial Setup for Kord Frontend

Set up the foundational structure for the Next.js-based Kord frontend, including project dependencies, shadcn/ui components, Tailwind CSS configuration, environment variables, and base type definitions.

### Scope

Initialize the project with all necessary dependencies, configure styling and UI component libraries, set up environment variables, and create base type definitions.

Follow Next.js App Router conventions and align with frontend architecture.

### Features & Behavior

- **Dependencies**: Install Axios, Socket.io-client, TanStack Query, Zustand, React Hook Form, Zod, Framer Motion, React Window.

- **shadcn/ui**: Initialize shadcn/ui and add base components (Button, Input, Modal, etc.).

- **Tailwind CSS**: Configure Tailwind for shadcn compatibility with Discord-inspired color palette.

- **Environment Variables**: Create `.env.local` with `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_WS_URL`.

- **Type Definitions**: Create `lib/types/index.ts` mirroring backend entities (User, Server, Channel, Message, etc.) from `docs/api/*`.

### Requirements

- Install all required npm packages.

- Configure Tailwind CSS 4 with shadcn/ui integration.

- Set up environment variables for API and WebSocket URLs.

- Create comprehensive TypeScript type definitions aligned with backend DTOs.

- Follow Next.js and Tailwind CSS conventions in `.github/instructions/`.

### Integration

- Project structure ↔ Dependencies

- Tailwind ↔ shadcn/ui

- Types ↔ Backend APIs

### Deliverables

- Fully configured Next.js project with all dependencies installed.

- shadcn/ui initialized with base components.

- Tailwind configured with Discord-inspired theme.

- Environment variables set up.

- Base type definitions created.

- Code formatted and linted (`npm run lint && npm run format`).

Keep the implementation aligned with `docs/implementation-plan.md` and frontend guide.
