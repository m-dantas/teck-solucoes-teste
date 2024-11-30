import { defineStore } from 'pinia'
import { useAlertStore } from './AlertStore'
import type { User } from '~/types/User'
import userService from '~/services/user'

type UserStoreState = {
  users: Array<User>
}

function COMMONS_EXCEPTIONS_MESSAGE (err: any) {
  if (err.response) {
    const { status, _data } = err.response;
    return _data.message
  }
  return err.message
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
      alertStore.$reset()

      try {
        const { data } = await userService.get()
        this.users = data
      } catch (err: any) {
        alertStore.setMessage(COMMONS_EXCEPTIONS_MESSAGE(err))
        alertStore.setIsError(true)
        alertStore.setShow(true)
      }
    },
    async createNewRegister (body: User) {
      const alertStore = useAlertStore();
      alertStore.$reset()

      try {
        const { message } = await userService.registerUser(body)
        await this.getListUser()
        alertStore.setMessage(message)
        alertStore.setIsError(false)
        alertStore.setShow(true)
      } catch (err: any) {
        alertStore.setMessage(COMMONS_EXCEPTIONS_MESSAGE(err))
        alertStore.setIsError(true)
        alertStore.setShow(true)
      }
    }
  }
})
