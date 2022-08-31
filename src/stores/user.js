import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    wishlist: []
  }),
  actions: {
    async addWishlist(data) {
      await axios
        .post(`${API_URL}/user/add-wishlist`, data, {headers: authHeader()})
        .then(() => {
          notify.success({
            message: 'Liked!',
            position: 'bottomRight',
          })
        })
        .catch((err) => {
          notify.warning({
            message: 'Not liked!',
            position: 'bottomRight',
          })
        })
    },
  },
})
