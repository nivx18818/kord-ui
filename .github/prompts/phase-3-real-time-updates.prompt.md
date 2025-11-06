---
description: "Implement Phase 3 – Real-time Updates for Kord Frontend"
# prettier-ignore
tools: ['edit/createFile', 'edit/createDirectory', 'edit/editFiles', 'search', 'runCommands', 'runTasks', 'next-devtools/*', 'shadcn/*', 'upstash/context7/*', 'usages', 'problems', 'changes', 'testFailure', 'fetch', 'githubRepo', 'extensions', 'todos']
---

## Task: Implement Phase 3 – Real-time Updates for Kord Frontend

Implement real-time updates for the Next.js-based Kord frontend using Socket.io for live messaging, typing indicators, presence, and reactions.

### Scope

Set up Socket.io client service, integrate WebSocket events with TanStack Query and Zustand, handle typing and presence updates.

Integrate with backend WebSocket events.

Follow Next.js App Router conventions and align with frontend architecture.

### Features & Behavior

- **Socket Service**: `lib/services/socket.ts` with connect/joinChannel/onMessageCreated etc. (withCredentials: true).

- **Integration**: In channel page, connect socket, join room, listen for events.

- **Updates**: On events, invalidate TanStack Query (new message → refetch messages) or optimistic patch.

- **Typing**: Debounce input, emit 'typing', display indicators via Zustand.

- **Presence**: Update user status on connect/disconnect.

- **Reactions**: Real-time add/remove via sockets.

### Requirements

- Use Socket.io client for real-time communication.

- Integrate with TanStack Query for cache invalidation.

- Use Zustand for ephemeral state (typing, presence).

- Align with backend WebSocket events.

- Standardize error handling.

- Follow Next.js and Tailwind CSS conventions in `.github/instructions/`.

### Integration

- Socket service ↔ TanStack Query ↔ Zustand

- Channel pages ↔ Socket events

### Deliverables

- Real-time messaging, typing indicators, presence, and reactions.

- Code formatted and linted (`npm run lint && npm run format`).

Keep the implementation aligned with `docs/implementation-plan.md` and frontend guide.
