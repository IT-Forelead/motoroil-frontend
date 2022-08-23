import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useBrandStore = defineStore({
    id: 'brand',
    state: () => ({
        brands: [],
    }),
    getters: {},
    actions: {
        // APIs
        async getAllBrands() {
            const response = await axios.get(`${API_URL}/brands`)
            this.brands = response.data
        },
    },
})
