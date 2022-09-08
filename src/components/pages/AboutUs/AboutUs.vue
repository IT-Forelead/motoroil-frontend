<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue';
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import FacebookFIcon from '../../../assets/icons/FacebookFIcon.vue';
import TwitterIcon from '../../../assets/icons/TwitterIcon.vue';
import SkyprIcon from '../../../assets/icons/SkyprIcon.vue';
import AtBoldIcon from '../../../assets/icons/AtBoldIcon.vue';
import DotsThreeVerticalFillIcon from '../../../assets/icons/DotsThreeVerticalFillIcon.vue';
import { useAuthStore } from '../../../stores/auth.js';
import { useAboutUsStore } from '../../../stores/aboutUs.js';
import { onMounted } from '@vue/runtime-core';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const authStore = useAuthStore()
const aboutUsStore = useAboutUsStore()

onMounted(() => {
	aboutUsStore.getAllAboutUsInfos()
	aboutUsStore.getAllWorkers()
})
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
          <a href="/about-us" class="text-red-600">{{ $t('aboutUs') }}</a>
        </li>
      </ul>
    </div>
    <div class="grid grid-cols-4 gap-3">
      <Sidebar />
      <div class="col-span-3 ml-3">
        <div v-if="authStore.user?.role === 'admin'" class="flex justify-end">
          <button class="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
            Add information
          </button>
        </div>
        <div v-for="(information, idx) in aboutUsStore.aboutUsInfos" :key="idx">
          <div class="flex items-center justify-between">
            <div class="p-3 text-2xl font-semibold text-gray-700">{{ information?.title }}</div>
            <div v-if="authStore.user?.role === 'admin'">
              <DotsThreeVerticalFillIcon/>
            </div>
          </div>
          <div>
            <img :src="API_URL + '/image/' + information?.imageUrl" class="float-left mb-5 mr-5" alt="#"/>
            <p class="text-gray-700 text-md">{{ information?.text }}</p>
          </div>
        </div>
        <div class="flex justify-between p-3 mt-3">
          <div class="text-2xl font-semibold text-gray-700">Our Member</div>
          <button v-if="authStore.user?.role === 'admin'" class="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
            Add member
          </button>
        </div>
        <div class="px-3 py-1 text-center text-gray-500 text-md">
          Consectetur adipiscing elit. Donec pellentesque venenatis elit, quis aliquet mauris malesuada vel. Donec vitae libero dolor, eget dapibus
          justo. <br>
          Aenean facilisis aliquet feugiat. Suspendisse lacinia congue est ac semper. Nulla ut elit magna, vitae volutpat magna.
        </div>
        <div class="grid grid-cols-2 gap-5 mt-2">
          <div v-for="(worker, idx) in aboutUsStore.workers" :key="idx" class="flex p-3 border border-red-500 rounded">
            <div>
              <img :src="API_URL + '/image/' + worker?.imageUrl" alt="#"/>
            </div>
            <div class="flex flex-col pl-3 space-y-2">
              <div class="text-lg font-medium text-gray-700">{{ worker?.fullName }}</div>
              <div class="text-gray-600 uppercase text-md">{{ worker?.position }}</div>
              <div class="text-sm text-gray-500">{{ worker?.description }}</div>
              <ul class="flex space-x-2">
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <a :href="'mailto:' + worker?.facebook">
                    <AtBoldIcon class="w-6 h-6"/>
                  </a>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <a :href="'https://facebook.com/' + worker?.facebook" target="blank">
                    <FacebookFIcon class="w-5 h-5"/>
                  </a>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <a :href="'https://twitter.com/' + worker?.twitter" target="blank">
                    <TwitterIcon class="w-5 h-5"/>
                  </a>
                </li>
                <li class="flex items-center justify-center w-8 h-8 text-red-500 bg-white border border-red-500 rounded-full hover:bg-red-500 hover:text-white">
                  <a :href="'https://skype.com/' + worker?.skype" target="blank">
                    <SkyprIcon class="w-6 h-6"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>