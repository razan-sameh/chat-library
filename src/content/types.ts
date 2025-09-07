export type ChatUser = {
  id: string;
  name: string;
  avatar?: string;
};

// Library types (domain + API contract)
export type Message = {
  id: string;
  chatId:string;
  senderId: string; 
  receiverId: string; 
  text: string;
  timestamp: number;
};

export type SendMessageInput = Omit<Message, "id" | "timestamp">;

// The API interface that the host app must provide
export interface ChatApi {
  fetchMessages: (chatId: string, signal?: AbortSignal) => Promise<Message[]>;
  sendMessage: (msg: SendMessageInput) => Promise<Message>;
}