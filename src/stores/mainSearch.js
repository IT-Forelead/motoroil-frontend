import axios from 'axios'
import { defineStore } from 'pinia'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useMainSearchStore = defineStore({
  id: 'mainSearch',
  state: () => ({
    mainSearch: [],
    searchResults: [],
  }),
  actions: {
    async getMainSearch() {
      const response = await axios.get(`${API_URL}/main-search-default`)
      this.mainSearch = response.data
    },
    async getProductsByMainSearch(data) {
      await axios
        .get(`${API_URL}/products-by-class`, {
          params: {
            ...(data.brand ? { brand: data.brand } : {}),
            ...(data.sae ? { sae: data.sae } : {}),
            ...(data.oem ? { oem: data.oem } : {}),
            ...(data.spec ? { spec: data.spec } : {}),
          },
        })
        .then((response) => {
          this.searchResults = response.data
        })
        .catch((err) => {
          notify.error({
            title: 'Error',
            message: 'Getting product by category!',
            position: 'bottomRight',
          })
        })
    },
    clearMainSearchResults() {
      this.searchResults = []
    },
  },
})
