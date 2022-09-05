<script setup>
import StarFillIcon from '../../../../assets/icons/StarFillIcon.vue';
import { useProductStore } from '../../../../stores/product.js'
import { useMainSearchStore } from '../../../../stores/mainSearch.js';
import { onMounted } from 'vue';
import BestSellerItem from './BestSeller/BestSellerItem.vue';
const store = useProductStore()
const mainSearchStore = useMainSearchStore()
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

function newProductChecker(productCreatedAt) {
  let today = new Date()
  return new Date(today.setDate(today.getDate() - 3)) <= new Date(productCreatedAt)
}

onMounted(() => {
  store.getBestSellerProducts()
})

</script>

<template>
  <div class="w-full" id="main-search-result">
    <div class="flex justify-center p-5 bg-white">
      <div class="container flex flex-col justify-center">
        <div class="py-5 text-center">
          <div v-if="mainSearchStore.searchResults.length > 0" class="space-x-2 text-red-500 uppercase text-md">{{$t('searchResultsOnTheMainSearch')}}</div>
          <div v-else class="space-x-2 text-red-500 uppercase text-md">{{ $t('topSaleInTheWeek') }}</div>
          <div class="flex items-center justify-center">
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
            <div v-if="mainSearchStore.searchResults.length > 0" class="mx-3 text-3xl font-bold uppercase">{{$t('mainSearchResult')}}</div>
            <div v-else class="mx-3 text-3xl font-bold uppercase">{{ $t('bestSeller') }}</div>
            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <div class="grid grid-cols-5 gap-8">
          <BestSellerItem
            v-for="(product, idx) in mainSearchStore.searchResults.length > 0 ? mainSearchStore.searchResults : store.bestSellerProducts"
            :key="idx" :product="product" class="relative max-w-sm"></BestSellerItem>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.sale {
  background-color: #ff2d37;
  font-size: 12px;
  min-width: 60px;
  height: 30px;
  line-height: 30px;
  left: -11px;
  z-index: 2;
}

.sale:before {
  content: "";
  position: absolute;
  top: auto;
  bottom: -7px;
  left: 0;
  right: auto;
  border-bottom: 7px solid transparent;
  border-top: 0 solid transparent;
  border-right: 11px solid #c60009;
}

.new {
  background-color: #3599ff;
  font-size: 12px;
  min-width: 60px;
  height: 30px;
  line-height: 30px;
  right: -11px;
  z-index: 2;
}

.new:before {
  content: "";
  position: absolute;
  top: auto;
  bottom: -7px;
  right: 0;
  left: auto;
  border-bottom: 7px solid transparent;
  border-top: 0 solid transparent;
  border-left: 11px solid #0055ac;
}
</style>