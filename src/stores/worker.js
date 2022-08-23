import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useWorkerStore = defineStore({
    id: 'worker',
    state: () => ({
        workers: [],
    }),
    getters: {},
    actions: {
        // APIs
        async getAllWorkers() {
            const response = await axios.get(`${API_URL}/workers`)
            this.workers = response.data
        },
    },
})
