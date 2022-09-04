import axios from 'axios'
import { defineStore } from 'pinia'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import authHeaderForMultipart from '../mixins/auth/auth-header-for-multipart-form.js'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useSlideStore = defineStore({
  id: 'slide',
  state: () => ({
    slides: [],
  }),
  actions: {
    async getAllSlides() {
      const response = await axios.get(`${API_URL}/get-slides`)
      this.slides = response.data
    },
    async getAllActiveSlides() {
      const response = await axios.get(`${API_URL}/get-slides`)
      this.slides = response.data.filter((s) => s.active)
    },
    async changeSlideStatus(id) {
      await axios
        .get(`${API_URL}/admin/update-slide-status/${id}`, {headers: authHeader()})
        .then(() => {
          notify.success({
            message: 'Slide activated!',
            position: 'bottomRight',
          })
          this.getAllSlides()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While activating slide!',
            position: 'bottomRight',
          })
        })
    },
    async deleteSlide(id) {
      await axios
        .get(`${API_URL}/admin/delete-slide/${id}`, {headers: authHeader()})
        .then(() => {
          notify.success({
            message: 'Slide deleted!',
            position: 'bottomRight',
          })
          this.getAllSlides()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While deleting slide!',
            position: 'bottomRight',
          })
        })
    },
    async createSlide(data) {
      await axios
        .put(`${API_URL}/admin/create-slide`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authHeaderForMultipart(),
          },
        })
        .then(() => {
          notify.success({
            message: 'Slide added!',
            position: 'bottomRight',
          })
          this.getAllSlides()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While adding slide!',
            position: 'bottomRight',
          })
        })
    },
  },
})
