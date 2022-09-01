<script setup>
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue';
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import StackIcon from '../../../assets/icons/StackIcon.vue';
import CalendarCheckIcon from '../../../assets/icons/CalendarCheckIcon.vue';
import CalendarXIcon from '../../../assets/icons/CalendarXIcon.vue';
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue';
import { useProductStore } from '../../../stores/product.js'
import { ref } from '@vue/reactivity';
import { onClickOutside } from '@vueuse/core'
import { onMounted } from '@vue/runtime-core';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useProductStore()

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
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">Store</div>
        <div class="flex items-center">
            <div class="relative mr-3">
              <button @click="toggleDropDown" class="flex items-center justify-between w-full px-3 py-2 text-gray-700 border-0 hover:bg-transparent hover:text-red-500 md:w-auto">
                <FunnelIcon class="mr-2" /> Sort By
              </button>
              <div :class="{ 'hidden': !isOpenSortDropDown }" ref="sortDropDown"
                class="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded shadow top-10 w-44">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-400">
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Name (A - Z)
                  </li>
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Name (Z - A)
                  </li>
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Price (Low > High)
                  </li>
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Price (High > Low)
                  </li>
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Rating (Highest)
                  </li>
                  <li class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Rating (Lowest)
                  </li>
                </ul>
              </div>
            </div>
            <button class="flex items-center justify-center px-3 py-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
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
                    <img class="w-full h-16" :src="API_URL + '/image/' + (product?.product?.imageUrl[0] ? product?.product?.imageUrl[0] : '')" alt="product image">
                  </router-link>
                  <div>
                    <router-link to="/product" class="font-medium text-gray-700 text-md" @click="showProduct(product?.product?.id)"
                      :title="product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name"
                      target="_self">
                      {{ product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name }}
                    </router-link>
                    <div class="flex items-center text-sm text-gray-500">
                      <StackIcon class="mr-1"/>
                      {{ product?.productGroup?.category?.name }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="p-3 font-medium text-gray-700">€ {{ product?.product?.price }}</td>
              <td class="p-3">
                <div class="flex items-center" v-if="product?.discount">
                  <div class="mr-1 text-sm text-gray-500"><CalendarCheckIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">{{ product?.discount?.startedAt }}</div>
                </div>
                <div class="flex items-center" v-if="product?.discount">
                  <div class="mr-1 text-sm text-gray-500"><CalendarXIcon class="w-4 h-4 mr-1"/></div>
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
                <label for="holiday-toggle" class="relative inline-flex items-center mr-3 cursor-pointer" v-if="product?.discount">
                  <input type="checkbox" id="holiday-toggle" class="sr-only peer" />
                  <div class="h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
                </label>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
                  <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PencilDuotoneIcon class="w-4 h-4" />
                  </button>
                  <button @click="store.deleteProduct(product?.product?.id)" class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
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
</template>

<style scoped>
</style>