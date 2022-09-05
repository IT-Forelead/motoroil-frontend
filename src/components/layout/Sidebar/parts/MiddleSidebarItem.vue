<script setup>
import StarFillIcon from '../../../../assets/icons/StarFillIcon.vue';
import { useProductStore } from '../../../../stores/product.js'
import { onMounted } from '@vue/runtime-core';
import Rating from '../../../Rating.vue';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useProductStore()

const showProduct = (id) => {
  store.getSingleProduct(id)
  sessionStorage.removeItem('sp_id')
  sessionStorage.setItem('sp_id', id)
}

onMounted(() => {
  store.getSidebarProducts()
})
</script>
<template>
  <div class="my-3">
    <div class="p-3 font-medium text-white uppercase bg-red-500 rounded-t-lg">{{ $t('latestProducts') }}</div>
    <div class="p-3 bg-white border border-t-0 border-gray-300 rounded-b-lg">
      <div class="flex items-center p-3" v-for="(product, idx) in store.sidebarProducts" :key="idx">
        <img class="w-20" :src="`${API_URL}/image/${product?.product?.imageUrl[0]}`" alt="Latest Product">
        <div class="ml-3">
          <router-link to="/product" @click="showProduct(product?.product?.id)">
            <div class="block h-12 overflow-hidden text-gray-900 text-md">
              {{ product?.productGroup?.productGroup?.name }} <br>
              {{ product?.productGroup?.viscosityGrade?.name }}
            </div>
          </router-link>
          <Rating :rating="product?.product?.rating" />
          <div class="flex items-center justify-center">
            <div v-if="!product?.discount" class="mb-2 mr-3 text-lg font-semibold text-red-500">€
              {{ product?.product?.price }}</div>
            <div v-else class="flex items-center justify-center">
              <div class="mb-2 mr-3 text-lg font-semibold text-red-500">€ {{ (product?.product?.price -
                  product?.product?.price * (product?.discount?.discountPercent / 100))
              }}</div>
              <div class="mb-2 text-gray-500 line-through text-md">€ {{ product?.product?.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>