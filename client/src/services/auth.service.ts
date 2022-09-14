import { httpClient } from '../_helpers'

export const authService = {
    login,
    register,
}


async function login(email: string, password: string) {
    return httpClient.post(`/auth/login`, { email, password })
}

async function register(name:string,email: string, password: string,re_password: string) {
    return httpClient.post(`/auth/register`, {name, email, password ,re_password})
}