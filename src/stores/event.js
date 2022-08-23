import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useEventStore = defineStore({
    id: 'event',
    state: () => ({
        events: [],
    }),
    getters: {},
    actions: {
        // APIs
        async getAllEvents() {
            const response = await axios.get(`${API_URL}/save-event`)
            this.events = response.data
        },
    },
})
