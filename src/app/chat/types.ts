export type User = {
  id: string;
  username: string;
  email: string;
  isOnline: boolean;

  lastMessage?: string;
  unreadCount?: number;
};

export type Message = {
  id: string;

  content?: string;

  senderId: string;

  createdAt: string;

  isRead: boolean;

  imageUrl?: string;

  fileUrl?: string;

  fileName?: string;

  fileType?: string;

  fileSize?: number;
};

export type Conversation = {
  id: string;

  unreadCount: number;

  members: {
    user: User;
  }[];

  messages: {
    content: string;
  }[];
};