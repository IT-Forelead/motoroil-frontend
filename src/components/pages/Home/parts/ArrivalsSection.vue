<script setup>
import StarFillIcon from '../../../../assets/icons/StarFillIcon.vue';
import ArrivalItem from './Arrivals/ArrivalItem.vue';
import { useProductStore } from '../../../../stores/product.js'
import { onMounted } from '@vue/runtime-core';

const store = useProductStore()

onMounted(() => {
  store.getNewArrivals()
})
</script>

<template>
  <div class="w-full">
    <div class="flex justify-center p-5 bg-white">
      <div class="container flex flex-col justify-center">
        <div class="py-5 text-center">
          <div class="space-x-2 text-red-500 uppercase text-md">{{$t('topSaleInTheWeek')}}</div>
          <div class="flex items-center justify-center">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
            <div class="mx-3 text-3xl font-bold uppercase">{{$t('newArrivals')}}</div>
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <ArrivalItem v-for="(product, idx) in store.newArrivals" :key="idx" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>