import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useOrderStore = defineStore({
  id: 'order',
  state: () => ({
    ordersForUsers: [],
    ordersForAdmins: [],
    accounting: [],
  }),
  actions: {
    async getOrdersForUsers() {
      const response = await axios.get(`${API_URL}/user/orders`, {
        headers: authHeader(),
      })
      this.ordersForUsers = response.data
    },
    async getOrdersForAdmins() {
      const response = await axios.get(`${API_URL}/admin/orders`, {
        headers: authHeader(),
      })
      this.ordersForAdmins = response.data
    },
    async getAccounting(fromDate, toDate) {
      await axios
        .get(`${API_URL}/admin/accounting`, {
          headers: authHeader(),
          params: {
            ...(fromDate ? { from: fromDate } : {}),
            ...(fromDate ? { to: toDate } : {}),
          },
        })
        .then((response) => {
          this.accounting = response.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
})
