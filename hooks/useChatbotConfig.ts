import { CHAT_ROLES } from "@/constants";
import { CHAT_STATUS_ENUM } from "@/constants/chat-status.enum";
import { Message } from "@/types/Message";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";

export const useChatbotConfig = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [userMessage, setuserMessage] = useState("");
  const [status, setStatus] = useState(CHAT_STATUS_ENUM.READY);

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

  const handleChangeUserMessage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setuserMessage(e.target.value);
    },
    []
  );

  const handleWritingFinish = useCallback(() => {
    if (!isWriting) {
      setMessages((prev) => [
        ...prev,
        { content: currentMessage, role: CHAT_ROLES.MODEL },
      ]);
      setCurrentMessage("");
    }
  }, [currentMessage, isWriting]);

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
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.trim()) continue;

            try {
              const data = JSON.parse(line);

              if (data.text) {
                accumulatedText += data.text;
                setCurrentMessage(accumulatedText);
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
    [conversationId]
  );

  const handleSendMessage = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!userMessage.trim() || isLoading) return;

      setStatus(CHAT_STATUS_ENUM.LOADING);

      setuserMessage("");

      try {
        const response = await fetch(
          "http://localhost:3000/api/chatbot/stream",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(
              conversationId
                ? {
                    history: messages,
                    message: userMessage,
                    id: conversationId,
                  }
                : { history: messages, message: userMessage }
            ),
          }
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
    handleSendMessage,
    currentMessage,
    messages,
    userMessage,
    handleChangeUserMessage,
    handleWritingFinish,
  };
};
