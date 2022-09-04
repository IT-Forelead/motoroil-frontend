import { defineStore } from 'pinia'

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isOpen: false,
    isOpenRegisterModal: false,
    isOpenVideoModal: false,
    isOpenResetPassword: false,
    isOpenAddDiscountModal: false,
    isOpenEditDiscountModal: false,
    isOpenAddDiscountToProductModal: false,
    isOpenRemoveDiscountInProductModal: false,
    isOpenAddProductModal: false,
    isOpenEditProductModal: false,
    isOpenSlideModal: false,
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
    openSlideModal() {
      this.isOpenSlideModal = true
    },
    closeSlideModal() {
      this.isOpenSlideModal = false
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
    openAddDiscountModal() {
      this.isOpenAddDiscountModal = true
    },
    closeAddDiscountModal() {
      this.isOpenAddDiscountModal = false
    },
    openEditDiscountModal() {
      this.isOpenEditDiscountModal = true
    },
    closeEditDiscountModal() {
      this.isOpenEditDiscountModal = false
    },
    openAddDiscountToProductModal() {
      this.isOpenAddDiscountToProductModal = true
    },
    closeAddDiscountToProductModal() {
      this.isOpenAddDiscountToProductModal = false
    },
    openRemoveDiscountInProductModal() {
      this.isOpenRemoveDiscountInProductModal = true
    },
    closeRemoveDiscountInProductModal() {
      this.isOpenRemoveDiscountInProductModal = false
    },
    openEditProductModal() {
      this.isOpenEditProductModal = true
    },
    closeEditProductModal() {
      this.isOpenEditProductModal = false
    },
  },
})
