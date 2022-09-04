<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import { useMainSearchStore } from '../../../../stores/mainSearch.js'
import { onMounted, reactive } from "@vue/runtime-core";

const modules = [Autoplay, Navigation]

const mainSearchStore = useMainSearchStore()

onMounted(() => {
  mainSearchStore.getMainSearch()
})

const mainFilter = reactive({
  brand: '',
  sae: '',
  oem: '',
  spec: ''
})
</script>

<template>
  <div class="flex justify-center p-5 bg-white">
    <div class="container grid items-center grid-cols-4 gap-3">
      <div class="flex flex-col h-full space-y-20 bg-slate-200 bg-[url('/bg/bg-advanced.jpg')] bg-no-repeat bg-cover">
        <div class="p-5 text-2xl font-semibold text-white uppercase bg-gray-900/60">
          {{ $t('selectEngineOilRequirements') }}</div>
        <div class="px-5 space-y-3">
          <select v-model="mainFilter.brand"
            class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="" selected>Brand</option>
            <option v-for="(brand, idx) in mainSearchStore.mainSearch?.brands" :key="idx" :value="brand?.id">{{
                brand?.name
            }}</option>
          </select>
          <select v-model="mainFilter.sae"
            class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="" selected>SAE Viscosity Grades</option>
            <option v-for="(sae, idx) in mainSearchStore.mainSearch?.saes" :key="idx" :value="sae?.id">{{ sae?.name }}
            </option>
          </select>
          <select v-model="mainFilter.oem"
            class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="" selected>OEM-Freigabe</option>
            <option v-for="(oem, idx) in mainSearchStore.mainSearch?.oems" :key="idx" :value="oem?.id">{{ oem?.name }}
            </option>
          </select>
          <select v-model="mainFilter.specification"
            class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="" selected>Specifications</option>
            <option v-for="(specification, idx) in mainSearchStore.mainSearch?.specifications" :key="idx"
              :value="specification?.id">{{ specification?.name }}</option>
          </select>
          <a href="#main-search-result" @click="mainSearchStore.getProductsByMainSearch(mainFilter)"
            class="flex items-center justify-center w-full p-3 text-white uppercase bg-red-600 rounded hover:bg-red-700">Search</a>
        </div>
      </div>
      <div class="col-span-3 h-auto lg:h-[650px]">
        <swiper :spaceBetween="30" :centeredSlides="true" :navigation="true" :modules="modules"
          :autoplay="{ delay: 2500, disableOnInteraction: false }" class="mySwiper">
          <swiper-slide v-for="i in 5" :key="i">
            <img src="/bg/slider-1.jpg" class="w-full" alt="#">
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>