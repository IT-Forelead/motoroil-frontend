import { defineStore } from 'pinia'

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isOpen: false,
    isOpenRegisterModal: false,
    isOpenVideoModal: false,
    isOpenResetPassword: false,
    isOpenAddProductModal: false
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
    openVideoModal() {
      this.isOpenVideoModal = true
    },
    closeVideoModal() {
      this.isOpenVideoModal = false
    },
    openResetPasswordModal() {
      this.isOpenResetPassword = true
      this.isOpen = false
    },
    closeResetPasswordModal() {
      this.isOpenResetPassword = false
    },
    openAddProductModal() {
      this.isOpenAddProductModal = true
    },
    closeAddProductModal() {
      this.isOpenAddProductModal = false
    },
  },
})
