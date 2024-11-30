import { defineStore } from 'pinia'
import { useAlertStore } from './AlertStore'
import type { User } from '~/types/User'
import userService from '~/services/user'

type UserStoreState = {
  users: Array<User>
}

export const useUserStore = defineStore('UserStore', {
  state: () => ({ 
    users: [],
    error: {
      is: false,
      message: ''
    },
  } as UserStoreState),
  actions: {
    async getListUser () {
      const alertStore = useAlertStore();
      try {
        const { sucesso, data } = await userService.get()
        if (sucesso) {
          this.users = data
        } else {
          throw new Error('Ocorreu um erro na chamada')
        }
      } catch (err: unknown) {
        alertStore.resetState()
        if (err instanceof Error) {
          alertStore.setMessage(err.message)
          alertStore.setIsError(true)
          alertStore.setShow(true)
        }
      }
    },
    async createNewRegister (body: User) {
      const alertStore = useAlertStore();
      try {
        const { sucesso } = await userService.registerUser(body)
        if (sucesso) {
          await this.getListUser()
          alertStore.resetState()
          alertStore.setMessage('Registro criado com sucesso.')
          alertStore.setIsError(false)
          alertStore.setShow(true)
        } else {
          throw new Error('Ocorreu um erro na chamada')
        }
      } catch (err) {
        alertStore.resetState()
        if (err instanceof Error) {
          alertStore.setMessage(err.message)
          alertStore.setIsError(true)
          alertStore.setShow(true)
        }
      }
    }
  }
})
