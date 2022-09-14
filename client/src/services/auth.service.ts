import { httpClient } from '../_helpers'

export const authService = {
    login,
}


async function login(email: string, password: string) {
    return httpClient.post(`/auth/login`, { email, password })
}