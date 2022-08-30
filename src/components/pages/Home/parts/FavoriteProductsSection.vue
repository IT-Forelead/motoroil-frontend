<script setup>
import StarFillIcon from '../../../../assets/icons/StarFillIcon.vue';
import FavoriteProductItem from './FavoriteProducts/FavoriteProductItem.vue';
import { useProductStore } from '../../../../stores/product.js'
import { onMounted } from '@vue/runtime-core';

const store = useProductStore()

onMounted(() => {
  store.getProductsByLikes()
})
</script>

<template>
  <div class="w-full">
    <div class="flex justify-center p-5 bg-gray-100">
      <div class="container flex flex-col justify-center">
        <div class="py-5 text-center">
          <div class="space-x-2 text-red-500 uppercase text-md">Top favorite in the week</div>
          <div class="flex items-center justify-center">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
            <div class="mx-3 text-3xl font-bold uppercase">Favorite Products</div>
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-8">
          <FavoriteProductItem v-for="(product, idx) in store.productsByLikes" :key="idx" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>