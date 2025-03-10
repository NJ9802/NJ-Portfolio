import { CHAT_ROLES } from "@/constants";
import { CHAT_STATUS_ENUM } from "@/constants/chat-status.enum";
import { ChatbotService } from "@/services";
import { Message } from "@/types/Message";
import { FormEvent, useCallback, useMemo, useRef, useState } from "react";

export const useChatbotConfig = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [userMessage, setuserMessage] = useState("");
  const [status, setStatus] = useState(CHAT_STATUS_ENUM.READY);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [streamId, setStreamId] = useState<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const [cancelScrollingBottom, setCancelScrollingBottom] = useState(false);

  const isLoading = useMemo(
    () => status === CHAT_STATUS_ENUM.LOADING,
    [status]
  );

  const isError = useMemo(() => status === CHAT_STATUS_ENUM.ERROR, [status]);
  const isWriting = useMemo(
    () => status === CHAT_STATUS_ENUM.WRITING,
    [status]
  );
  const isStopped = useMemo(
    () => status === CHAT_STATUS_ENUM.STOPPED,
    [status]
  );
  const isStreaming = useMemo(
    () => status === CHAT_STATUS_ENUM.STREAMING,
    [status]
  );

  const scrollToBottom = useCallback(() => {
    if (!cancelScrollingBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [cancelScrollingBottom]);

  const handleCancelScrollingBottom = useCallback(() => {
    if (isWriting || isStreaming) {
      setCancelScrollingBottom(true);
    }
  }, [isWriting, isStreaming]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleStopStreaming = useCallback(async () => {
    try {
      if (isLoading) {
        abortControllerRef.current?.abort();
      }

      if (streamId) {
        const res = await ChatbotService.stopStreaming(streamId);
        if (res.ok) {
          setStreamId("");
        }
      }
      if (isStreaming || isWriting) {
        setStatus(CHAT_STATUS_ENUM.STOPPED);
      }
    } catch (error) {
      console.error(error);
    }
  }, [streamId, isWriting, isStreaming, isLoading]);

  const handleWritingFinish = useCallback(
    (finishAll?: boolean) => {
      if (!isWriting && !isStreaming && currentMessage) {
        setMessages((prev) => [
          ...prev,
          { content: currentMessage, role: CHAT_ROLES.MODEL },
        ]);
        if (isStopped) {
          setStatus(CHAT_STATUS_ENUM.READY);
          setCancelScrollingBottom(false);
        }
        setCurrentMessage("");
      }

      if (finishAll) {
        setStatus(CHAT_STATUS_ENUM.READY);
        setCancelScrollingBottom(false);
      }
    },
    [currentMessage, isWriting, isStopped, isStreaming]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    handleStopStreaming();
    handleWritingFinish();
  }, [setIsOpen, handleStopStreaming, handleWritingFinish]);

  const handleChangeUserMessage = useCallback((value: string) => {
    setuserMessage(value);
  }, []);

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
        setStatus(CHAT_STATUS_ENUM.STREAMING);
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const events = chunk.split("\n");

          for (const event of events) {
            const line = event.replace("data:", "");
            if (line === "event: error") {
              throw new Error("Stream error");
            }
            if (!line.trim()) continue;

            try {
              const data = JSON.parse(line);

              if (data.text) {
                accumulatedText += data.text;
                setCurrentMessage(accumulatedText);
                scrollToBottom();
              }

              if (data.id) {
                if (data.id !== conversationId) {
                  setConversationId(data.id);
                }
              }
            } catch {}
          }
        }
      } catch (error) {
        console.error("Stream error:", error);
        throw error;
      } finally {
        setStatus(CHAT_STATUS_ENUM.WRITING);
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
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        const response: Response = await ChatbotService.sendMessage(
          conversationId
            ? {
                history: messages,
                message: userMessage,
                id: conversationId,
              }
            : { history: messages, message: userMessage },
          { signal }
        );

        const streamId = response.headers.get("x-stream-id");

        if (streamId) {
          setStreamId(streamId);
        }

        setMessages((prev) => [
          ...prev,
          { content: userMessage, role: CHAT_ROLES.USER },
        ]);
        await processStream(response);
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          setStatus(CHAT_STATUS_ENUM.ERROR);
          console.error("Request failed:", error);
        }
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
    isStopped,
    handleSendMessage,
    currentMessage,
    messages,
    userMessage,
    handleChangeUserMessage,
    handleWritingFinish,
    messagesEndRef,
    scrollToBottom,
    cleanError,
    handleStopStreaming,
    isStreaming,
    handleCancelScrollingBottom,
  };
};
