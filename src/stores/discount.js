import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useDiscountStore = defineStore({
    id: 'discount',
    state: () => ({
        discountsByDate: [],
    }),
    getters: {},
    actions: {
        async getDiscountsByDate() {
            const response = await axios.get(`${API_URL}/discounts-by-date`)
            this.discountsByDate = response.data
        },
    },
})
