import type { User } from '~/types/User'

export default {
    get: async (): Promise<{ sucesso: boolean, data: Array<User> }> => {
        return await $fetch('/api/users')
    },
    registerUser: async (body: User) => {
        return await $fetch('/api/users', { method: 'POST', body: JSON.stringify(body) })
    }
}