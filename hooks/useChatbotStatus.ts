import { CHAT_STATUS_ENUM } from "@/constants/chat-status.enum";
import { useCallback, useMemo, useState } from "react";

export const useChatbotStatus = () => {
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
  const isStopped = useMemo(
    () => status === CHAT_STATUS_ENUM.STOPPED,
    [status]
  );
  const isStreaming = useMemo(
    () => status === CHAT_STATUS_ENUM.STREAMING,
    [status]
  );
  const isReady = useMemo(() => status === CHAT_STATUS_ENUM.READY, [status]);

  const setReady = useCallback(() => setStatus(CHAT_STATUS_ENUM.READY), []);
  const setLoading = useCallback(() => setStatus(CHAT_STATUS_ENUM.LOADING), []);
  const setError = useCallback(() => setStatus(CHAT_STATUS_ENUM.ERROR), []);
  const setWriting = useCallback(() => setStatus(CHAT_STATUS_ENUM.WRITING), []);
  const setStopped = useCallback(() => setStatus(CHAT_STATUS_ENUM.STOPPED), []);
  const setStreaming = useCallback(
    () => setStatus(CHAT_STATUS_ENUM.STREAMING),
    []
  );

  return {
    isLoading,
    isError,
    isWriting,
    isStopped,
    isStreaming,
    isReady,
    setReady,
    setLoading,
    setError,
    setWriting,
    setStopped,
    setStreaming,
  };
};
