import { Imessage } from '../types'
import { httpClient } from '../_helpers'

export const messengerService = {
    getAllMessages,
    sendMessage
}

async function getAllMessages(id: string,limit=15 ,page=1) {
    return httpClient.get(`/message/allMessage/${id}?limit=${limit}&page=${page}`)
}

async function sendMessage(message:Imessage) {
    return httpClient.post(`/message/sendMessage`,message)
}