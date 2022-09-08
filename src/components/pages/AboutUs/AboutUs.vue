<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue';
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import FacebookFIcon from '../../../assets/icons/FacebookFIcon.vue';
import TwitterIcon from '../../../assets/icons/TwitterIcon.vue';
import SkyprIcon from '../../../assets/icons/SkyprIcon.vue';
import AtBoldIcon from '../../../assets/icons/AtBoldIcon.vue';
import DotsThreeVerticalFillIcon from '../../../assets/icons/DotsThreeVerticalFillIcon.vue';
import CloseIcon from '../../../assets/icons/CloseIcon.vue';
import { useAuthStore } from '../../../stores/auth.js';
import { useAboutUsStore } from '../../../stores/aboutUs.js';
import { useModalStore } from '../../../stores/modal.js';
import { onMounted, ref } from '@vue/runtime-core';
import $ from 'jquery'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const authStore = useAuthStore()
const aboutUsStore = useAboutUsStore()
const modalStore = useModalStore()

onMounted(() => {
	aboutUsStore.getAllAboutUsInfos()
	aboutUsStore.getAllWorkers()
})

const informationTitle = ref('')
const informationImage = ref('')

function getImage(e) {
  if (e?.target?.files[0].type.includes('image')) {
    informationImage.value = e?.target?.files[0]
  }
}

const submitInformationData = () => {
  const formData = new FormData()
  formData.append('aboutUsTitle', informationTitle.value)
  formData.append('aboutUsText', $('#information-text .ql-editor').html())
  formData.append('aboutUsImage', informationImage.value)
  aboutUsStore.createInformation(formData)
}
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
          <button @click="modalStore.openAddAboutUsInfoModal()" class="px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
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
            <p class="text-gray-700 text-md" v-html="information?.text"></p>
          </div>
          <div class="clear-both"></div>
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
<!-- Add Information Modal -->
<div :class="{ hidden: !modalStore.isOpenAddAboutUsInfoModal }" class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
  <div class="relative w-full h-full max-w-3xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
    <div class="relative bg-white rounded shadow dark:bg-gray-700">
      <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add Information</h3>
        <button type="button" @click="modalStore.closeAddAboutUsInfoModal()" class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900" data-modal-toggle="defaultModal">
          <CloseIcon />
          <span class="sr-only">{{ $t('closeModal') }}</span>
        </button>
      </div>
      <div class="px-6 py-3 space-y-6">
        <form class="my-3">
          <div class="flex flex-col space-y-5">
            <label for="information-title">
              <p class="pb-2 font-medium text-slate-700">Title</p>
              <input
                id="information-title"
                type="text"
                v-model="informationTitle"
                class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter title"
              />
            </label>
            <label for="information-text">
              <p class="mt-2 font-medium text-slate-700">Text</p>
              <QuillEditor theme="snow" id="information-text" />
            </label>
            <label for="information-text">
              <p class="mt-2 font-medium text-slate-700">Image</p>
              <input type="file" class="w-full px-3 py-3" @change="getImage"/>
            </label>
            <button @click.prevent="submitInformationData()" class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
              <span>Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>