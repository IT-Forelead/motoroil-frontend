import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useCommentStore = defineStore({
    id: 'comment',
    state: () => ({
        comments: [],
    }),
    getters: {},
    actions: {
        // APIs
        async getAllComments() {
            const response = await axios.get(`${API_URL}/comments`)
            this.comments = response.data
        },
    },
})
