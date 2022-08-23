import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useAboutUsStore = defineStore({
    id: 'aboutUs',
    state: () => ({
        aboutUsInfos: [],
    }),
    getters: {},
    actions: {
        // APIs
        async getAllAboutUsInfos() {
            const response = await axios.get(`${API_URL}/get-about-us`)
            this.aboutUsInfos = response.data
        },
    },
})
