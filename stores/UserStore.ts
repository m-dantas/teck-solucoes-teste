import { defineStore } from 'pinia'
import type { User } from '~/types/User'
import userService from '~/services/user'

type UserStoreState = {
  users: Array<User>,
  error: {
    is: boolean,
    message: string
  }
}

export const useUserStore = defineStore({
  id: 'UserStore',
  state: () => ({ 
    users: [],
    error: {
      is: false,
      message: ''
    },
  } as UserStoreState),
  actions: {
    async getListUser () {
      try {
        const { sucesso, data } = await userService.get()
        if (sucesso) {
          this.users = data
        } else {
          throw new Error('Ocorreu um erro na chamada')
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          this.error.message = `Erro: ${err.message}`
          this.error.is = true
        }
      }
    },
    async createNewRegister (body: User) {
      try {
        const { sucesso } = await userService.registerUser(body)
        if (sucesso) {
          await this.getListUser()
        } else {
          throw new Error('Ocorreu um erro na chamada')
        }
      } catch (err) {
        if (err instanceof Error) {
          this.error.message = `Erro: ${err.message}`
          this.error.is = true
        }
      }
    }
  }
})
