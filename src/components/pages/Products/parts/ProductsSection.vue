<script setup>
import ProductCard from './ProductCard.vue';
import { useProductStore } from '../../../../stores/product.js'
import { computed, onMounted } from 'vue';
const store = useProductStore()

onMounted(() => {
  if (store.search) {
    store.getProductsSearchByName(store.search)
  } else {
    store.getAllProducts()
  }
})

const products = computed(() => {
  return store.products
})
</script>
<template>
  <div v-if="store.products.length > 0" class="grid grid-cols-4 gap-7">
    <ProductCard v-for="(product, idx) in products" :key="idx" :product="product" />
  </div>
  <div v-else class="text-center text-red-500">
    <p>No results!</p>
  </div>
</template>

<style scoped>
</style>