import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    search: '',
    products: [],
    productGroups: [],
    productsByGroupId: [],
    brands: [],
    saeViscosityGrades: [],
    productOEMs: [],
    productSpecifications: [],
    bestSellerProducts: [],
    timerSpecialOffers: [],
    productsByLikes: [],
    productsByViews: [],
    productsForSidebar: [],
    singleProduct: {},
    oemsAndSpecsByProductId: {},
    initialMainSearchProps: {},
    sidebarProducts: [],
    newArrivals: [],
    comments: [],
  }),
  getters: {},
  actions: {
    async getAllProducts() {
      const response = await axios.get(`${API_URL}/get-products/`)
      this.products = response.data
    },
    async getProductsByGroupId(productId) {
      const response = await axios.get(
        `${API_URL}/products-by-group-id/${productId}`
      )
      this.productsByGroupId = response.data
    },
    async getCommentsByProductId(productId) {
      const response = await axios.get(`${API_URL}/comments/${productId}`)
      this.comments = response.data
    },
    async createComment(data) {
      const response = await axios
        .post(`${API_URL}/user/comment`, data, { headers: authHeader() })
        .then(() => {
          notify.success({
            message: 'Comment added!',
            position: 'bottomRight',
          })
          this.getCommentsByProductId(sessionStorage.getItem('sp_id'))
        })
        .catch(() => {
          notify.error({
            message: 'Comment not add!',
            position: 'bottomRight',
          })
        })
    },
    async getProductGroups() {
      const response = await axios.get(`${API_URL}/get-product-groups`)
      this.productGroups = response.data
    },
    async getInitialMainSearchProps() {
      const response = await axios.get(`${API_URL}/main-search-default`)
      this.initialMainSearchProps = response.data
    },
    async getBrands() {
      const response = await axios.get(`${API_URL}/brands`)
      this.brands = response.data
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
      const response = await axios.get(`${API_URL}/search-by-name?name=${name}`)
      this.products = response.data
    },
    async getProductsForSidebar(limit) {
      const response = await axios.get(
        `${API_URL}/products-for-sidebar/${limit}`
      )
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
      this.saeViscosityGrades = response.data
    },
    async getOemsAndSpecsByProductId(productId) {
      const response = await axios.get(
        `${API_URL}/oems-and-specs-by-product-id/${productId}`
      )
      this.oemsAndSpecsByProductId = response.data
    },
    async getSingleProduct(id) {
      await axios.get(`${API_URL}/product-by-id/${id}`).then((response) => {
        this.singleProduct = response.data
        this.getProductsByGroupId(response.data?.product?.id)
      })
    },
    async getSidebarProducts(id) {
      const response = await axios.get(`${API_URL}/products-for-sidebar/4`)
      this.sidebarProducts = response.data
    },
    async getNewArrivals(id) {
      const response = await axios.get(`${API_URL}/products-for-sidebar/5`)
      this.newArrivals = response.data
    },
        async createBrand(data) {
          await axios
            .post(`${API_URL}/admin/create-brand`, data, {headers: authHeader()})
            .then(() => {
              notify.success({
                message: 'Brand added!',
                position: 'bottomRight',
              })
              this.getBrands()
            })
            .catch((err) => {
              notify.warning({
                message: 'Brand not added!',
                position: 'bottomRight',
              })
            })
        },
        async createSAEViscosityGrade(data) {
          await axios
            .post(`${API_URL}/admin/create-sae`, data, {headers: authHeader()})
            .then(() => {
              notify.success({
                message: 'SAE Viscosity Grade added!',
                position: 'bottomRight',
              })
              this.getSAEViscosityGrades()
            })
            .catch((err) => {
              notify.warning({
                message: 'SAE Viscosity Grade not added!',
                position: 'bottomRight',
              })
            })
        },
        async createProductOEM(data) {
          await axios
            .post(`${API_URL}/admin/create-product-oem`, data, {headers: authHeader()})
            .then(() => {
              notify.success({
                message: 'OEM added!',
                position: 'bottomRight',
              })
              this.getProductOEMs()
            })
            .catch((err) => {
              notify.warning({
                message: 'OEM not added!',
                position: 'bottomRight',
              })
            })
        },
        async createSpecification(data) {
          await axios
            .post(`${API_URL}/admin/create-product-specification`, data, {headers: authHeader()})
            .then(() => {
              notify.success({
                message: 'Specification added!',
                position: 'bottomRight',
              })
              this.getSpecifications()
            })
            .catch((err) => {
              notify.warning({
                message: 'Specification not added!',
                position: 'bottomRight',
              })
            })
        },
    async deleteProduct(id) {
      await axios
        .get(`${API_URL}/admin/delete-product/${id}`, { headers: authHeader() })
        .then(() => {
          notify.success({
            message: 'Product deleted!',
            position: 'bottomRight',
          })
          this.getAllProducts()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While product deleting!',
            position: 'bottomRight',
          })
        })
    },
    setSearchString(str) {
      this.search = str
    },
  },
})
