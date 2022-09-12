import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'
import { useModalStore } from './modal.js'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useUserStore } from './user.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: '',
    isLogin: false,
    isSSOLogin: false,
    user: '',
    userId: '',
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
      this.token = sessionStorage.getItem('Authorization')
      this.isLogin = !!sessionStorage.getItem('Authorization')
    },
    checkSSOLogin(token) {
      sessionStorage.setItem('Authorization', token)
      this.token = token
      this.isSSOLogin = !!token
    },
    async logout() {
      await axios
        .get(`${API_URL}/auth/logout`, { headers: authHeader() })
        .then(() => {
          this.token = ''
          sessionStorage.removeItem('Authorization')
          sessionStorage.removeItem('role')
          sessionStorage.removeItem('sp_id')
          sessionStorage.removeItem('sb_id')
          this.isLogin = false
        })
        .catch((err) => {
          // notify.error({
          //   title: 'Error',
          //   message: 'While logging out. Please try again!',
          //   position: 'bottomRight',
          // })
        })
      this.token = ''
      sessionStorage.removeItem('Authorization')
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('sp_id')
      sessionStorage.removeItem('sb_id')
      this.isLogin = false
    },
    async ssoLogout() {
      await axios
        .get(`${API_URL}/auth/sso-logout`, { headers: authHeader() })
        .then(() => {
          this.token = ''
          this.isSSOLogin = false
          sessionStorage.removeItem('Authorization')
          sessionStorage.removeItem('role')
          sessionStorage.removeItem('sp_id')
          sessionStorage.removeItem('sb_id')
        })
        .catch((err) => {
          // notify.error({
          //   title: 'Error',
          //   message: 'While logging out. Please try again!',
          //   position: 'bottomRight',
          // })
        })
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
          this.userId = response?.data?.uuid
          sessionStorage.setItem('role', response?.data?.role)
          if (response?.data?.role === 'user') useUserStore().getCart()
        })
        .catch((err) => {
          if (err.message.split(' ').includes('403')) {
            this.logout()
          } else {
            notify.warning({
              message: msg,
              position: 'bottomLeft',
            })
          }
        })
    },
    async registerUser(data) {
      await axios
        .post(`${API_URL}/auth/user`, data)
        .then((response) => {
          notify.success({
            message:
              'Registeration progress successfully completed! Please check email!',
            position: 'bottomLeft',
          })
        })
        .catch((err) => {
          notify.warning({
            message: msg,
            position: 'bottomLeft',
          })
        })
    },
  },
})
