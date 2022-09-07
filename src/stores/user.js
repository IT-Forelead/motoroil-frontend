import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useAuthStore } from './auth.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    users: [],
    notifications: [],
    cart: [],
    wishlist: [],
    coupons: [],
    addresses: [],
    countries: [],
    regions: [],
    cities: [],
    cartSum: 0
  }),
  actions: {
    async getNotifications() {
      if (useAuthStore().user?.role === 'user'){
        const response = await axios.get(`${API_URL}/user/notifications`, {headers: authHeader()})
        this.notifications = response.data
      }
    },
    async getUsers() {
      const response = await axios.get(`${API_URL}/user/users`, {headers: authHeader()})
      this.users = response.data
    },
    async getCart() {
        const response = await axios.get(`${API_URL}/user/cart`, {headers: authHeader()})
        this.cart = response.data
        this.cartSum = this.cart.map((p) => p?.quantity * p?.productPrice).reduce((q, a) => q + a, 0)
    },
    async getWishlist() {
        const response = await axios.get(`${API_URL}/user/wishlist`, {headers: authHeader()})
        this.wishlist = response.data
    },
    async getCoupons() {
        const response = await axios.get(`${API_URL}/user/coupons`, {headers: authHeader()})
        this.coupons = response.data
    },
    async getUserAddresses() {
        const response = await axios.get(`${API_URL}/user/user-addresses`, {headers: authHeader()})
        this.addresses = response.data
    },
    async getCountries() {
        const response = await axios.get(`${API_URL}/user/countries`, {headers: authHeader()})
        this.countries = response.data
    },
    async getRegions(countryId) {
        const response = await axios.post(`${API_URL}/user/regions`, `"${countryId}"`, {headers: authHeader()})
        this.regions = response.data
    },
    async getCities(regionId) {
        const response = await axios.post(`${API_URL}/user/cities`, `"${regionId}"`, {headers: authHeader()})
        this.cities = response.data
    },
    async changeCartItemsQuantityPlus(data) {
        await axios
        .get(`${API_URL}/user/change-cart-items-quantity-plus/${data}`, {headers: authHeader()})
        .then(() => {
          this.getCart()
        })
        .catch((err) => {
          notify.warning({
            message: 'Not increased!',
            position: 'bottomRight',
          })
        })
    },
    async changeCartItemsQuantityMinus(data) {
        await axios
        .get(`${API_URL}/user/change-cart-items-quantity-minus/${data}`, {headers: authHeader()})
        .then(() => {
          this.getCart()
        })
        .catch((err) => {
          notify.warning({
            message: 'Not reduced!',
            position: 'bottomRight',
          })
        })
    },
    async deleteCartItem(id) {
      await axios
        .get(`${API_URL}/user/delete-cart/${id}`, { headers: authHeader() })
        .then(() => {
          notify.success({
            message: 'Cart item deleted!',
            position: 'bottomRight',
          })
          this.getCart()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While cart item deleting!',
            position: 'bottomRight',
          })
        })
    },
    async deleteWishlist(data) {
      await axios
        .post(`${API_URL}/user/delete-wishlist`, data, { headers: authHeader() })
        .then(() => {
          notify.success({
            message: 'Wishlist deleted!',
            position: 'bottomRight',
          })
          this.getWishlist()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While wishlist deleting!',
            position: 'bottomRight',
          })
        })
    },
    async addWishlist(data) {
      await axios
        .post(`${API_URL}/user/add-wishlist`, data, {headers: authHeader()})
        .then(() => {
          notify.success({
            message: 'Liked!',
            position: 'bottomRight',
          })
        })
        .catch((err) => {
          notify.warning({
            message: 'Not liked!',
            position: 'bottomRight',
          })
        })
    },
    async addCart(data) {
      await axios
        .post(`${API_URL}/user/add-cart`, data, {headers: authHeader()})
        .then(() => {
          notify.success({
            message: 'Product added to cart!',
            position: 'bottomRight',
          })
          this.getCart()
        })
        .catch((err) => {
          notify.warning({
            message: 'Not added!',
            position: 'bottomRight',
          })
        })
    },
    async addCoupon(data) {
      await axios
        .post(`${API_URL}/admin/coupon`, data, {headers: authHeader()})
        .then(() => {
          notify.success({
            message: 'Coupon added!',
            position: 'bottomRight',
          })
          this.getCoupons()
        })
        .catch((err) => {
          notify.warning({
            message: 'Whikle coupon adding!',
            position: 'bottomRight',
          })
        })
    },
    async viewNotification(id) {
        await axios
        .get(`${API_URL}/user/view-notification/${id}`, {headers: authHeader()})
        .then(() => {
          this.getNotifications()
        })
        .catch((err) => {
          notify.warning({
            message: 'Not marked as read!',
            position: 'bottomRight',
          })
        })
    },
  },
})
