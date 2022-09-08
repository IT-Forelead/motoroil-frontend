<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import StarFillIcon from '../../../assets/icons/StarFillIcon.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue'
import { useUserStore } from '../../../stores/user.js';
import { useProductStore } from '../../../stores/product.js'
import { onMounted, ref } from 'vue';
import Rating from '../../Rating.vue';
import DotsThreeVerticalFillIcon from '../../../assets/icons/DotsThreeVerticalFillIcon.vue';
import { onClickOutside } from '@vueuse/core';
import DropDown from '../../DropDown.vue';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const userStore = useUserStore()
const productStore = useProductStore()

const isOpenWishlistActionDropDown = ref(false)
const dropdown = ref(null)

const toggleDropDown = () => {
  isOpenWishlistActionDropDown.value = !isOpenWishlistActionDropDown.value
}

onClickOutside(dropdown, () => isOpenWishlistActionDropDown.value = false)

onMounted(() => {
  userStore.getWishlist()
})

const showProduct = (id) => {
  productStore.getSingleProduct(id)
  sessionStorage.removeItem('sp_id')
  sessionStorage.setItem('sp_id', id)
}
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="p-2">
        <ul class="flex items-center">
          <li class="flex items-center">
            <a href="/" class="text-gray-700">
              <HouseIcon class="w-4 h-4" />
            </a>
            <CaretRightIcon class="mx-3 text-gray-500" />
          </li>
          <li class="text-gray-700">{{ $t('wishlist') }}</li>
        </ul>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Sidebar />
        <div class="col-span-3 ml-3">
          <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">{{ $t('myWishlist') }}</div>
          <div v-if="userStore.wishlist.length > 0" class="grid grid-cols-4 gap-7">
            <div v-for="(product, idx) in userStore.wishlist" :key="idx" class="relative max-w-sm border border-gray-200">
              <div v-if="product?.productDiscountId" class="absolute font-normal text-center text-white top-4 sale">
                - {{ product?.productDiscountPercent }} %
              </div>
              <DropDown :options="['delete']" :productId="product?.productId" :wishlistId="product?.id"/>
              <div class="relative h-[200px] border-b overflow-hidden">
                <router-link to="/product" @click="showProduct(product?.productId)" class="absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <img :src="API_URL + '/image/' + (product?.productImageUrl[0] ? product?.productImageUrl[0] : '')" alt="product image">
                </router-link>
              </div>
              <div class="p-5 py-3 text-center">
                <router-link to="/product" class="block h-12 overflow-hidden text-gray-900 text-md" @click="showProduct(product?.id)" :title="product?.productName" target="_self">
                  {{ product?.productName }}
                </router-link>
                <div class="flex items-center justify-center py-2">
                  <Rating :rating="product?.productRating" />
                </div>
                <div class="flex items-center justify-center">
                  <div v-if="!product?.productDiscountId" class="mb-2 mr-3 text-lg font-semibold text-red-500">
                    €{{ product?.productPrice }}
                  </div>
                  <div v-else class="flex items-center justify-center">
                    <div class="mb-2 mr-3 text-lg font-semibold text-red-500">
                      €{{ (product?.productPrice - product?.productPrice * (product?.productDiscountPercent / 100)) }}
                    </div>
                    <div class="mb-2 text-gray-500 line-through text-md">€{{ product?.productPrice }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>{{ $t('dbEmpty') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>