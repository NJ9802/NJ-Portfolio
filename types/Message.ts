import { CHAT_ROLES } from "@/constants";

export interface Message {
  role: CHAT_ROLES.USER | CHAT_ROLES.MODEL;
  content: string;
}
