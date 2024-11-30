import { defineStore } from 'pinia'

type AlertStoreState = {
  message: string,
  isError: boolean,
  show: boolean
}

export const useAlertStore = defineStore('AlertStore', {
  state: () => ({
    message: '',
    isError: false,
    show: false
  } as AlertStoreState),
  actions: {
    setMessage (message: string) {
      this.message = message
    },
    setIsError (isError: boolean) {
      this.isError = isError
    },
    setShow (show: boolean) {
      this.show = show
    },
    resetState() {
      this.show = false
      this.isError = false,
      this.message = ''
    }
  }
})
