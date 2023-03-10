<script setup>
import FavoriteProductItem from './FavoriteProducts/FavoriteProductItem.vue';
import { useProductStore } from '../../../../stores/product.js'
import { onMounted } from '@vue/runtime-core';
import {computed} from "vue";

const store = useProductStore()
const productsByLikes = computed(() => {
  return store.productsByLikes.length ? store.productsByLikes : store.products.slice(-5)
})

onMounted(() => {
  store.getProductsByLikes()
  store.getAllProducts()
})
</script>

<template>
  <div class="w-full">
    <div class="flex justify-center p-5 bg-gray-100">
      <div class="container flex flex-col justify-center">
        <div class="py-5 text-center">
          <div class="space-x-2 text-red-500 uppercase text-md">{{$t('topFavoriteInTheWeek')}}</div>
          <div class="flex items-center justify-center">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
            <div class="mx-3 text-3xl font-bold uppercase">{{$t('favoriteProducts')}}</div>
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <FavoriteProductItem v-for="(product, idx) in productsByLikes" :key="idx" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>