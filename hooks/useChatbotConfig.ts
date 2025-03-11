import { ChatbotService } from "@/services";
import { processStream } from "@/utils/chatbotHelpers";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useChatbotMessagesHistory } from "./useChatbotMessagesHistory";
import { useChatbotStatus } from "./useChatbotStatus";

export const useChatbotConfig = () => {
  const {
    isLoading,
    isError,
    isWriting,
    isStopped,
    isStreaming,
    isReady,
    setReady,
    setError,
    setWriting,
    setLoading,
    setStopped,
    setStreaming,
  } = useChatbotStatus();
  const { messages, addModelMessage, addUserMessage } =
    useChatbotMessagesHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [streamId, setStreamId] = useState<string>("");
  const [cancelScrollingBottom, setCancelScrollingBottom] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleChangeUserMessage = useCallback((value: string) => {
    setUserMessage(value);
  }, []);

  const cleanError = useCallback(() => {
    setReady();
  }, [setReady]);

  const resetChatbotState = useCallback(() => {
    if (!isError) {
      setReady();
    }
    setCurrentMessage("");
  }, [setReady, setCurrentMessage, isError]);

  const updateConversationId = useCallback(
    (id: string) => {
      if (id !== conversationId) {
        setConversationId(id);
      }
    },
    [conversationId]
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
    setCancelScrollingBottom(false);
  }, [setIsOpen]);

  const handleWritingFinish = useCallback(
    (finishAll?: boolean) => {
      if ((finishAll && !isStreaming) || isStopped) {
        addModelMessage(currentMessage);
        resetChatbotState();
      }
    },
    [currentMessage, isStopped, isStreaming, resetChatbotState, addModelMessage]
  );

  const handleStopStreaming = useCallback(async () => {
    try {
      if (isLoading) {
        abortControllerRef.current?.abort();
        return;
      }

      if (streamId && isStreaming) {
        const res = await ChatbotService.stopStreaming(streamId);
        if (res.ok) {
          setStreamId("");
        }
      } else {
        setStreamId("");
      }

      if (isStreaming || isWriting) {
        setStopped();
        handleWritingFinish(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    streamId,
    isWriting,
    isStreaming,
    isLoading,
    setStopped,
    handleWritingFinish,
  ]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (isReady) return;

    if (isStreaming || isWriting) {
      handleStopStreaming();
      addModelMessage(currentMessage);
    }

    resetChatbotState();
  }, [
    setIsOpen,
    handleStopStreaming,
    isReady,
    isStreaming,
    isWriting,
    resetChatbotState,
    addModelMessage,
    currentMessage,
  ]);

  const handleSendMessage = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!userMessage.trim() || isLoading) return;

      setLoading();
      setUserMessage("");
      setCancelScrollingBottom(false);

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

        addUserMessage(userMessage);

        await processStream({
          response,
          onStartStream: setStreaming,
          onStreamEnd: setWriting,
          updateCurrentMessage: setCurrentMessage,
          updateConversationId,
        });
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          setError();
          console.error("Request failed:", error);
        }
      }
    },
    [
      conversationId,
      userMessage,
      messages,
      isLoading,
      setError,
      setLoading,
      setStreaming,
      setWriting,
      updateConversationId,
      addUserMessage,
    ]
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
