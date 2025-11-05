---
description: "Implement Phase 2 – App Flows & UI Basics for Kord Frontend"
# prettier-ignore
tools: ['edit/createFile', 'edit/createDirectory', 'edit/editFiles', 'search', 'runCommands', 'runTasks', 'next-devtools/*', 'shadcn/*', 'upstash/context7/*', 'usages', 'problems', 'changes', 'testFailure', 'fetch', 'githubRepo', 'extensions', 'todos']
---

## Task: Implement Phase 2 – App Flows & UI Basics for Kord Frontend

Implement the core app flows and UI basics for the Next.js-based Kord frontend, including servers, channels, messages, and basic layouts.

### Scope

Set up servers, channels, messages APIs, Zustand stores, TanStack Query hooks, layouts, pages, and components.

Integrate with backend `/servers/*`, `/channels/*`, `/messages/*`, and other endpoints.

Follow Next.js App Router conventions and align with frontend architecture.

### Features & Behavior

- **Servers API**: `lib/api/servers.ts` with create/get/update/delete, getUserServers functions.

- **Channels API**: `lib/api/channels.ts` with create/update/delete, get for server/DMs functions.

- **Messages API**: `lib/api/messages.ts` with send/get/update/delete, paginated functions.

- **Other APIs**: Users, roles, reactions, memberships, profiles mirroring `docs/api/*`.

- **Zustand Stores**: serverStore (current server/channels), channelStore (current channel/messages).

- **TanStack Query Hooks**: useServers, useChannels, useMessages (infinite for messages), mutations for creates/updates.

- **Layout**: Sidebar for servers/channels (Framer Motion for animations), main chat area.

- **Pages**: `/servers` list, `/servers/[id]` details, `/channels/[id]` chat.

- **Components**: ServerList, ChannelList, MessageList (React Window), MessageInput (React Hook Form + Zod).

- **Permissions**: Hook to query roles, conditional UI (e.g., edit buttons if permitted).

- **Profiles**: `/profile` page with edit form (from `/profiles` endpoints).

### Requirements

- Use TanStack Query for API calls.

- Use Zustand for state management.

- Forms with React Hook Form + Zod.

- Align with backend endpoints from `docs/api/*`.

- Standardize error handling.

- Follow Next.js conventions.

### Integration

- Stores ↔ API clients

- Hooks ↔ TanStack Query

- Pages ↔ Components ↔ Hooks

### Deliverables

- Working basic app with servers/channels/messages UI.

- Code formatted and linted (`npm run lint && npm run format`).

Keep the implementation aligned with `docs/implementation-plan.md` and frontend guide.
