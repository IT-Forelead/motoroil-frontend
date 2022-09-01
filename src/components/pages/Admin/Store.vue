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

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useProductStore()
const modalStore = useModalStore()

onMounted(() => {
  store.getAllProducts()
})

const showProduct = (id) => {
  store.getSingleProduct(id)
  sessionStorage.removeItem('sp_id')
  sessionStorage.setItem('sp_id', id)
}

const isOpenSortDropDown = ref(false)
const sortDropDown = ref(null)
const toggleDropDown = () => {
  isOpenSortDropDown.value = !isOpenSortDropDown.value
}

onClickOutside(sortDropDown, () => isOpenSortDropDown.value = false)

onMounted(() => {
  store.getProductGroups()
  store.getAllSpecTypes()
})

const uploadedImageForView = ref([])

function getImage(e) {
  const filteredImages = Object.values(e?.target?.files).filter(i => i.type.includes('image'))
  uploadedImageForView.value = filteredImages.map(f => URL.createObjectURL(f))
  productData['product-image'] = filteredImages
}

const productData = reactive({
  "productGroupId": 'Product Group',
  "product-image": [],
  "specTypeId": 'Type',
  "capacity": 0,
  "price": 0,
  "quantity": 0
})

const addProduct = () => {
  console.log(productData);
}
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">Store</div>
        <div class="flex items-center">
          <div class="relative mr-3">
            <button @click="toggleDropDown"
              class="flex items-center justify-between w-full px-3 py-2 text-gray-700 border-0 hover:bg-transparent hover:text-red-500 md:w-auto">
              <FunnelIcon class="mr-2" /> Sort By
            </button>
            <div :class="{ 'hidden': !isOpenSortDropDown }" ref="sortDropDown"
              class="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded shadow top-10 w-44">
              <ul class="py-1 text-sm text-gray-700 dark:text-gray-400">
                <li
                  class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Name (A - Z)
                </li>
                <li
                  class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Name (Z - A)
                </li>
                <li
                  class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Price (Low > High)
                </li>
                <li
                  class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Price (High > Low)
                </li>
                <li
                  class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Rating (Highest)
                </li>
                <li
                  class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Rating (Lowest)
                </li>
              </ul>
            </div>
          </div>
          <button @click="modalStore.openAddProductModal()"
            class="flex items-center justify-center px-3 py-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
            Add product
          </button>
        </div>
      </div>
      <div class="space-y-5">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Product</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Price</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Discount time</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Quantity</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Deals</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Action</td>
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
                    <router-link to="/product" class="font-medium text-gray-700 text-md"
                      @click="showProduct(product?.product?.id)"
                      :title="product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name"
                      target="_self">
                      {{ product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name
                      }}
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
                  <div class="font-medium text-gray-700 text-md">{{ product?.discount?.startedAt }}</div>
                </div>
                <div class="flex items-center" v-if="product?.discount">
                  <div class="mr-1 text-sm text-gray-500">
                    <CalendarXIcon class="w-4 h-4 mr-1" />
                  </div>
                  <div class="font-medium text-gray-700 text-md">{{ product?.discount?.expiredAt }}</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Quantity:</div>
                  <div class="font-medium text-gray-700 text-md">{{ product?.product?.quantity }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Sold product:</div>
                  <div class="font-medium text-gray-700 text-md">{{ product?.product?.orders }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Viewed:</div>
                  <div class="font-medium text-gray-700 text-md">{{ product?.product?.views }}</div>
                </div>
              </td>
              <td class="p-3">
                <label for="holiday-toggle" class="relative inline-flex items-center mr-3 cursor-pointer"
                  v-if="product?.discount">
                  <input type="checkbox" id="holiday-toggle" class="sr-only peer" />
                  <div
                    class="h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700">
                  </div>
                </label>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
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
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
          <button type="button" @click="modalStore.closeAddProductModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="px-6 py-2">
          <form @submit.prevent="addProduct()" method="post" enctype="multipart/form-data" class="my-5">
            <div class="flex flex-col space-y-5">
              <label for="full-name">
                <p class="pb-2 font-medium text-slate-700">Select product group</p>
                <select v-model="productData.productGroupId"
                  class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                  <option v-for="(productGroup, idx) in store.productGroups" :key="idx"
                    :value="productGroup?.productGroup?.id">{{
                        productGroup?.productGroup?.name
                    }}</option>
                </select>
              </label>
              <label for="product-images">
                <p class="pb-2 font-medium text-slate-700">Select product image(s)</p>
                <p
                  class="flex items-center justify-center p-2 text-gray-600 border border-gray-600 rounded-md cursor-pointer hover:border-red-500 hover:text-red-500">
                  <ImageUploadIcon class="w-6 h-6 mr-3" /> Upload image
                </p>
                <input id="product-images" type="file" class="hidden" @change="getImage" multiple />
              </label>
              <div v-if="uploadedImageForView.length > 0" class="flex flex-wrap items-center justify-center space-x-2">
                <img v-for="(imageUrl, idx) in uploadedImageForView" :key="idx" :src="imageUrl" alt="Uploaded image"
                  class="h-20 border rounded opacity-75 hover:opacity-100">
              </div>
              <div class="grid grid-cols-2 mt-0 gap-x-2">
                <label for="spec-type">
                  <p class="pb-2 font-medium text-slate-700">Select type</p>
                  <select v-model="productData.specTypeId"
                    class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    <option v-for="(specType, idx) in store.specTypes" :key="idx" :value="specType?.id">{{
                        specType?.name
                    }}</option>
                  </select>
                </label>
                <label for="capacity">
                  <p class="pb-2 font-medium text-slate-700">Capacity</p>
                  <input type="number" id="capacity" min="0" v-model="productData.capacity"
                    class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
                </label>
              </div>
              <label for="price">
                <p class="pb-2 font-medium text-slate-700">Price</p>
                <input type="number" id="price" min="0" v-model="productData.price"
                  class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </label>
              <label for="quantity">
                <p class="pb-2 font-medium text-slate-700">Quantity</p>
                <input type="number" id="quantity" min="0" v-model="productData.quantity"
                  class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </label>
              <button
                class="inline-flex items-center justify-center w-full py-3 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                Add Product
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