import { CHAT_ROLES } from "@/constants";
import { Message } from "@/types/Message";
import { useCallback, useState } from "react";

export const useChatbotMessagesHistory = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addModelMessage = useCallback((content: string) => {
    setMessages((prev) => [...prev, { role: CHAT_ROLES.MODEL, content }]);
  }, []);

  const addUserMessage = useCallback((content: string) => {
    setMessages((prev) => [...prev, { role: CHAT_ROLES.USER, content }]);
  }, []);

  return { messages, addModelMessage, addUserMessage };
};
