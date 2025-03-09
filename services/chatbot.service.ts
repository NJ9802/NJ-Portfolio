import { ChatDto } from "@/types/ChatDto";
import { ApiClientService } from "./api-client.service";
import { EntityApiService } from "./entity-api.service";
import { CHATBOT_HOST } from "@/settings";

class ChatbotService extends EntityApiService {
  sendMessage = (chat: ChatDto) => {
    return this.handleResponse(
      ApiClientService.post(this.getPath("/api/chatbot/stream"), chat, {
        "Content-Type": "application/json",
      })
    );
  };

  stopStreaming = (id: string) => {
    return this.handleResponse(
      ApiClientService.delete(this.getPath(`/api/chatbot/stream/${id}`))
    );
  };
}

const chatbotServiceInstance = new ChatbotService(CHATBOT_HOST);
export default chatbotServiceInstance;
