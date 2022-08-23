import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    products: [],
    singleProduct: {},
  }),
  getters: {},
  actions: {
    // APIs
    async getAllProducts() {
      const response = await axios.get(`${API_URL}/get-products/`)
      this.products = response.data
    },
    async getSingleProduct(id) {
      const response = await axios.get(`${API_URL}/product-by-id/${id}`)
      this.singleProduct = response.data
    },
  },
})
