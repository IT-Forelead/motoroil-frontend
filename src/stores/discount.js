import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useDiscountStore = defineStore({
    id: 'discount',
    state: () => ({
        discountsByDate: [],
        discounts: [],
    }),
    getters: {},
    actions: {
        async getDiscountsByDate() {
            const response = await axios.get(`${API_URL}/discounts-by-date`)
            this.discountsByDate = response.data
        },
        async getDiscounts() {
            const response = await axios.get(`${API_URL}/admin/discounts`, {headers: authHeader()})
            this.discounts = response.data
        },
        async createDiscount(data) {
          await axios
            .post(`${API_URL}/admin/create-discount`, data, { headers: authHeader() })
            .then(() => {
              notify.success({
                message: 'Discount added!',
                position: 'bottomRight',
              })
              this.getDiscounts()
            })
            .catch((err) => {
              notify.warning({
                message: 'Discount not added!',
                position: 'bottomRight',
              })
            })
        },
        async deleteDiscount(id) {
          await axios
            .get(`${API_URL}/admin/delete-discount/${id}`, { headers: authHeader() })
            .then(() => {
              notify.success({
                message: 'Discount deleted!',
                position: 'bottomRight',
              })
              this.getDiscounts()
            })
            .catch(() => {
              notify.error({
                title: 'Error',
                message: 'While discount deleting!',
                position: 'bottomRight',
              })
            })
        },
    },
})
