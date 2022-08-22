import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useBlogStore = defineStore({
  id: 'blog',
  state: () => ({
    latestBlogs: [],
    blogs: [],
    singleBlog: {},
  }),
  getters: {},
  actions: {
    // APIs
    async getAllLatestBlogs() {
      const response = await axios.get(`${API_URL}/new-blogs`)
      this.latestBlogs = response.data
    },
    async getAllBlogs() {
      const response = await axios.get(`${API_URL}/blogs`)
      this.blogs = response.data
    },
    async getSingleBlog(id) {
      const response = await axios.get(`${API_URL}/blog-by-id/${id}`)
      this.singleBlog = response.data
    },
  },
})
