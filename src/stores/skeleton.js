import { defineStore } from 'pinia'

export const useSkeletonStore = defineStore({
  id: 'skeleton',
  state: () => ({
    isContentLoaded: false,
  }),
  actions: {
    changeContentLoadStatus() {
      this.isContentLoaded = true
    },
  },
})
