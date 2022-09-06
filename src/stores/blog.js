import axios from 'axios'
import { defineStore } from 'pinia'
import authHeaderForMultipart from '../mixins/auth/auth-header-for-multipart-form.js'
import authHeader from '../mixins/auth/auth-header.js'
import { useModalStore } from './modal.js'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

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
    async createBlog(data) {
      await axios
        .put(`${API_URL}/admin/create-blog`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authHeaderForMultipart(),
          },
        })
        .then(() => {
          notify.success({
            message: 'Blog added!',
            position: 'bottomRight',
          })
          this.getAllBlogs()
          useModalStore().closeAddBlogModal()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While adding blog!',
            position: 'bottomRight',
          })
        })
    },
  },
})
