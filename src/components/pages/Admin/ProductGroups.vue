<script setup>
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue';
import StackIcon from '../../../assets/icons/StackIcon.vue';
import OilCanIcon from '../../../assets/icons/OilCanIcon.vue';
import YoutubeIcon from '../../../assets/icons/YoutubeIcon.vue';
import PdfFileIcon from '../../../assets/icons/PdfFileIcon.vue';
import { useProductStore } from '../../../stores/product.js'
import { useModalStore } from '../../../stores/modal.js';
import { onMounted, ref } from '@vue/runtime-core';
import CloseIcon from '../../../assets/icons/CloseIcon.vue';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

const store = useProductStore()
const modalStore = useModalStore()
const videoLink = ref('')

const getVideoLink = (link) => videoLink.value = link

onMounted(() => {
  store.getProductGroups()
})
</script>

<template>
<div class="flex justify-center px-5 py-2 bg-white">
  <div class="container flex flex-col justify-center">
    <div class="flex items-center justify-between">
      <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">Product Groups</div>
      <button class="flex items-center justify-center px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
        Add product group
      </button>
    </div>
    <div class="space-y-5">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Product group</td>
            <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Category</td>
            <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">CLASSIFICATION</td>
            <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Files</td>
            <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Action</td>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(productGroup, idx) in store.productGroups" :key="idx" class="align-middle">
            <td class="p-3 text-sm text-gray-700">
              <div class="flex flex-col">
                  <div class="font-medium text-gray-700 text-md">{{ productGroup?.productGroup?.name }}</div>
                  <div class="flex items-center space-x-2 text-sm text-gray-500">
                    <div class="flex items-center">
                      <StackIcon class="mr-1"/>
                      {{ productGroup?.category?.name }}
                    </div>
                    <div class="flex items-center">
                      <OilCanIcon class="mr-1"/>
                      {{ productGroup?.viscosityGrade?.name }}
                    </div>
                  </div>
              </div>
            </td>
            <td class="p-3">
              <div class="flex flex-col">
                <div class="font-medium text-gray-700 text-md">{{ productGroup?.category?.name }}</div>
                <div class="font-medium text-gray-700 text-md">{{ productGroup?.subCategory?.name }}</div>
                <div class="font-medium text-gray-700 text-md">{{ productGroup?.miniSubCategory?.name }}</div>
              </div>
            </td>
            <td class="p-3">
              <div class="flex items-center">
                <div class="mr-1 text-sm text-gray-500">OEM-Freigabe:</div>
                <div class="font-medium text-gray-700 text-md">{{ productGroup?.oems.map(o => o.name).join(', ') }}</div>
              </div>
              <div class="flex items-center">
                <div class="mr-1 text-sm text-gray-500">Spezifikation:</div>
                <div class="font-medium text-gray-700 text-md">{{ productGroup?.specifications.map(o => o.name).join(', ') }}</div>
              </div>
            </td>
            <td class="p-3">
              <div class="flex items-center space-x-3">
                <div v-if="productGroup?.productGroup?.videoUrl" @click="modalStore.openVideoModal(); getVideoLink(productGroup?.productGroup?.videoUrl)">
                  <YoutubeIcon class="text-red-500 cursor-pointer w-7 h-7 hover:text-red-700"/>
                </div>
                <a v-if="productGroup?.productGroup?.pdfUrl" :href="`${API_URL}/image/${productGroup?.productGroup?.pdfUrl}`">
                  <PdfFileIcon class="text-red-500 cursor-pointer w-7 h-7 hover:text-red-700"/>
                </a>
              </div>
            </td>
            <td class="p-3">
              <div class="flex items-start space-x-2">
                <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                  <PencilDuotoneIcon class="w-4 h-4" />
                </button>
                <button class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                  <TrashIcon />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Video Modal -->
<div :class="{ 'hidden': !modalStore.isOpenVideoModal }" class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
  <div class="relative w-full h-full max-w-5xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
    <div class="relative bg-white rounded shadow dark:bg-gray-700">
      <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Product video</h3>
        <button type="button" @click="modalStore.closeVideoModal()"
          class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
          data-modal-toggle="defaultModal">
          <CloseIcon />
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <div >
        <iframe class="w-full aspect-video" :src="videoLink" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>