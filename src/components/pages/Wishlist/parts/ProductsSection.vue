<script setup>
import ProductCard from './ProductCard.vue';
import { useProductStore } from '../../../../stores/product.js'
import { computed, onMounted } from 'vue';
const store = useProductStore()
</script>
<template>
  <div v-if="store.products.length > 0" class="grid grid-cols-4 gap-7">
    <ProductCard v-for="(product, idx) in products" :key="idx" :product="product" />
  </div>
  <div v-else>
    <p>{{ $t('dbEmpty') }}</p>
  </div>
</template>

<style scoped>
</style>