export type typChatUser = {
  id: string;
  name: string;
  phone:typPhone
  avatar?: string;
};
export type typChat = {
  id: string;
  name?: string;
  participants: string[]; // user ids
  createdAt: number;
};
export type typPhone = {
  countryCode: string;
  countryISO: string;
  number: string;
};
// Library types (domain + API contract)
export type typMessage = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: number;
};

export type SendMessageInput = Omit<typMessage, "id" | "timestamp">;

// The API interface that the host app must provide
export interface ChatApi {
  fetchMessages: (
    chatId: string,
    signal?: AbortSignal
  ) => Promise<typMessage[]>;
  sendMessage: (msg: SendMessageInput) => Promise<typMessage>;
  fetchUser: (userId: string) => Promise<typChatUser>;
  fetchChat: (chatId: string) => Promise<typChat>;
  createChat: (participants: string[]) => Promise<typChat>; 
}
