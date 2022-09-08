<script setup>
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue';
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import StackIcon from '../../../assets/icons/StackIcon.vue';
import CalendarCheckIcon from '../../../assets/icons/CalendarCheckIcon.vue';
import CalendarXIcon from '../../../assets/icons/CalendarXIcon.vue';
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue';
import { useProductStore } from '../../../stores/product.js'
import { reactive, ref } from '@vue/reactivity';
import { onClickOutside } from '@vueuse/core'
import { onMounted } from '@vue/runtime-core';
import { useModalStore } from '../../../stores/modal';
import CloseIcon from '../../../assets/icons/CloseIcon.vue';
import ImageUploadIcon from '../../../assets/icons/ImageUploadIcon.vue';
import { formatDateTime } from '../../../mixins/utils';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useProductStore()
const modalStore = useModalStore()

const showProduct = (id) => {
  store.getSingleProduct(id)
  sessionStorage.removeItem('sp_id')
  sessionStorage.setItem('sp_id', id)
}

const capacity = ref(1)

const isOpenSortDropDown = ref(false)
const sortDropDown = ref(null)
const toggleDropDown = () => {
  isOpenSortDropDown.value = !isOpenSortDropDown.value
}

onClickOutside(sortDropDown, () => isOpenSortDropDown.value = false)

onMounted(() => {
  store.getProductGroups()
  store.getAllSpecTypes()
  store.getAllProducts('')
})

const uploadedImageForView = ref([])

function getImage(e) {
  const filteredImages = Object.values(e?.target?.files).filter(i => i.type.includes('image'))
  uploadedImageForView.value = filteredImages.map(f => URL.createObjectURL(f))
  productData['product-image'] = filteredImages
}

const productData = reactive({
  "productGroupId": '',
  "product-image": [],
  "specTypeId": '',
  "capacity": 0,
  "price": 0,
  "quantity": 0
})

const addProduct = () => {
  const formData = new FormData()
  formData.append('productGroupId', productData.productGroupId)
  productData['product-image'].map(f => {
    formData.append('product-image', f)
  })
  formData.append('specTypeId', productData.specTypeId)
  formData.append('capacity', productData.capacity)
  formData.append('price', productData.price)
  formData.append('quantity', productData.quantity)
  store.createProduct(formData)
}

const editProductData = reactive({
  "productGroupId": '',
  "product-image": [],
  "specTypeId": '',
  "capacity": 0,
  "price": 0,
  "quantity": 0
})

const editModal = (id) => {
  modalStore.openEditProductModal();
  store.getSingleProduct(id)
}
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">{{ $t('store') }}</div>
        <div class="flex items-center">
          <div class="relative mr-3">
            <button @click="toggleDropDown"
              class="flex items-center justify-between w-full px-3 py-2 text-gray-700 border-0 hover:bg-transparent hover:text-red-500 md:w-auto">
              <FunnelIcon class="mr-2" /> {{ $t('store') }}
            </button>
            <div :class="{ 'hidden': !isOpenSortDropDown }" ref="sortDropDown" class="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded shadow top-10 w-44">
              <ul class="py-1 text-sm text-gray-700">
                <li @click="store.getAllProducts('name-az')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100">
                  {{$t('nameUp')}}
                </li>
                <li @click="store.getAllProducts('name-za')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100">
                  {{$t('nameDown')}}
                </li>
                <li @click="store.getAllProducts('price-low')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100">
                  {{$t('priceUp')}}
                </li>
                <li @click="store.getAllProducts('price-high')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100">
                  {{$t('priceDown')}}
                </li>
                <li @click="store.getAllProducts('rating-high')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100">
                  {{$t('ratingUp')}}
                </li>
                <li @click="store.getAllProducts('rating-low')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100">
                  {{$t('ratingDown')}}
                </li>
              </ul>
            </div>
          </div>
          <button @click="modalStore.openAddProductModal()"
            class="flex items-center justify-center px-3 py-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
            {{ $t('addProduct') }}
          </button>
        </div>
      </div>
      <div class="space-y-5">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('product') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('price') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('discountTime') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('deals') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('soldProduct') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('viewed') }}</td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(product, idx) in store.products" :key="idx" class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-2">
                  <router-link to="/product" @click="showProduct(product?.product?.id)">
                    <img class="w-full h-16"
                      :src="API_URL + '/image/' + (product?.product?.imageUrl[0] ? product?.product?.imageUrl[0] : '')"
                      alt="product image">
                  </router-link>
                  <div>
                    <router-link to="/product" class="block h-12 overflow-hidden font-medium text-gray-700 text-md"
                      @click="showProduct(product?.product?.id)"
                      :title="product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name"
                      target="_self">
                      {{ product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name }}
                    </router-link>
                    <div class="flex items-center text-sm text-gray-500">
                      <StackIcon class="mr-1" />
                      {{ product?.productGroup?.category?.name }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="p-3 font-medium text-gray-700">€ {{ product?.product?.price }}</td>
              <td class="p-3">
                <div class="flex items-center" v-if="product?.discount">
                  <div class="mr-1 text-sm text-gray-500">
                    <CalendarCheckIcon class="w-4 h-4 mr-1" />
                  </div>
                  <div class="font-medium text-gray-700 text-md">{{ formatDateTime(product?.discount?.startedAt) }}</div>
                </div>
                <div class="flex items-center" v-if="product?.discount">
                  <div class="mr-1 text-sm text-gray-500">
                    <CalendarXIcon class="w-4 h-4 mr-1" />
                  </div>
                  <div class="font-medium text-gray-700 text-md">{{ formatDateTime(product?.discount?.expiredAt) }}</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{ $t('quantity') }}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ product?.product?.quantity }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{ $t('soldProduct') }}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ product?.product?.orders }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{ $t('viewed') }}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ product?.product?.views }}</div>
                </div>
              </td>
              <td class="p-3">
                <label for="holiday-toggle" class="relative inline-flex items-center mr-3 cursor-pointer"
                  v-if="product?.discount">
                  <input @click="store.changeSpecialOfferStatus(product?.product?.id)" type="checkbox" id="holiday-toggle" class="sr-only peer" :checked="product?.product?.specialOffer" />
                  <div class="h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700">
                  </div>
                </label>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
                  <button @click="editModal(product?.product?.id)"
                    class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PencilDuotoneIcon class="w-4 h-4" />
                  </button>
                  <button @click="store.deleteProduct(product?.product?.id)"
                    class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Add Product Modal -->
  <div :class="{ 'hidden': !modalStore.isOpenAddProductModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full h-full max-w-2xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('addProduct') }}</h3>
          <button type="button" @click="modalStore.closeAddProductModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-2">
          <form @submit.prevent="addProduct()" method="post" enctype="multipart/form-data" class="my-5">
            <div class="flex flex-col space-y-5">
              <label for="full-name">
                <p class="pb-2 font-medium text-slate-700">{{ $t('selectProductGroup') }}</p>
                <select v-model="productData.productGroupId"
                  class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                  <option v-for="(productGroup, idx) in store.productGroups" :key="idx"
                    :value="productGroup?.productGroup?.id">{{
                        productGroup?.productGroup?.name
                    }}</option>
                </select>
              </label>
              <label for="product-images">
                <p class="pb-2 font-medium text-slate-700">{{ $t('selectProductImage') }}</p>
                <p
                  class="flex items-center justify-center p-2 text-gray-600 border border-gray-600 rounded-md cursor-pointer hover:border-red-500 hover:text-red-500">
                  <ImageUploadIcon class="w-6 h-6 mr-3" /> {{ $t('uploadImage') }}
                </p>
                <input id="product-images" type="file" class="hidden" name="product-image" @change="getImage"
                  multiple />
              </label>
              <div v-if="uploadedImageForView.length > 0" class="flex flex-wrap items-center justify-center space-x-2">
                <img v-for="(imageUrl, idx) in uploadedImageForView" :key="idx" :src="imageUrl" alt="Uploaded image"
                  class="h-20 border rounded opacity-75 hover:opacity-100">
              </div>
              <div class="grid grid-cols-2 mt-0 gap-x-2">
                <label for="spec-type">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('selectType') }}</p>
                  <select v-model="productData.specTypeId"
                    class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    <option v-for="(specType, idx) in store.specTypes" :key="idx" :value="specType?.id">{{
                        specType?.name
                    }}</option>
                  </select>
                </label>
                <label for="capacity">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('capacity') }}</p>
                  <input type="number" id="capacity" min="0" v-model="productData.capacity"
                    class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                </label>
              </div>
              <label for="price">
                <p class="pb-2 font-medium text-slate-700">{{ $t('price') }}</p>
                <input type="number" id="price" min="0" v-model="productData.price"
                  class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </label>
              <label for="quantity">
                <p class="pb-2 font-medium text-slate-700">{{ $t('quantity') }}</p>
                <input type="number" id="quantity" min="0" v-model="productData.quantity"
                  class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </label>
              <button
                class="inline-flex items-center justify-center w-full py-3 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                {{ $t('addProduct') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit Product Modal -->
  <div :class="{ 'hidden': !modalStore.isOpenEditProductModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full h-full max-w-2xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('addProduct') }}</h3>
          <button type="button" @click="modalStore.closeEditProductModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-2">
          <form @submit.prevent="editProduct()" method="post" enctype="multipart/form-data" class="my-5">
            <div class="flex flex-col space-y-5">
              <label for="product-group">
                <p class="pb-2 font-medium text-slate-700">{{ $t('selectProductGroup') }}</p>
                <select v-model="editProductData.productGroupId"
                  class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                  <option v-for="(productGroup, idx) in store.productGroups" :key="idx"
                    :value="productGroup?.productGroup?.id">{{
                        productGroup?.productGroup?.name
                    }}</option>
                </select>
              </label>
              <label for="product-images1">
                <p class="pb-2 font-medium text-slate-700">{{ $t('selectProductImage') }}</p>
                <p
                  class="flex items-center justify-center p-2 text-gray-600 border border-gray-600 rounded-md cursor-pointer hover:border-red-500 hover:text-red-500">
                  <ImageUploadIcon class="w-6 h-6 mr-3" /> {{ $t('uploadImage') }}
                </p>
                <input id="product-images1" type="file" class="hidden" name="product-image" @change="getImage"
                  multiple />
              </label>
              <div v-if="uploadedImageForView.length > 0" class="flex flex-wrap items-center justify-center space-x-2">
                <img v-for="(imageUrl, idx) in uploadedImageForView" :key="idx" :src="imageUrl" alt="Uploaded image"
                  class="h-20 border rounded opacity-75 hover:opacity-100">
              </div>
              <div class="grid grid-cols-2 mt-0 gap-x-2">
                <label for="spec-type1">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('selectType') }}</p>
                  <select v-model="productData.specTypeId"
                    class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    <option v-for="(specType, idx) in store.specTypes" :key="idx" :value="specType?.id">{{
                        specType?.name
                    }}</option>
                  </select>
                </label>
                <label for="capacity1">
                  <p class="pb-2 font-medium text-slate-700">{{ $t('capacity') }}</p>
                  <input type="number" id="capacity1" min="0" v-model="capacity"
                    class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                </label>
              </div>
              <label for="price1">
                <p class="pb-2 font-medium text-slate-700">{{ $t('price') }}</p>
                <input type="number" id="price1" min="0" v-model="productData.price"
                  class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </label>
              <label for="quantity1">
                <p class="pb-2 font-medium text-slate-700">{{ $t('quantity') }}</p>
                <input type="number" id="quantity1" min="0" v-model="productData.quantity"
                  class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </label>
              <button
                class="inline-flex items-center justify-center w-full py-3 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                {{ $t('addProduct') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>