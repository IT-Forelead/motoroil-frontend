import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useAnalyticsStore = defineStore({
  id: 'analytics',
  state: () => ({
    events: [],
    visitorId: localStorage.getItem('VisitorId') || '',
  }),
  actions: {
    setVisitorId(id) {
      this.visitorId = id
      localStorage.setItem('VisitorId', id)
    },
    async saveEvent(data) {
      await axios
        .post(`${API_URL}/save-event`, data)
        .then(() => {})
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While saving event!',
            position: 'bottomRight',
          })
        })
    },
    async getAnalytics() {
      await axios
        .get(`${API_URL}/admin/analytics`, { headers: authHeader() })
        .then((response) => {
          this.events = response?.data
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While saving event!',
            position: 'bottomRight',
          })
        })
    },
  },
})
