/**
 * Kord Frontend Type Definitions
 *
 * Type definitions mirroring backend entities from the Kord API.
 * Based on documentation in docs/api/*.md
 */

// ========================================
// Authentication & User Types
// ========================================

export interface User {
  id: number;
  username: string;
  email: string;
  name?: string | null;
  dateOfBirth: string; // ISO 8601 date string
  createdAt: string;
  updatedAt: string;
  profile?: Profile | null;
}

export interface Profile {
  userId: number;
  bio?: string | null;
  avatar?: string | null;
  banner?: string | null;
  xTwitter?: string | null;
  github?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  website?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  message: string;
}

export interface CurrentUserResponse {
  id: number;
  username: string;
  email: string;
  name?: string | null;
  dateOfBirth: string;
}

// ========================================
// Server Types
// ========================================

export interface Server {
  id: number;
  name: string;
  servername: string; // URL-friendly identifier
  createdAt: string;
  updatedAt: string;
  joinedAt?: string; // When queried with userId filter
  role?: Role; // When queried with userId filter
}

// ========================================
// Channel Types
// ========================================

export type ChannelType = "TEXT" | "VOICE";
export type ChannelStatus = "PUBLIC" | "RESTRICT" | "PRIVATE";

export interface Channel {
  id: number;
  name: string;
  serverId: number;
  type: ChannelType;
  status: ChannelStatus;
  isDM: boolean;
  createdAt: string;
  updatedAt: string;
  server?: {
    id: number;
    name: string;
    servername: string;
  };
  messages?: Message[];
  participants?: ChannelParticipant[];
}

export interface ChannelParticipant {
  id: number;
  username: string;
  name?: string;
  profile?: {
    avatar?: string;
  };
}

export interface DMChannel extends Omit<Channel, "serverId"> {
  serverId: null;
  isDM: true;
  participants: ChannelParticipant[];
}

// ========================================
// Message Types
// ========================================

export interface MessageContent {
  text: string;
  mentions?: number[]; // User IDs
  embeds?: MessageEmbed[];
  replyTo?: number; // Message ID
}

export interface MessageEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: string;
  image?: string;
  thumbnail?: string;
}

export interface Message {
  id: number;
  content: MessageContent;
  userId: number;
  channelId: number;
  parentMessageId?: number | null; // For threaded replies
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  user?: {
    id: number;
    username: string;
    name?: string;
    profile?: {
      avatar?: string;
    };
  };
  reactions?: Reaction[];
  attachments?: MessageAttachment[];
  replies?: Message[]; // Thread replies
}

export interface MessageAttachment {
  id: number;
  messageId: number;
  name: string;
  size: number;
  mimeType: string;
  url: string;
  createdAt: string;
}

// ========================================
// Reaction Types
// ========================================

export interface Reaction {
  messageId: number;
  userId: number;
  emoji: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    username: string;
    name?: string;
  };
}

// ========================================
// Role & Permission Types
// ========================================

export interface Permissions {
  viewChannels?: boolean;
  manageChannels?: boolean;
  manageServers?: boolean;
  manageRoles?: boolean;
  manageInvites?: boolean;
  kickMembers?: boolean;
  banMembers?: boolean;
  sendMessages?: boolean;
  editMessages?: boolean;
  deleteMessages?: boolean;
  addReactions?: boolean;
  manageReactions?: boolean;
  connectVoice?: boolean;
  muteMembers?: boolean;
  deafenMembers?: boolean;
  [key: string]: boolean | undefined; // Allow custom permissions
}

export interface Role {
  id: number;
  name: string;
  serverId: number;
  permissions: Permissions;
  createdAt: string;
  updatedAt: string;
}

// ========================================
// Membership Types
// ========================================

export interface Membership {
  userId: number;
  serverId: number;
  roleId?: number | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
  server?: Server;
  role?: Role;
}

// ========================================
// Mute Types
// ========================================

export interface Mute {
  muterId: number;
  mutedId: number;
  createdAt: string;
  muter?: User;
  muted?: User;
}

// ========================================
// Pagination Types
// ========================================

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface CursorPaginatedResponse<T> {
  items: T[];
  hasMore: boolean;
  nextCursor?: string; // ISO 8601 timestamp
  prevCursor?: string; // ISO 8601 timestamp
}

// ========================================
// Error Types
// ========================================

export interface APIError {
  code: number;
  message: string;
  errors?: Record<string, ValidationError[]>;
}

export interface ValidationError {
  code: string;
  message: string;
}

// ========================================
// WebSocket Event Types
// ========================================

export type WebSocketEvent =
  | "messageCreated"
  | "messageUpdated"
  | "messageDeleted"
  | "reactionAdded"
  | "reactionRemoved"
  | "userTyping"
  | "userPresence"
  | "channelCreated"
  | "channelUpdated"
  | "channelDeleted"
  | "memberJoined"
  | "memberLeft"
  | "roleUpdated";

export interface WebSocketMessage<T = unknown> {
  event: WebSocketEvent;
  data: T;
}

// ========================================
// Form DTOs (Request Bodies)
// ========================================

export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string; // YYYY-MM-DD
  name?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateServerDTO {
  name: string;
  servername: string;
}

export interface UpdateServerDTO {
  name?: string;
}

export interface CreateChannelDTO {
  name: string;
  serverId: number;
  type?: ChannelType;
  status?: ChannelStatus;
  isDM?: boolean;
}

export interface UpdateChannelDTO {
  name?: string;
  type?: ChannelType;
  status?: ChannelStatus;
}

export interface SendMessageDTO {
  content: MessageContent;
  userId: number;
  channelId: number;
  parentMessageId?: number | null;
}

export interface UpdateMessageDTO {
  content: MessageContent;
}

export interface AddReactionDTO {
  messageId: number;
  userId: number;
  emoji: string;
}

export interface CreateRoleDTO {
  name: string;
  serverId: number;
  permissions: Permissions;
}

export interface UpdateRoleDTO {
  name?: string;
  permissions?: Permissions;
}

export interface CreateMembershipDTO {
  userId: number;
  serverId: number;
  roleId?: number;
}

export interface UpdateMembershipDTO {
  roleId: number;
}

export interface UpdateProfileDTO {
  bio?: string;
  avatar?: string;
  banner?: string;
  xTwitter?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  website?: string;
}

export interface CreateMuteDTO {
  muterId: number;
  mutedId: number;
}

// ========================================
// Query Parameter Types
// ========================================

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface MessageQueryParams {
  channelId: number;
  after?: string; // ISO 8601 timestamp
  before?: string; // ISO 8601 timestamp
  limit?: number;
}

export interface ServerQueryParams extends PaginationParams {
  userId?: number;
}
