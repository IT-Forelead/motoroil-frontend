<script setup>
import ListIcon from '../../../../assets/icons/ListIcon.vue';
import CaretRightIcon from '../../../../assets/icons/CaretRightIcon.vue';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'

const isOpenMainDropDown = ref(false)
const dropdown = ref(null)
const toggleDropDown = () => {
  isOpenMainDropDown.value = !isOpenMainDropDown.value
}

onClickOutside(dropdown, (event) => isOpenMainDropDown.value = false)

</script>

<template>
  <div class="flex justify-center px-5 pt-5 bg-white border-b-2 border-red-500">
    <div class="container grid items-center grid-cols-4 gap-x-3">
      <div class="relative">
        <button @click="toggleDropDown()"
          class="flex items-center justify-between w-full px-5 py-2 uppercase border-0 from-gray-50 via-gray-100 to-gray-300 bg-gradient-to-t rounded-t-md text-md hover:from-red-200 hover:via-red-400 hover:to-red-600">
          ALL CATEGORIES
          <ListIcon class="mr-1" />
        </button>
        <div :class="{ 'hidden': !isOpenMainDropDown }" ref="dropdown"
          class="absolute left-0 z-10 w-full px-4 py-2 bg-white border border-t-0 border-gray-100 rounded-b-lg shadow top-10">
          <ul class="divide-y divide-gray-300">
            <li class="flex justify-between p-2 text-gray-700 cursor-pointer text-md hover:text-red-500">
              <a href="#">Accessories</a>
              <CaretRightIcon />
            </li>
            <li class="flex justify-between p-2 text-gray-700 cursor-pointer text-md hover:text-red-500">
              <a href="#">Accessories</a>
              <CaretRightIcon />
            </li>
            <li class="flex justify-between p-2 text-gray-700 cursor-pointer text-md hover:text-red-500">
              <a href="#">Accessories</a>
            </li>
            <li class="flex justify-between p-2 text-gray-700 cursor-pointer text-md hover:text-red-500">
              <a href="#">Accessories</a>
            </li>
          </ul>
        </div>
      </div>
      <ul class="flex items-center col-span-3 space-x-1">
        <li
          class="px-4 py-2 m-0 font-medium uppercase text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/' }">
          <router-link to="/">
            Home</router-link>
        </li>
        <li class="px-4 py-2 font-medium uppercase text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/products' || $router.currentRoute.value.path === '/product' }">
          <router-link to="/products">
            Products</router-link>
        </li>
        <li class="px-4 py-2 font-medium uppercase text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/blogs' || $router.currentRoute.value.path === '/blog' }">
          <router-link to="/blogs">
            Blogs</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
</style>