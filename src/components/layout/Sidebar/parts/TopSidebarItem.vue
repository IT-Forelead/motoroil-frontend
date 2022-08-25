<script setup>
import ListPlusIcon from '../../../../assets/icons/ListPlusIcon.vue';
import CaretRightIcon from '../../../../assets/icons/CaretRightIcon.vue';
import { useCategoryStore } from '../../../../stores/category.js'
import { onMounted } from '@vue/runtime-core';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useCategoryStore()

onMounted(() => {
  store.getAllCategories()
  store.getAllSubCategories()
  store.getAllMiniSubCategories()
})

</script>

<template>
  <div>
    <div class="p-3 font-medium text-white uppercase bg-red-500 rounded-t-lg">Categories</div>
    <div class="p-3 bg-white border border-t-0 border-gray-300 rounded-b-lg">
      <ul class="divide-y divide-gray-300">
        <li class="p-2">
          <div class="flex justify-between text-gray-700 cursor-pointer text-md hover:text-red-500">
            <a href="#">Accessories</a>
            <ListPlusIcon />
          </div>
          <ul class="p-3 text-sm">
            <li class="p-1">
              <div class="flex items-center">
                <CaretRightIcon class="mr-1" />
                <a href="#"
                  class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                  Service</a>
              </div>
              <ul class="p-10">
                <li>
                  <div class="flex items-center">
                    <CaretRightIcon class="mr-1" />
                    <a href="#"
                      class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                      Service</a>
                  </div>
                </li>
              </ul>
            </li>
            <li class="flex items-center p-1">
              <CaretRightIcon class="mr-1" />
              <a href="#"
                class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                Service</a>
            </li>
            <li class="flex items-center p-1">
              <CaretRightIcon class="mr-1" />
              <a href="#"
                class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                Service</a>
            </li>
            <li class="flex items-center p-1">
              <CaretRightIcon class="mr-1" />
              <a href="#"
                class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                Service</a>
            </li>
            <li class="flex items-center p-1">
              <CaretRightIcon class="mr-1" />
              <a href="#"
                class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                Service</a>
            </li>
          </ul>
        </li>
        <li class="p-2">
          <div class="flex justify-between text-gray-700 cursor-pointer text-md hover:text-red-500">
            <a href="#">Accessories</a>
            <ListPlusIcon />
          </div>
          <ul class="p-3 text-sm">
            <li class="flex items-center p-1">
              <CaretRightIcon class="mr-1" />
              <a href="#"
                class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                Service</a>
            </li>
            <li class="flex items-center p-1">
              <CaretRightIcon class="mr-1" />
              <a href="#"
                class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                Service</a>
            </li>
            <li class="flex items-center p-1">
              <CaretRightIcon class="mr-1" />
              <a href="#"
                class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                Service</a>
            </li>
            <li class="flex items-center p-1">
              <CaretRightIcon class="mr-1" />
              <a href="#"
                class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                Service</a>
            </li>
            <li class="flex items-center p-1">
              <CaretRightIcon class="mr-1" />
              <a href="#"
                class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">Customer
                Service</a>
            </li>
          </ul>
        </li>
        <li class="block p-2 text-gray-700 cursor-pointer text-md hover:text-red-500">
          <a href="#">Accessories</a>
        </li>
        <li class="block p-2 text-gray-700 cursor-pointer text-md hover:text-red-500">
          <a href="#">Accessories</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
</style>