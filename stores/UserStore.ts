import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'UserStore',
  state: () => ({ 
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
