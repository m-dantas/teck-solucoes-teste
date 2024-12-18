import type { User } from '~/types/User'

export default {
  get: async () => {
    return await $fetch('/api/users')
  },
  getById: async (id: string) => {
    return await $fetch(`/api/users/${id}`)
  },
  registerUser: async (body: User) => {
    return await $fetch('/api/users', { method: 'POST', body: JSON.stringify(body) })
  },
  updateUser: async (id: string, body: User) => {
    return await $fetch(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(body) })
  },
  deleteUser: async (id: string) => {
    return await $fetch(`/api/users/${id}`, { method: 'DELETE' })
  },
}