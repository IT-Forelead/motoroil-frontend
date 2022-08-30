import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'
import { useModalStore } from './modal.js'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

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
          notify.warning({
            message: 'Email or password is incorrect. Please try again!',
            position: 'bottomRight',
          })
        })
    },
    checkLogin() {
      this.isLogin =
        sessionStorage.getItem('Authorization') || this.token ? true : false
    },
    checkSSOLogin(token) {
      sessionStorage.setItem('Authorization', token)
      this.token = token
      this.isLogin =
        token ? true : false
    },
    logout() {
      this.token = ''
      sessionStorage.removeItem('Authorization')
      sessionStorage.removeItem('role')
    },
    async sendRecoveryEmail(email) {
      await axios
        .get(`${API_URL}/user/send-email/${email}`)
        .then(() => {
          notify.success({
            message: `Code sent to ${email} please click to Reset Password button!`,
            position: 'bottomRight',
          })
          useModalStore().closeResetPasswordModal()
        })
        .catch((err) => {
          notify.error({
            title: 'Error',
            message: 'While sending reset password email. Please try again!',
            position: 'bottomRight',
          })
        })
    },
    async getUser() {
      await axios
        .get(`${API_URL}/user`, { headers: authHeader() })
        .then((response) => {
          this.user = response?.data
          sessionStorage.setItem('role', response?.data?.role)
        })
        .catch((err) => {
          console.log('Error ', err)
        })
    },
  },
})
