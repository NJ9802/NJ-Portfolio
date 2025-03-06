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
}

const chatbotServiceInstance = new ChatbotService(CHATBOT_HOST);
export default chatbotServiceInstance;
