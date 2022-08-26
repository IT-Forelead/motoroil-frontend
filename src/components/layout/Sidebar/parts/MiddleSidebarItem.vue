<script setup>
import StarFillIcon from '../../../../assets/icons/StarFillIcon.vue';
import { useProductStore } from '../../../../stores/product.js'
import { onMounted, ref } from '@vue/runtime-core';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useProductStore()
const rating = ref(0)

const ratingCalc = (rate) => {
  rating.value = Number(rate)
}

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
    <div class="p-3 font-medium text-white uppercase bg-red-500 rounded-t-lg">Latest products</div>
    <div class="p-3 bg-white border border-t-0 border-gray-300 rounded-b-lg">
      <div class="flex items-center p-3" v-for="(product, idx) in store.sidebarProducts" :key="idx">
        <img class="w-20" :src="`${API_URL}/image/${product?.product?.imageUrl[0]}`" alt="Latest Product">
        <div class="ml-3">
          <router-link to="/product" @click="showProduct(product?.product?.id)">
            <div class="text-gray-900 text-md">
              {{ product?.productGroup?.productGroup?.name }} <br>
              {{ product?.productGroup?.viscosityGrade?.name }}
            </div>
          </router-link>
          <div>{{ ratingCalc(product?.product?.rating) }}</div>
          <ul class="flex items-center py-2">
            <li v-for="r1 in rating" :key="r1">
              <StarFillIcon class="text-yellow-300" />
            </li>
            <li v-for="r2 in (5 - rating)" :key="r2">
              <StarFillIcon class="text-gray-300" />
            </li>
          </ul>
          <div class="flex items-center">
            <div class="mb-2 mr-3 text-lg font-semibold text-red-500">€ {{
                product?.product?.price.toLocaleString('en-US') + '.00'
            }}</div>
            <!-- <div class="mb-2 text-gray-500 line-through text-md">$50.00</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>