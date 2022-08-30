import { defineStore } from 'pinia'

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isOpen: false,
    isOpenRegisterModal: false,
    isOpenResetPassword: false,
  }),
  actions: {
    openModal() {
      this.isOpen = true
      this.isOpenRegisterModal = false
    },
    closeModal() {
      this.isOpen = false
    },
    openRegisterModal() {
      this.isOpenRegisterModal = true
      this.isOpen = false
    },
    closeRegisterModal() {
      this.isOpenRegisterModal = false
    },
    openResetPasswordModal() {
      this.isOpenResetPassword = true
      this.isOpen = false
    },
    closeResetPasswordModal() {
      this.isOpenResetPassword = false
    },
  },
})
