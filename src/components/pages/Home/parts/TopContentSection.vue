<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper";
import { useMainSearchStore } from '../../../../stores/mainSearch.js'
import { useSlideStore } from "../../../../stores/slide.js";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { useAuthStore } from "../../../../stores/auth.js";
import { useModalStore } from "../../../../stores/modal.js";
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import TrashIcon from "../../../../assets/icons/TrashIcon.vue";
import PlusIcon from "../../../../assets/icons/PlusIcon.vue";
import CloseIcon from "../../../../assets/icons/CloseIcon.vue";

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const modules = [Autoplay, Navigation]

const mainSearchStore = useMainSearchStore()
const slideStore = useSlideStore()
const authStore = useAuthStore()
const modalStore = useModalStore()

onMounted(() => {
  mainSearchStore.getMainSearch()
  if (sessionStorage.getItem('role') === 'admin') {
    slideStore.getAllSlides()
  } else {
    slideStore.getAllActiveSlides()
  }
})

const mainFilter = reactive({
  brand: '',
  sae: '',
  oem: '',
  spec: ''
})

const slideLink = ref('')
const slideImage = ref('')
const currentUserRole = ref('')

function getImage(e) {
  if (e?.target?.files[0].type.includes('image')) {
    slideImage.value = e?.target?.files[0]
  }
}

const submitSlideData = () => {
  const formData = new FormData()
  if (!slideLink.value) {
    notify.warning({
      message: 'Please enter slide link!',
      position: 'bottomRight',
    })
  } else if (!slideImage.value) {
    notify.warning({
      message: 'Please enter slide image!',
      position: 'bottomRight',
    })
  } else {
    formData.append('link', slideLink.value)
    formData.append('slide-image', slideImage.value)
    slideStore.createSlide(formData)
  }
}
</script>

<template>
  <div class="flex justify-center p-5 bg-white">
    <div class="container grid items-center grid-cols-1 lg:grid-cols-4 gap-3">
      <div class="flex flex-col h-full md:space-y-20 bg-slate-200 bg-[url('/bg/bg-advanced.jpg')] bg-no-repeat bg-cover">
        <div class="p-5 text-2xl font-semibold text-white uppercase bg-gray-900/60">
          {{ $t('selectEngineOilRequirements') }}</div>
        <div class="px-5 space-y-3 py-3">
          <select v-model="mainFilter.brand"
            class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="" selected>{{$t('brand')}}</option>
            <option v-for="(brand, idx) in mainSearchStore.mainSearch?.brands" :key="idx" :value="brand?.id">{{
                brand?.name
            }}</option>
          </select>
          <select v-model="mainFilter.sae"
            class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="" selected>{{$t('saeViscosityGrades')}}</option>
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
            class="flex items-center justify-center w-full p-3 text-white uppercase bg-red-600 rounded hover:bg-red-700">{{ $t('search') }}</a>
        </div>
      </div>
      <div class="hidden md:block col-span-3 h-auto lg:h-[650px]">
        <swiper v-if="slideStore.slides.length > 0" :spaceBetween="30" :loop="true" :centeredSlides="true" :navigation="true"
          :modules="modules" :autoplay="{ delay: 2500, disableOnInteraction: false }" class="mySwiper">
          <swiper-slide v-for="(slide, idx) in slideStore.slides" :key="idx" class="slide">
            <img :src="`${API_URL}/image/${slide?.imageUrl}`" class="w-full" alt="#">
            <a :href="slide?.link" target="_blank"
              class="absolute hidden px-5 py-3 text-base font-medium text-white bg-red-600 rounded whitespace-nowrap">{{$t('showMore')}}</a>
            <div v-if="authStore.user?.role === 'admin'"
              class="absolute top-0 right-0 flex items-center justify-center p-3 space-x-2 text-white rounded bg-black/50">
              <plus-icon @click="modalStore.openSlideModal()"
                class="w-5 h-5 text-white rounded-full cursor-pointer hover:bg-white bg-white/50 hover:text-blue-600" />
              <input type="checkbox" class="cursor-pointer" :checked="slide?.active"
                @click="slideStore.changeSlideStatus(slide?.id)">
              <trash-icon class="w-5 h-5 cursor-pointer hover:text-red-600"  @click="slideStore.deleteSlide(slide?.id)" />
            </div>
          </swiper-slide>
        </swiper>
        <swiper v-else :spaceBetween="30" :centeredSlides="true" :navigation="true" :modules="modules"
          :autoplay="{ delay: 2500, disableOnInteraction: false }" class="mySwiper">
          <swiper-slide class="slide">
            <img src="/bg/slider-1.jpg" class="w-full" alt="#">
            <a href="#" target="_blank"
              class="absolute hidden px-5 py-3 text-base font-medium text-white bg-red-600 rounded whitespace-nowrap">{{$t('showMore')}}</a>
            <div v-if="authStore.user?.role === 'admin'"
              class="absolute top-0 right-0 flex items-center justify-center p-3 space-x-2 text-white rounded bg-black/50">
              <plus-icon @click="modalStore.openSlideModal()"
                class="w-5 h-5 text-white rounded-full cursor-pointer hover:bg-white bg-white/50 hover:text-blue-600" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <!-- Add Slide Modal -->
  <div :class="{ 'hidden': !modalStore.isOpenSlideModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full h-full max-w-xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('slideData') }}</h3>
          <button type="button" @click="modalStore.closeSlideModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-3 space-y-6">
          <form @submit.prevent="submitSlideData()" class="my-5">
            <div class="flex flex-col space-y-5">
              <label for="link">
                <p class="pb-2 font-medium text-slate-700">{{ ('link') }}</p>
                <input id="link" v-model="slideLink" type="text"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter link">
              </label>
              <label for="image">
                <p class="pb-2 font-medium text-slate-700">{{ ('image') }}</p>
                <input id="image" @change="getImage" type="file" class="w-full px-3 py-3 focus:outline-none"
                  placeholder="Enter slide image">
              </label>
              <button
                class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                {{ $t('createSlide') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide:hover a {
  display: block;
  transition: all ease .5s;
}
</style>