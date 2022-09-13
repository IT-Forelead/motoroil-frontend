import axios from 'axios'
import { defineStore } from 'pinia'
import authHeader from '../mixins/auth/auth-header.js'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useModalStore } from './modal.js'
import authHeaderForMultipart from '../mixins/auth/auth-header-for-multipart-form.js'

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
    specTypes: [],
    multiselectOEMids: [],
    multiselectSpecids: [],
    multiselectProductIds: [],
    selectedProductGroup: {}
  }),
  getters: {
    getSelectedProductGroupName() {
      return this.selectedProductGroup?.productGroup?.name
    },
    getSelectedProductGroupBrandId() {
      return this.selectedProductGroup?.productGroup?.brandId
    },
    getSelectedProductGroupDesc() {
      return this.selectedProductGroup?.productGroup?.description
    },
    getSelectedProductGroupCategoryId() {
      return this.selectedProductGroup?.category?.id
    },
    getSelectedProductGroupSubCategoryId() {
      return this.selectedProductGroup?.subCategory?.id
    },
    getSelectedProductGroupMiniSubCategoryId() {
      return this.selectedProductGroup?.miniSubCategory?.id
    },
    getSelectedProductGroupViscosityGradeId() {
      return this.selectedProductGroup?.viscosityGrade?.id
    },
    getSelectedProductGroupVideoUrl() {
      return this.selectedProductGroup?.productGroup?.videoUrl
    },
    getSelectedProductGroupSpecIds() {
      return this.selectedProductGroup?.specifications?.map(spec => spec?.id)
    },
    getSelectedProductGroupOEMIds() {
      return this.selectedProductGroup?.oems?.map(oem => oem?.id)
    }
  },
  actions: {
    setMultiselectOEMids(data) {
      this.multiselectOEMids = data
    },
    setMultiselectSpecids(data) {
      this.multiselectSpecids = data
    },
    async getAllProducts(sortBy) {
      const response = await axios.get(`${API_URL}/get-products/${sortBy}`)
      this.products = response.data
    },
    async getSelectedProductGroup(id) {
      this.selectedProductGroup = this.productGroups.filter((pg) => pg?.productGroup?.id === id)[0]
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
      const response = await axios.get(`${API_URL}/oems-and-specs-by-product-id/${productId}`)
      this.oemsAndSpecsByProductId = response.data
    },
    async changeSpecialOfferStatus(productId) {
      await axios
      .get(`${API_URL}/admin/update-special-offer/${productId}`, {headers: authHeader()})
      .then(() => {
        notify.success({
          message: 'Offer activeted!',
          position: 'bottomRight',
        })
        this.getTimerSpecialOffers()
      })
      .catch(() => {
        notify.error({
          title: 'Error',
          message: 'While Offer activeting!',
          position: 'bottomRight',
        })
      })
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
    async getProductsByCategoryFilter(data) {
      if (data.categoryId && data.subCategoryId && data.miniSubCategoryId) {
        await axios
          .get(
            `${API_URL}/products-by-name?cId=${data.categoryId}&scId=${data.subCategoryId}&mscId=${data.miniSubCategoryId}`
          )
          .then((response) => {
            this.products = response.data
          })
          .catch((err) => {
            notify.error({
              title: 'Error',
              message: 'Getting product by category!',
              position: 'bottomRight',
            })
          })
      } else if (data.categoryId && data.subCategoryId) {
        await axios
          .get(
            `${API_URL}/products-by-name?cId=${data.categoryId}&scId=${data.subCategoryId}`
          )
          .then((response) => {
            this.products = response.data
          })
          .catch((err) => {
            notify.error({
              title: 'Error',
              message: 'Getting product by category!',
              position: 'bottomRight',
            })
          })
      } else {
        await axios
          .get(`${API_URL}/products-by-name?cId=${data.categoryId}`)
          .then((response) => {
            this.products = response.data
          })
          .catch((err) => {
            notify.error({
              title: 'Error',
              message: 'Getting product by category!',
              position: 'bottomRight',
            })
          })
      }
    },
    async createSpecType(data) {
      await axios
        .post(`${API_URL}/admin/create-spec-type`, data, {
          headers: authHeader(),
        })
        .then(() => {
          notify.success({
            message: 'Spec type added!',
            position: 'bottomRight',
          })
          this.getAllSpecTypes()
        })
        .catch((err) => {
          notify.warning({
            message: 'Spec type not added!',
            position: 'bottomRight',
          })
        })
    },
    async createBrand(data) {
      await axios
        .post(`${API_URL}/admin/create-brand`, data, { headers: authHeader() })
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
        .post(`${API_URL}/admin/create-sae`, data, { headers: authHeader() })
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
    async getAllSpecTypes() {
      await axios
        .get(`${API_URL}/admin/spec-types`, { headers: authHeader() })
        .then((response) => {
          this.specTypes = response.data
        })
        .catch((err) => {
          notify.warning({
            title: 'Error',
            message: 'While getting spec types!',
            position: 'bottomRight',
          })
        })
    },
    async createProductOEM(data) {
      await axios
        .post(`${API_URL}/admin/create-product-oem`, data, {
          headers: authHeader(),
        })
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
        .post(`${API_URL}/admin/create-product-specification`, data, {
          headers: authHeader(),
        })
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
    async deleteBrand(id) {
      await axios
        .get(`${API_URL}/admin/delete-brand/${id}`, { headers: authHeader() })
        .then(() => {
          notify.success({
            message: 'Brand deleted!',
            position: 'bottomRight',
          })
          this.getBrands()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While brand deleting!',
            position: 'bottomRight',
          })
        })
    },
    async deleteSAEViscosityGrade(id) {
      await axios
        .get(`${API_URL}/admin/delete-sae/${id}`, { headers: authHeader() })
        .then(() => {
          notify.success({
            message: 'SAE Viscosity Grade deleted!',
            position: 'bottomRight',
          })
          this.getSAEViscosityGrades()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While SAE Viscosity Grade deleting!',
            position: 'bottomRight',
          })
        })
    },
    async deleteProductOEM(id) {
      await axios
        .get(`${API_URL}/admin/delete-product-oem/${id}`, {
          headers: authHeader(),
        })
        .then(() => {
          notify.success({
            message: 'Product OEM deleted!',
            position: 'bottomRight',
          })
          this.getProductOEMs()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While product OEM deleting!',
            position: 'bottomRight',
          })
        })
    },
    async deleteSpecification(id) {
      await axios
        .get(`${API_URL}/admin/delete-product-specification/${id}`, {
          headers: authHeader(),
        })
        .then(() => {
          notify.success({
            message: 'Specification deleted!',
            position: 'bottomRight',
          })
          this.getSpecifications()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While specification deleting!',
            position: 'bottomRight',
          })
        })
    },
    async createProduct(data) {
      await axios
        .put(`${API_URL}/admin/create-product`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authHeaderForMultipart(),
          },
        })
        .then(() => {
          notify.success({
            message: 'Product added!',
            position: 'bottomRight',
          })
          this.getAllProducts()
          useModalStore().closeAddProductModal()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While adding product!',
            position: 'bottomRight',
          })
        })
    },
    async createProductGroup(data) {
      await axios
        .put(`${API_URL}/admin/create-product-group`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authHeaderForMultipart(),
          },
        })
        .then(() => {
          notify.success({
            message: 'Product Group added!',
            position: 'bottomRight',
          })
          this.getProductGroups()
          this.multiselectOEMids = []
          this.multiselectSpecids = []
          useModalStore().closeProductGroupModal()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While adding product group!',
            position: 'bottomRight',
          })
        })
    },
    async editProductGroup(data) {
      await axios
        .put(`${API_URL}/admin/edit-product-group`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authHeaderForMultipart(),
          },
        })
        .then(() => {
          notify.success({
            message: 'Product Group edited!',
            position: 'bottomRight',
          })
          this.getProductGroups()
          this.multiselectOEMids = []
          this.multiselectSpecids = []
          useModalStore().closeEditProductGroupModal()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While editing product group!',
            position: 'bottomRight',
          })
        })
    },
    async deleteSpecType(id) {
      await axios
        .get(`${API_URL}/admin/delete-spec-type/${id}`, {
          headers: authHeader(),
        })
        .then(() => {
          notify.success({
            message: 'Spec type deleted!',
            position: 'bottomRight',
          })
          this.getAllSpecTypes()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While spec type deleting!',
            position: 'bottomRight',
          })
        })
    },
    async deleteProductGroup(id) {
      await axios
        .get(`${API_URL}/admin/delete-product-group/${id}`, {
          headers: authHeader(),
        })
        .then(() => {
          notify.success({
            message: 'Product group deleted!',
            position: 'bottomRight',
          })
          this.getProductGroups()
        })
        .catch(() => {
          notify.error({
            title: 'Error',
            message: 'While product group deleting!',
            position: 'bottomRight',
          })
        })
    },
    setSearchString(str) {
      this.search = str
    },
    setSelectedId(id) {
      if (this.multiselectOEMids.includes(id)) {
        this.multiselectOEMids = this.multiselectOEMids.filter((i) => i !== id)
      } else {
        this.multiselectOEMids.push(id)
      }
    },
    setSelectedSpecId(id) {
      if (this.multiselectSpecids.includes(id)) {
        this.multiselectSpecids = this.multiselectSpecids.filter(
          (i) => i !== id
        )
      } else {
        this.multiselectSpecids.push(id)
      }
    },
    setSelectedProductId(id) {
      if (this.multiselectProductIds.includes(id)) {
        this.multiselectProductIds = this.multiselectProductIds.filter(
          (i) => i !== id
        )
      } else {
        this.multiselectProductIds.push(id)
      }
    },
  },
})
