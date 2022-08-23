import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useSlideStore = defineStore({
    id: 'slide',
    state: () => ({
        slides: [],
    }),
    getters: {},
    actions: {
        // APIs
        async getAllSlides() {
            const response = await axios.get(`${API_URL}/get-slides`)
            this.slides = response.data
        },
    },
})
