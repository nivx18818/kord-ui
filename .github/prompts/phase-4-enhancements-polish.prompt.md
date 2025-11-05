---
description: "Implement Phase 4 – Enhancements & Polish for Kord Frontend"
# prettier-ignore
tools: ['edit/createFile', 'edit/createDirectory', 'edit/editFiles', 'search', 'runCommands', 'runTasks', 'next-devtools/*', 'shadcn/*', 'upstash/context7/*', 'usages', 'problems', 'changes', 'testFailure', 'fetch', 'githubRepo', 'extensions', 'todos']
---

## Task: Implement Phase 4 – Enhancements & Polish for Kord Frontend

Implement enhancements and polish for the Next.js-based Kord frontend, including infinite scroll, optimistic UI, modals, error handling, DMs, testing, and deploy preparation.

### Scope

Add advanced features like infinite scrolling, optimistic updates, modals, comprehensive error handling, DM functionality, testing, and deployment readiness.

Integrate with existing APIs and components.

Follow Next.js App Router conventions and align with frontend architecture.

### Features & Behavior

- **Infinite Scroll**: Use TanStack Query infinite queries + React Window for messages.

- **Optimistic UI**: Mutations for send message/react (rollback on error).

- **Modals**: Create server/channel, invites (Framer Motion).

- **Error Handling**: Toasts for API errors, loading skeletons.

- **DMs**: Auto-create on user select, block/mute UI.

- **Testing**: Add RTL tests for components, MSW for API mocks.

- **Deploy Prep**: Build, env vars, middleware for auth.

### Requirements

- Use TanStack Query for infinite queries and optimistic updates.

- Use Framer Motion for animations.

- Implement comprehensive error boundaries and toasts.

- Add unit and integration tests.

- Prepare for production deployment.

- Standardize error handling.

- Follow Next.js conventions.

### Integration

- Components ↔ TanStack Query ↔ Zustand

- Modals ↔ Forms ↔ API

- Testing ↔ Components ↔ Mocks

### Deliverables

- Polished app with advanced features, error handling, and testing.

- Production-ready build and deployment setup.

- Code formatted and linted (`npm run lint && npm run format`).

Keep the implementation aligned with `docs/implementation-plan.md` and frontend guide.
