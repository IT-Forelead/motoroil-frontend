import axios from 'axios'
import {defineStore} from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useProductStore = defineStore({
    id: 'product',
    state: () => ({
        products: [],
        productGroups: [],
        productsByGroupId: [],
        productOEMs: [],
        productSpecifications: [],
        bestSellerProducts: [],
        SAEViscosityGrades: [],
        timerSpecialOffers: [],
        productsByLikes: [],
        productsByViews: [],
        productsForSidebar: [],
        searchByName: [],
        singleProduct: {},
        oemsAndSpecsByProductId: {},
        initialMainSearchProps: {},
        sidebarProducts: [],
        newArrivals: []
    }),
    getters: {},
    actions: {
        // APIs
        async getAllProducts() {
            const response = await axios.get(`${API_URL}/get-products/`)
            this.products = response.data
        },
        async getProductsByGroupId(productId) {
            const response = await axios.get(`${API_URL}/products-by-group-id/${productId}`)
            this.productsByGroupId = response.data
        },
        async getProductGroups() {
            const response = await axios.get(`${API_URL}/get-product-groups`)
            this.productGroups = response.data
        },
        async getInitialMainSearchProps() {
            const response = await axios.get(`${API_URL}/main-search-default`)
            this.initialMainSearchProps = response.data
        },
        async getProductOEMs() {
            const response = await axios.get(`${API_URL}/product-oems`)
            this.productOEMs = response.data
        },
        async getSpecifications() {
            const response = await axios.get(`${API_URL}/product-specifications`)
            this.productSpecifications = response.data
        },
        async getProductsSearchByName(name) {
            const response = await axios.get(`${API_URL}/search-by-name?=${name}`)
            this.searchByName = response.data
        },
        async getProductsForSidebar(limit) {
            const response = await axios.get(`${API_URL}/products-for-sidebar/${limit}`)
            this.productsForSidebar = response.data
        },
        async getBestSellerProducts() {
            const response = await axios.get(`${API_URL}/best-seller`)
            this.bestSellerProducts = response.data
        },
        async getProductsByLikes() {
            const response = await axios.get(`${API_URL}/products-by-likes`)
            this.productsByLikes = response.data
        },
        async getProductsByViews() {
            const response = await axios.get(`${API_URL}/products-by-views`)
            this.productsByViews = response.data
        },
        async getTimerSpecialOffers() {
            const response = await axios.get(`${API_URL}/timer-special-offer`)
            this.timerSpecialOffers = response.data
        },
        async getSAEViscosityGrades() {
            const response = await axios.get(`${API_URL}/sae-viscosity-grades`)
            this.SAEViscosityGrades = response.data
        },
        async getOemsAndSpecsByProductId(productId) {
            const response = await axios.get(`${API_URL}/oems-and-specs-by-product-id/${productId}`)
            this.oemsAndSpecsByProductId = response.data
        },
        async getSingleProduct(id) {
            const response = await axios.get(`${API_URL}/product-by-id/${id}`)
            this.singleProduct = response.data
        },
        async getSidebarProducts(id) {
            const response = await axios.get(`${API_URL}/products-for-sidebar/4`)
            this.sidebarProducts = response.data
        },
        async getNewArrivals(id) {
            const response = await axios.get(`${API_URL}/products-for-sidebar/5`)
            this.newArrivals = response.data
        },
    },
})
