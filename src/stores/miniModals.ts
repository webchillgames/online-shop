import { defineStore } from 'pinia'

export const useMiniModalsStore = defineStore('miniModals', {
  state: () => ({
    msg: '',
    status: '',
    isShow: false
  }),
  actions: {
    showMiniModal(msg: string, status: string) {
      this.msg = msg
      this.status = status
      this.isShow = true

      setTimeout(() => {
        this.msg = ''
        this.status = ''
        this.isShow = false
      }, 2000)
    }
  }
})
