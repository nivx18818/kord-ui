# API Endpoints Matrix — Kord UI Frontend

This matrix translates backend endpoints from the Kord API docs into recommended frontend client functions, HTTP methods, expected URL paths, required authentication/permissions, and example request/response shapes. Use this file to keep the frontend client organized and to implement `src/lib/api/*` modules.

## Notes

- Base URL: `${process.env.NEXT_PUBLIC_API_URL}` (e.g. `http://localhost:3001/api/v1`).
- All requests should include credentials (cookies). For Axios: `withCredentials: true`.
- The refresh token cookie is restricted to `/api/v1/auth/refresh`.

## Auth

- Function: `authApi.register(data)`

  - Method: `POST`
  - Path: `/auth/register`
  - Auth: none
  - Body: `{ username, email, password, dateOfBirth, name? }`
  - Response: `{ user }`
  - Notes: Backend sets `accessToken` and `refreshToken` cookies.

- Function: `authApi.login(creds)`

  - Method: `POST`
  - Path: `/auth/login`
  - Auth: none
  - Body: `{ usernameOrEmail, password }`
  - Response: `{ user }`

- Function: `authApi.me()`

  - Method: `GET`
  - Path: `/auth/me`
  - Auth: accessToken cookie required
  - Response: `{ user }`

- Function: `authApi.refresh()`

  - Method: `POST`
  - Path: `/auth/refresh`
  - Auth: refreshToken cookie required (path restricted)
  - Response: `{ user }`
  - Notes: Interceptor should call this on 401 and retry original request.

- Function: `authApi.logout()`
  - Method: `POST`
  - Path: `/auth/logout`
  - Auth: accessToken cookie required
  - Response: 200 OK

## Servers

- Function: `serversApi.create(serverData)`

  - Method: `POST`
  - Path: `/servers`
  - Auth: required
  - Body: `{ name, servername, description?, icon? }`
  - Response: `{ server }`

- Function: `serversApi.list(params)`

  - Method: `GET`
  - Path: `/servers`
  - Query: `{ userId?, page?, limit? }`
  - Auth: required
  - Response: paginated list or array (if userId provided)

- Function: `serversApi.getById(id)`

  - Method: `GET`
  - Path: `/servers/:id`
  - Auth + Permission: VIEW_CHANNELS
  - Response: `{ server, channels, members }`

- Function: `serversApi.update(id, updates)`

  - Method: `PATCH`
  - Path: `/servers/:id`
  - Auth + Permission: MANAGE_SERVERS

- Function: `serversApi.delete(id)`

  - Method: `DELETE`
  - Path: `/servers/:id`
  - Auth + Permission: MANAGE_SERVERS

- Function: `serversApi.createInvite(serverId, opts)`

  - Method: `POST`
  - Path: `/servers/:id/invites`
  - Auth + Permission: MANAGE_INVITES

- Function: `serversApi.redeemInvite(code)`
  - Method: `POST`
  - Path: `/servers/invites/redeem`
  - Auth: required
  - Body: `{ code }`

## Channels

- Function: `channelsApi.create(data)`

  - Method: `POST`
  - Path: `/channels`
  - Auth + Permission: MANAGE_CHANNELS (depending on server)
  - Body: `{ name, serverId, type, status }`

- Function: `channelsApi.list(params)`

  - Method: `GET`
  - Path: `/channels`
  - Query: `{ serverId? }`
  - Auth: required

- Function: `channelsApi.get(id)`

  - Method: `GET`
  - Path: `/channels/:id`
  - Auth + Permission: VIEW_CHANNELS

- Function: `channelsApi.update(id, updates)`

  - Method: `PATCH`
  - Path: `/channels/:id`
  - Auth + Permission: MANAGE_CHANNELS

- Function: `channelsApi.delete(id)`

  - Method: `DELETE`
  - Path: `/channels/:id`
  - Auth + Permission: MANAGE_CHANNELS

- Function: `channelsApi.findOrCreateDM({ user1Id, user2Id, serverId? })`

  - Method: `POST`
  - Path: `/channels/dm`
  - Auth: required
  - Response: `{ channel }` (200 or 201)

- Function: `channelsApi.getUserDMs(userId)`

  - Method: `GET`
  - Path: `/channels/user/:userId/dms`
  - Auth: required

- Function: `channelsApi.addParticipant(channelId, userId)`

  - Method: POST
  - Path: `/channels/:id/participants`
  - Auth: required

- Function: `channelsApi.removeParticipant(channelId, userId)`

  - Method: DELETE
  - Path: `/channels/:id/participants/:userId`

- Function: `channelsApi.blockDM(channelId, body)`
  - Method: POST
  - Path: `/channels/:id/block`

## Messages

- Function: `messagesApi.send({ channelId, userId, content, parentMessageId? })`

  - Method: `POST`
  - Path: `/messages`
  - Auth + Permission: SEND_MESSAGES
  - Body: `{ channelId, userId, content: JSON, parentMessageId? }`
  - Response: `{ message }`

- Function: `messagesApi.list({ channelId, before?, after?, limit=50 })`

  - Method: `GET`
  - Path: `/messages`
  - Query: channelId, before, after, limit
  - Auth + Permission: VIEW_CHANNELS
  - Response: `{ items: Message[], limit, hasMore, before, after }`

- Function: `messagesApi.getById(id)`

  - Method: `GET`
  - Path: `/messages/:id`

- Function: `messagesApi.update(id, content)`

  - Method: `PATCH`
  - Path: `/messages/:id`
  - Auth: EDIT_MESSAGES or author

- Function: `messagesApi.delete(id)`
  - Method: `DELETE`
  - Path: `/messages/:id`
  - Auth: DELETE_MESSAGES or author
  - Notes: Soft delete (deletedAt set). Deleted messages are marked but retrievable.

## Reactions

- Function: `reactionsApi.add({ messageId, userId, emoji })`

  - Method: `POST`
  - Path: `/reactions`
  - Body: `{ messageId, userId, emoji }`

- Function: `reactionsApi.update(messageId, userId, { emoji })`

  - Method: `PATCH`
  - Path: `/reactions/:messageId/:userId`

- Function: `reactionsApi.remove(messageId, userId)`
  - Method: `DELETE`
  - Path: `/reactions/:messageId/:userId`

## Roles

- Function: `rolesApi.create({ serverId, name, permissions })`

  - Method: `POST`
  - Path: `/roles`
  - Auth + Permission: MANAGE_ROLES

- Function: `rolesApi.list({ serverId? })`

  - Method: `GET`
  - Path: `/roles`

- Function: `rolesApi.update(id, updates)`

  - Method: `PATCH`
  - Path: `/roles/:id`

- Function: `rolesApi.delete(id)`
  - Method: `DELETE`
  - Path: `/roles/:id`

## Memberships

- Function: `membershipsApi.create({ userId, serverId, roleId? })`

  - Method: `POST`
  - Path: `/memberships`

- Function: `membershipsApi.get(userId, serverId)`

  - Method: GET
  - Path: `/memberships/:userId/:serverId`

- Function: `membershipsApi.update(userId, serverId, { roleId })`

  - Method: `PATCH`
  - Path: `/memberships/:userId/:serverId`

- Function: `membershipsApi.delete(userId, serverId)`
  - Method: `DELETE`
  - Path: `/memberships/:userId/:serverId`

## Attachments (if provided by backend)

- Function: `attachmentsApi.upload(formData)`
  - Method: `POST`
  - Path: `/attachments`
  - Body: multipart/form-data

## Socket / Real-time events (client-side handlers)

- `messageCreated`: Append new message
- `messageUpdated`: Replace message
- `messageDeleted`: Mark message deleted or remove
- `reactionAdded` / `reactionUpdated` / `reactionRemoved`
- `typingStart` / `typingStop`

## Example client usage

```typescript
// axios client
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// usage
await messagesApi.send({
  channelId: 1,
  userId: 5,
  content: { type: "text", data: "Hello" },
});
```

## Notes & Implementation tips

- Centralize error handling and transform backend error shape into friendly messages.
- Implement an interceptor that calls `authApi.refresh()` upon 401, queues requests during refresh, and retries.
- Keep permissions checks on the server; client-side checks are only for UI gating.
- For SSR pages needing auth, consider implementing a Next.js route handler proxy to forward cookies to the API and return data to the server component.

Keep this matrix updated when backend contracts change. Use it as the single source of truth for API client function names and behavior.
