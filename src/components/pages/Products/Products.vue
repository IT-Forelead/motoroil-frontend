<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue'
import ProductCard from './parts/ProductCard.vue';
import ProductsSection from './parts/ProductsSection.vue';
import { ref } from '@vue/reactivity';
import { onClickOutside } from '@vueuse/core'
import { useProductStore } from '../../../stores/product.js';

const store = useProductStore()
const isOpenSortDropDown = ref(false)
const sortDropDown = ref(null)
const toggleDropDown = () => {
  isOpenSortDropDown.value = !isOpenSortDropDown.value
}

onClickOutside(sortDropDown, () => isOpenSortDropDown.value = false)
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="p-2">
        <ul class="flex items-center">
          <li class="flex items-center">
            <a href="/" class="text-gray-700">
              <HouseIcon class="w-4 h-4" />
            </a>
            <CaretRightIcon class="mx-3 text-gray-500" />
          </li>
          <li class="flex items-center">
            <a href="/products" class="text-red-600">{{$t('products')}}</a>
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-4 gap-3">
        <Sidebar />
        <div class="col-span-3 ml-3">
          <div class="flex items-center justify-between mb-2">
            <div class="p-3 text-2xl font-semibold text-gray-700">{{ store.search ? 'Search result' : 'Products' }}</div>
            <div class="relative">
              <button @click="toggleDropDown()" v-if="!store.search"
                class="flex items-center justify-between w-full px-3 py-2 text-gray-700 border-0 hover:bg-transparent hover:text-red-500 md:w-auto">
                <FunnelIcon class="mr-2" /> {{$t('sortBy')}}
              </button>
              <div :class="{ 'hidden': !isOpenSortDropDown }" ref="sortDropDown"
                class="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded shadow top-10 w-44">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-400">
                  <li @click="store.getAllProducts('name-az')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {{$t('nameUp')}}
                  </li>
                  <li @click="store.getAllProducts('name-za')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {{$t('nameDown')}}
                  </li>
                  <li @click="store.getAllProducts('price-low')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {{$t('priceUp')}}
                  </li>
                  <li @click="store.getAllProducts('price-high')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {{$t('priceDown')}}
                  </li>
                  <li @click="store.getAllProducts('rating-high')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {{$t('ratingUp')}}
                  </li>
                  <li @click="store.getAllProducts('rating-low')" class="block px-4 py-2 capitalize cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {{$t('ratingDown')}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ProductsSection />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>