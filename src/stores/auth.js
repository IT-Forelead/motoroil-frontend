import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'
import { useModalStore } from './modal.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: '',
    isLogin: false,
    user: '',
  }),
  actions: {
    async loginUser(data) {
      await axios
        .post(`${API_URL}/auth/login`, data)
        .then((response) => {
          this.token = response?.data?.value
          sessionStorage.setItem('Authorization', response?.data?.value)
          this.isLogin = true
          useModalStore().closeModal()
        })
        .catch((err) => {
          console.log('Error ', err)
        })
    },
    checkLogin() {
      this.isLogin =
        sessionStorage.getItem('Authorization') || this.token ? true : false
    },
    logout() {
      this.token = ''
      sessionStorage.removeItem('Authorization')
    },
    async getUser() {
      await axios
        .get(`${API_URL}/user`, { headers: authHeader() })
        .then((response) => {
          this.user = response?.data
        })
        .catch((err) => {
          console.log('Error ', err)
        })
    },
  },
})
