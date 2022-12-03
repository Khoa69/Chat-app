import { httpClient } from "../_helpers";

export const conversationService = {
  getAllConversationsById,
  getOrCreateConversation,
};

async function getAllConversationsById(id: string) {
  return httpClient.get(`/conversation/${id}`);
}

async function getOrCreateConversation(form: any) {
  return httpClient.post(`/conversation/findOrCreate`, form);
}
