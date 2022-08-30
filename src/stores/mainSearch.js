import axios from 'axios'
import {defineStore} from 'pinia'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useMainSearchStore = defineStore({
    id: 'mainSearch',
    state: () => ({
        brands: [],
        saeViscosityGrades: [],
        oems: [],
        specifications: [],
    }),
    actions: {
        async getAllBrands() {
            const response = await axios.get(`${API_URL}/brands`)
            this.brands = response.data
        },
        async getAllSAEViscosityGrades() {
            const response = await axios.get(`${API_URL}/sae-viscosity-grades`)
            this.saeViscosityGrades = response.data
        },
        async getAllProductOEMs() {
            const response = await axios.get(`${API_URL}/product-oems`)
            this.oems = response.data
        },
        async getAllSpecifications() {
            const response = await axios.get(`${API_URL}/product-specifications`)
            this.specifications = response.data
        },
    },
})
