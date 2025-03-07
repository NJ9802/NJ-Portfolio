import { CHAT_ROLES } from "@/constants";
import { CHAT_STATUS_ENUM } from "@/constants/chat-status.enum";
import { ChatbotService } from "@/services";
import { Message } from "@/types/Message";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

export const useChatbotConfig = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [userMessage, setuserMessage] = useState("");
  const [status, setStatus] = useState(CHAT_STATUS_ENUM.READY);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const isLoading = useMemo(
    () => status === CHAT_STATUS_ENUM.LOADING,
    [status]
  );

  const isError = useMemo(() => status === CHAT_STATUS_ENUM.ERROR, [status]);
  const isWriting = useMemo(
    () => status === CHAT_STATUS_ENUM.WRITING,
    [status]
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleChangeUserMessage = useCallback((value: string) => {
    setuserMessage(value);
  }, []);

  const handleWritingFinish = useCallback(() => {
    if (!isWriting) {
      setMessages((prev) => [
        ...prev,
        { content: currentMessage, role: CHAT_ROLES.MODEL },
      ]);
      setCurrentMessage("");
    }
  }, [currentMessage, isWriting]);

  const cleanError = useCallback(() => {
    setStatus(CHAT_STATUS_ENUM.READY);
  }, []);

  const processStream = useCallback(
    async (response: Response) => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      let accumulatedText = "";

      try {
        setStatus(CHAT_STATUS_ENUM.WRITING);
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const events = chunk.split("\n");

          for (const event of events) {
            const line = event.replace("data:", "");
            if (!line.trim()) continue;

            try {
              const data = JSON.parse(line);

              if (data.text) {
                accumulatedText += data.text;
                setCurrentMessage(accumulatedText);
                scrollToBottom();
              }

              if (data.id) {
                setStatus(CHAT_STATUS_ENUM.READY);
                if (data.id !== conversationId) {
                  setConversationId(data.id);
                }
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        }
      } catch (error) {
        console.error("Stream error:", error);
      }
    },
    [conversationId, scrollToBottom]
  );

  const handleSendMessage = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!userMessage.trim() || isLoading) return;

      setStatus(CHAT_STATUS_ENUM.LOADING);

      setuserMessage("");

      try {
        const response = await ChatbotService.sendMessage(
          conversationId
            ? {
                history: messages,
                message: userMessage,
                id: conversationId,
              }
            : { history: messages, message: userMessage }
        );

        setMessages((prev) => [
          ...prev,
          { content: userMessage, role: CHAT_ROLES.USER },
        ]);
        await processStream(response);
        setStatus(CHAT_STATUS_ENUM.READY);
      } catch (error) {
        setStatus(CHAT_STATUS_ENUM.ERROR);
        console.error("Request failed:", error);
      }
    },
    [conversationId, userMessage, messages, isLoading, processStream]
  );

  return {
    isOpen,
    handleOpen,
    handleClose,
    isLoading,
    isError,
    isWriting,
    handleSendMessage,
    currentMessage,
    messages,
    userMessage,
    handleChangeUserMessage,
    handleWritingFinish,
    messagesEndRef,
    scrollToBottom,
    cleanError,
  };
};
