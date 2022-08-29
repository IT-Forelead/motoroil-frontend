<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue'
import ProductCard from './parts/ProductCard.vue';
import ProductsSection from './parts/ProductsSection.vue';
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
          <li class="text-gray-700">Wishlist</li>
        </ul>
      </div>
      <div class="grid grid-cols-4 gap-10">
        <Sidebar />
        <div class="col-span-3">
          <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">My Wishlist</div>
          <ProductsSection />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>