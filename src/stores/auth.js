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
    isSSOLogin: false,
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
      this.token = sessionStorage.getItem('Authorization')
      this.isLogin = sessionStorage.getItem('Authorization') ? true : false
    },
    checkSSOLogin(token) {
      sessionStorage.setItem('Authorization', token)
      this.token = token
      this.isSSOLogin = token ? true : false
    },
    async logout() {
      console.log('default logout')
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
          notify.error({
            title: 'Error',
            message: 'While logging out. Please try again!',
            position: 'bottomRight',
          })
        })
      this.token = ''
      sessionStorage.removeItem('Authorization')
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('sp_id')
      sessionStorage.removeItem('sb_id')
      this.isLogin = false
    },
    async ssoLogout() {
      console.log('sso logout')
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
          notify.error({
            title: 'Error',
            message: 'While logging out. Please try again!',
            position: 'bottomRight',
          })
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
          sessionStorage.setItem('role', response?.data?.role)
        })
        .catch((err) => {
          console.log('Error ', err)
        })
    },
  },
})
