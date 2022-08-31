<script setup>
import { ref, toRefs } from 'vue'
import StarFillIcon from '../../../../../assets/icons/StarFillIcon.vue';
import Rating from '../../../../Rating.vue';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

const showProduct = (id) => {
  store.getSingleProduct(id)
  sessionStorage.removeItem('sp_id')
  sessionStorage.setItem('sp_id', id)
}

function newProductChecker(productCreatedAt) {
  let today = new Date()
  return new Date(today.setDate(today.getDate() - 3)) <= new Date(productCreatedAt)
}

const props = defineProps({
  product: Object
})
const { product } = toRefs(props)
</script>

<template>
  <div class="relative max-w-sm border border-gray-200">
    <div v-if="product?.discount" class="absolute font-normal text-center text-white top-4 sale">
      - {{ product?.discount?.discountPercent }} %
    </div>
    <div v-if="newProductChecker(product?.product?.createdAt)" class="absolute font-normal text-center text-white uppercase top-4 new">new</div>
    <div class="w-full h-[250px] relative overflow-hidden border-b">
      <router-link to="/product" @click="showProduct(product?.product?.id)"
      class="absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <img :src="API_URL + '/image/' + (product?.product?.imageUrl[0] ? product?.product?.imageUrl[0] : '')" alt="product image">
      </router-link>
    </div>
    <div class="p-5 py-3 text-center">
      <router-link to="/product" class="text-gray-900 text-md" @click="showProduct(product?.product?.id)"
        :title="product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name"
        target="_self">
        {{ product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name }}
      </router-link>
      <div class="flex items-center justify-center py-2">
        <Rating :rating="product?.product?.rating" />
      </div>
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
</template>

<style scoped>
</style>