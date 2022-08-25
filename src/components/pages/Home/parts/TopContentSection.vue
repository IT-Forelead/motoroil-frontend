<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";

const modules = [Autoplay, Navigation]
</script>

<template>
  <div class="flex justify-center p-5 bg-white">
    <div class="container grid items-center grid-cols-4 gap-3">
      <div class="flex flex-col h-full space-y-20 bg-slate-200 bg-[url('/bg/bg-advanced.jpg')] bg-no-repeat bg-cover">
        <div class="p-5 text-2xl font-semibold text-white uppercase bg-gray-900/60">Lorem ipsum dolor  orem ipsum dolor  ipsum dolor sit amet.</div>
        <div class="px-5 space-y-3">
          <select id="country" name="country" autocomplete="country-name" class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
          <select id="country" name="country" autocomplete="country-name" class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
          <select id="country" name="country" autocomplete="country-name" class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
          <select id="country" name="country" autocomplete="country-name" class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
          <button class="flex items-center justify-center w-full p-3 text-white uppercase bg-red-600 rounded hover:bg-red-700">Search</button>
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