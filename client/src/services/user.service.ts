import { httpClient } from '../_helpers'

export const userService = {
    getUsersById,
}

async function getUsersById(id: string) {
    return httpClient.get(`/user/view/${id}`)
}
