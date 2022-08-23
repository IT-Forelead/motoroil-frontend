import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useCategoryStore = defineStore({
    id: 'category',
    state: () => ({
        categories: [],
        subCategories: [],
        miniSubCategories: [],
    }),
    getters: {},
    actions: {
        // APIs
        async getAllCategories() {
            const response = await axios.get(`${API_URL}/categories`)
            this.categories = response.data
        },
        async getAllSubCategories() {
            const response = await axios.get(`${API_URL}/sub-categories`)
            this.subCategories = response.data
        },
        async getAllMiniSubCategories() {
            const response = await axios.get(`${API_URL}/mini-sub-categories`)
            this.miniSubCategories = response.data
        },
    },
})
