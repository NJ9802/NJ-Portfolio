import { Message } from "./Message";

export type ChatDto = {
  history: Message[];
  message: string;
  id?: string;
};
