import { defineStore } from 'pinia'

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isOpen: false,
    isOpenRegisterModal: false,
  }),
  actions: {
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    },
    openRegisterModal() {
      this.isOpenRegisterModal = true
    },
    closeRegisterModal() {
      this.isOpenRegisterModal = false
    },
  },
})
