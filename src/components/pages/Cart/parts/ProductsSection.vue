<script setup>
import ProductCard from './ProductCard.vue';
import { useProductStore } from '../../../../stores/product.js'
import { onMounted } from 'vue';
const store = useProductStore()

onMounted(() => {
  store.getAllProducts()
})
</script>
<template>
  <div class="grid grid-cols-4 gap-7">
    <ProductCard v-for="(product, idx) in store.products" :key="idx" :product="product" />
  </div>
</template>

<style scoped>
</style>