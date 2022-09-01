import axios from 'axios'
import {defineStore} from 'pinia'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useMainSearchStore = defineStore({
    id: 'mainSearch',
    state: () => ({
        mainSearch: [],
    }),
    actions: {
        async getMainSearch() {
            const response = await axios.get(`${API_URL}/main-search-default`)
            this.mainSearch = response.data
        },
    },
})
