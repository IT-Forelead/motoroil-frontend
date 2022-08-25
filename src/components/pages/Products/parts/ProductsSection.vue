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
  <div id="content">
    <div class="products-category">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 products-list">
        <ProductCard v-for="(product, idx) in store.products" :key="idx" :product="product" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>