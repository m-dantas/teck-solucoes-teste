import { defineStore } from 'pinia'
import { useAlertStore } from './AlertStore'
import type { User } from '~/types/User'
import userService from '~/services/user'

type UserStoreState = {
  users: Array<User>
  user: User
}

function COMMONS_EXCEPTIONS_MESSAGE (err: any) {
  if (err.response) {
    const { _data } = err.response;
    return _data.message
  }
  return err.message
}

export const useUserStore = defineStore('UserStore', {
  state: () => ({ 
    users: [],
    user: {
      id: '',
      cpf: '',
      email: '',
      group: '',
      name: '',
      username: ''
    },
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
    async getUserByd (id: string) {
      const alertStore = useAlertStore();
      alertStore.$reset()

      try {
        const { data } = await userService.getById(id)
        this.user = data as User
      } catch (err: any) {
        alertStore.setMessage(COMMONS_EXCEPTIONS_MESSAGE(err))
        alertStore.setIsError(true)
        alertStore.setShow(true)
      }
    },
    async createNewRegister (body: User, to: string) {
      const alertStore = useAlertStore();
      const router = useRouter()
      alertStore.$reset()

      try {
        const { message } = await userService.registerUser(body)
        await this.getListUser()
        alertStore.setMessage(message)
        alertStore.setIsError(false)
        alertStore.setShow(true)
        setTimeout(() => router.push(to), 550)
      } catch (err: any) {
        alertStore.setMessage(COMMONS_EXCEPTIONS_MESSAGE(err))
        alertStore.setIsError(true)
        alertStore.setShow(true)
      }
    },
    async updateRegister (id: string, body: User, to: string) {
      const alertStore = useAlertStore();
      const router = useRouter()
      alertStore.$reset()

      try {
        const { message } = await userService.updateUser(id, body)
        await this.getListUser()
        this.resetUser()
        alertStore.setMessage(message)
        alertStore.setIsError(false)
        alertStore.setShow(true)
        setTimeout(() => router.push(to), 550)
      } catch (err: any) {
        alertStore.setMessage(COMMONS_EXCEPTIONS_MESSAGE(err))
        alertStore.setIsError(true)
        alertStore.setShow(true)
      }
    },
    resetUser () {
      this.user.id = ''
      this.user.name = ''
      this.user.cpf = ''
      this.user.username = ''
      this.user.email = ''
      this.user.group = ''
    }
  }
})
