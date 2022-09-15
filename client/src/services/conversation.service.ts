import { httpClient } from '../_helpers'

export const conversationService = {
    getAllConversationsById,
}

async function getAllConversationsById(id: string) {
    return httpClient.get(`/conversation/${id}`)
}
