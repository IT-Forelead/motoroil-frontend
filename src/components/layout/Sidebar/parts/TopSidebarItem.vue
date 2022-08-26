<script setup>
import ListPlusIcon from '../../../../assets/icons/ListPlusIcon.vue';
import CaretRightIcon from '../../../../assets/icons/CaretRightIcon.vue';
import MinusIcon from '../../../../assets/icons/MinusIcon.vue';
import { useCategoryStore } from '../../../../stores/category.js'
import { onMounted, ref } from '@vue/runtime-core';
import $ from "jquery";

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useCategoryStore()

onMounted(() => {
  store.getAllCategories()
  store.getAllSubCategories()
  store.getAllMiniSubCategories()
})

function toggleCategory(id) {
  store.categories.map(c => {
    if (c?.id !== id) {
      $(`#${c?.id}`).slideUp()
    }
  })
  $(`#${id}`).slideDown(500, "linear")
}

function toggleSubCategory(id) {
  store.subCategories.map(sc => {
    if (sc?.id !== id) {
      $(`#${sc?.id}`).slideUp()
    }
  })
  $(`#${id}`).slideToggle(500, "linear")
}

</script>

<template>
  <div>
    <div class="p-3 font-medium text-white uppercase bg-red-500 rounded-t-lg">Categories</div>
    <div class="p-3 bg-white border border-t-0 border-gray-300 rounded-b-lg">
      <ul class="divide-y divide-gray-300">
        <li class="p-2" v-for="(category, idx) in store.categories" :key="idx" @click="toggleCategory(category?.id)">
          <div class="flex justify-between text-gray-700 cursor-pointer text-md hover:text-red-500">
            {{ category?.name }}
            <ListPlusIcon v-if="store.subCategories.filter(sc => sc?.categoryId === category?.id).length > 0" />
          </div>
          <ul class="hidden p-3 text-sm cursor-pointer"
            v-if="store.subCategories.filter(sc => sc?.categoryId === category?.id).length > 0" :id="category?.id">
            <li class="p-1"
              v-for="(subCategory, idx) in store.subCategories.filter(sc => sc?.categoryId === category?.id)" :key="idx"
              @click="toggleSubCategory(subCategory?.id)">
              <div class="flex items-center">
                <CaretRightIcon class="mr-1" />
                <div class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">
                  {{ subCategory?.name }}
                </div>
              </div>
              <ul class="hidden px-4"
                v-if="store.miniSubCategories.filter(msc => msc?.subCategoryId === subCategory?.id).length > 0"
                :id="subCategory?.id">
                <li class="p-1"
                  v-for="(miniSubCategory, idx) in store.miniSubCategories.filter(msc => msc?.subCategoryId === subCategory?.id)"
                  :key="idx">
                  <div class="flex items-center">
                    <MinusIcon class="mr-1" />
                    <div class="text-gray-500 transition-all duration-300 hover:text-red-500 text-md hover:ml-2">{{
                        miniSubCategory?.name
                    }}</div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
</style>