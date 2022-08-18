import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {
      id: 1, 
      firstname: "Hello",
      age: 12
    }
  }),
  getters: {

  },
  actions: {

  }
})