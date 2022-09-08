import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useAboutUsStore = defineStore({
    id: 'aboutUs',
    state: () => ({
        aboutUsInfos: [],
        workers: [],
    }),
    getters: {},
    actions: {
        async getAllAboutUsInfos() {
            const response = await axios.get(`${API_URL}/get-about-us`)
            this.aboutUsInfos = response.data
        },
        async getAllWorkers() {
            const response = await axios.get(`${API_URL}/workers`)
            this.workers = response.data
        },
        async createInformation(data) {
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
        async deleteInformation(id) {
          await axios
            .get(`${API_URL}/admin/delete-blog/${id}`, { headers: authHeader() })
            .then(() => {
              notify.success({
                message: 'Blog deleted!',
                position: 'bottomRight',
              })
              this.getAllBlogs()
              useRouter().push('/blogs')
            })
            .catch(() => {
              notify.error({
                title: 'Error',
                message: 'While blog deleting!',
                position: 'bottomRight',
              })
            })
        },
    },
})
