export const processStream = async ({
  response,
  onStreamEnd,
  onStartStream,
  updateCurrentMessage,
  updateConversationId,
}: {
  response: Response;
  onStreamEnd: () => void;
  onStartStream: () => void;
  updateCurrentMessage: (message: string) => void;
  updateConversationId: (id: string) => void;
}) => {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) return;

  let accumulatedText = "";

  try {
    onStartStream();
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
            updateCurrentMessage(accumulatedText);
          }

          if (data.id) {
            updateConversationId(data.id);
          }
        } catch {}
      }
    }
  } catch (error) {
    console.error("Stream error:", error);
    throw error;
  } finally {
    onStreamEnd();
  }
};
