# Kord Frontend Feature and Todo Checklists

This document provides checklists for the Kord frontend (Next.js-based Discord-inspired chat application). It covers:

- **Todo Tasks**: Actionable steps to complete the app based on the backend docs in `docs/api/` and integration guide in `docs/frontend-guide.md`. These are prioritized incrementally to keep development simple.
- **Future Planned Features**: Simple enhancements like video calls, plus a few straightforward ideas (e.g., no complex AI or advanced analytics to avoid complication).

Checklists use:

- [x] for implemented.
- [ ] for pending or planned.

## 1. Todo Tasks

These are broken into phases. Focus on one phase at a time for simplicity. Each task includes subtasks where needed, referencing backend endpoints from `docs/api/*`.

### Phase 0: Initial Setup

- [x] Create Next.js project: `npx create-next-app@latest .`.
- [ ] Install dependencies: `npm install axios socket.io-client @tanstack/react-query zustand react-hook-form zod framer-motion react-window`.
- [ ] Init shadcn/ui: `npx shadcn-ui@latest init`.
- [ ] Add shadcn components: Button, Input, Modal, etc. via `npx shadcn-ui@latest add <component>`.
- [ ] Setup Tailwind: Configure in `tailwind.config.js` for shadcn compatibility.
- [ ] Create `.env.local`: Set `NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1`, `NEXT_PUBLIC_WS_URL=http://localhost:3001`.
- [ ] Types: Create `lib/types/index.ts` mirroring backend entities (User, Server, Channel, Message, etc.) from `docs/api/*`.

### Phase 1: Authentication

- [ ] Create API client: `lib/api/client.ts` with Axios base (withCredentials: true, interceptors for 401 refresh).
- [ ] Auth API: `lib/api/auth.ts` with register/login/logout/getCurrentUser (use backend `/auth/*`).
- [ ] Zustand auth store: `lib/stores/authStore.ts` for user/loading (persist if needed).
- [ ] Auth context/provider: Wrap app in `app/layout.tsx` with QueryClientProvider + auth provider.
- [ ] Pages: `/login`, `/register` with forms (React Hook Form + Zod schemas matching DTOs).
- [ ] Middleware: Protect routes (e.g., `/servers`) by checking cookies/server-side.
- [ ] Auto-refresh: Interceptor posts to `/auth/refresh` on 401.
- [ ] Test: Unit for hooks, integration for login flow.

### Phase 2: App Flows & UI Basics

- [ ] Servers API: `lib/api/servers.ts` (create/get/update/delete, getUserServers from `/servers`).
- [ ] Channels API: `lib/api/channels.ts` (create/update/delete, get for server/DMs from `/channels`).
- [ ] Messages API: `lib/api/messages.ts` (send/get/update/delete, paginated from `/messages`).
- [ ] Other APIs: Users, roles, reactions, memberships, profiles mirroring `docs/api/*`.
- [ ] Zustand stores: serverStore (current server/channels), channelStore (current channel/messages).
- [ ] TanStack Query hooks: useServers, useChannels, useMessages (infinite for messages), mutations for creates/updates.
- [ ] Layout: Sidebar for servers/channels (Framer Motion for animations), main chat area.
- [ ] Pages: `/servers` list, `/servers/[id]` details, `/channels/[id]` chat.
- [ ] Components: ServerList, ChannelList, MessageList (React Window), MessageInput (React Hook Form + Zod).
- [ ] Permissions: Hook to query roles, conditional UI (e.g., edit buttons if permitted).
- [ ] Profiles: `/profile` page with edit form (from `/profiles` endpoints).

### Phase 3: Real-time Updates

- [ ] Socket service: `lib/services/socket.ts` with connect/joinChannel/onMessageCreated etc. (withCredentials: true).
- [ ] Integrate: In channel page, connect socket, join room, listen for events.
- [ ] Updates: On events, invalidate TanStack Query (new message → refetch messages) or optimistic patch.
- [ ] Typing: Debounce input, emit 'typing', display indicators via Zustand.
- [ ] Presence: Update user status on connect/disconnect.
- [ ] Reactions: Real-time add/remove via sockets.

### Phase 4: Enhancements & Polish

- [ ] Infinite scroll: Use TanStack Query infinite queries + React Window for messages.
- [ ] Optimistic UI: Mutations for send message/react (rollback on error).
- [ ] Modals: Create server/channel, invites (Framer Motion).
- [ ] Error handling: Toasts for API errors, loading skeletons.
- [ ] DMs: Auto-create on user select, block/mute UI.
- [ ] Testing: Add RTL tests for components, MSW for API mocks.
- [ ] Deploy prep: Build, env vars, middleware for auth.

### General Todos

- [ ] Run lint/format after changes.
- [ ] Update README with setup (env, commands).
- [ ] Rate limiting: Client-side debounce for inputs/emits.
- [ ] Accessibility: ARIA labels on UI elements.

#### 2. Future Planned Features

These are simple additions to keep the app lightweight. Prioritize based on user feedback; aim for 1-2 at a time post-MVP.

- [ ] Video calls: Integrate WebRTC in voice channels (peer-to-peer for DMs, SFU for groups).
- [ ] Screen sharing: Add display media stream in calls.
- [ ] Notifications: Browser push for mentions (via service workers).
- [ ] Search: Message/channel search with API filters.
- [ ] Themes: Dark/light mode toggle (Zustand store).
- [ ] File uploads: Direct to backend attachments.
- [ ] Mobile responsive: Tailwind breakpoints for layouts.
- [ ] Analytics: Simple client-side tracking (e.g., active time).
- [ ] Custom emojis: Upload/display in reactions.

This keeps Kord focused on core chat functionality without overcomplicating.
