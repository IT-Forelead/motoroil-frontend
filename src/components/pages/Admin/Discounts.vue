<script setup>
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import CalendarCheckIcon from '../../../assets/icons/CalendarCheckIcon.vue';
import CalendarXIcon from '../../../assets/icons/CalendarXIcon.vue';
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue';
import PlusIcon from '../../../assets/icons/PlusIcon.vue';
import MinusIcon from '../../../assets/icons/MinusIcon.vue';
import { useDiscountStore } from '../../../stores/discount.js';
import { useProductStore } from '../../../stores/product.js';
import { useModalStore } from '../../../stores/modal.js';
import { onMounted, reactive, ref, watch } from '@vue/runtime-core'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { formatDateTime } from '../../../mixins/utils';
import CloseIcon from '../../../assets/icons/CloseIcon.vue';
import { timestamp } from '@vueuse/core';
import MultiSelectForDiscount from '../../MultiSelectForDiscount.vue';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const discountStore = useDiscountStore()
const productStore = useProductStore()
const modalStore = useModalStore()
const selectedDiscountId = ref('')

const discount = reactive({
  startedAt: '',
  expiredAt: '',
  name: '',
  description: '',
  discountPercent: 0.0
})

const editDiscount = reactive({
  id: '',
  createdAt: '',
  startedAt: '',
  expiredAt: '',
  name: '',
  description: '',
  discountPercent: 0.0
})

watch(
  () => discountStore.singleDiscount,
  () => {
    editDiscount.id = discountStore.getDiscountId
    editDiscount.createdAt = discountStore.getDiscountCreatedAt
    editDiscount.startedAt = discountStore.getDiscountStartedAt
    editDiscount.expiredAt = discountStore.getDiscountExpiredAt
    editDiscount.name = discountStore.getDiscountName
    editDiscount.description = discountStore.getDiscountDesc
    editDiscount.discountPercent = discountStore.getDiscountPercent
  },
  { deep: true }
)

const createDiscount = () => {
  if (discount.discountPercent === 0){
    notify.error({
			message: 'Enter discount percent!',
			position: 'bottomRight'
		})
  } else if (discount.startedAt === ''){
    notify.error({
			message: 'Enter discount started at!',
			position: 'bottomRight'
		})
  } else if (discount.expiredAt === ''){
    notify.error({
			message: 'Enter discount expired at!',
			position: 'bottomRight'
		})
  } else if (discount.name === ''){
    notify.error({
			message: 'Enter discount name!',
			position: 'bottomRight'
		})
  } else if (discount.description === ''){
    notify.error({
			message: 'Enter discount description!',
			position: 'bottomRight'
		})
  } else {
    discountStore.createDiscount(discount).then(() => {
      modalStore.closeAddDiscountModal()
      discount.startedAt = ''
      discount.expiredAt = ''
      discount.name = ''
      discount.description = ''
      discount.discountPercent = 0.0
    })
  }
}

const submitEditDiscount = () => {
  if (editDiscount.discountPercent === 0){
    notify.error({
			message: 'Enter discount percent!',
			position: 'bottomRight'
		})
  } else if (editDiscount.startedAt === ''){
    notify.error({
			message: 'Enter discount started at!',
			position: 'bottomRight'
		})
  } else if (editDiscount.expiredAt === ''){
    notify.error({
			message: 'Enter discount expired at!',
			position: 'bottomRight'
		})
  } else if (editDiscount.name === ''){
    notify.error({
			message: 'Enter discount name!',
			position: 'bottomRight'
		})
  } else if (editDiscount.description === ''){
    notify.error({
			message: 'Enter discount description!',
			position: 'bottomRight'
		})
  } else {
    discountStore.editDiscount(editDiscount).then(() => {
      modalStore.closeEditDiscountModal()
      editDiscount.id = ''
      editDiscount.createdAt = ''
      editDiscount.startedAt = ''
      editDiscount.expiredAt = ''
      editDiscount.name = ''
      editDiscount.description = ''
      editDiscount.discountPercent = 0.0
    })
  }
}

const discountStatus = (start, end) => {
  let now = new Date()
  if ((new Date(start).getTime()) <= now.getTime() && now.getTime() <= (new Date(end).getTime())) {
    return 'Active'
  } else if (now.getTime() <= (new Date(start).getTime())) {
    return 'Waiting'
  } else if (now.getTime() >= (new Date(end).getTime())) {
    return 'No active'
  }
}

const discountStatusColor = (start, end) => {
  let now = new Date()
  if ((new Date(start).getTime()) <= now.getTime() && now.getTime() <= (new Date(end).getTime())) {
    return 'bg-green-400'
  } else if (now.getTime() <= (new Date(start).getTime())) {
    return 'bg-yellow-300'
  } else if (now.getTime() >= (new Date(end).getTime())) {
    return 'bg-red-500'
  }
}

onMounted(() => {
  discountStore.getDiscounts()
})
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">{{ $t('discounts') }}</div>
        <button @click="modalStore.openAddDiscountModal()" class="flex items-center justify-center px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700">
          {{ $t('addDiscount') }}
        </button>
      </div>
      <div class="space-y-5 overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('discount') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('validityPeriod') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('status') }}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('action') }}</td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(discount, idx) in discountStore.discounts" :key="idx" class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-3">
                  <div class="relative z-10 flex items-center justify-center w-10 h-10 font-semibold bg-yellow-300 discount">
                    <span class="text-xl">{{ discount?.discountPercent }}</span>
                    <span class="text-xs">%</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-700 text-md">{{ discount?.name }}</div>
                    <div class="text-sm text-gray-500">{{ discount?.description }}</div>
                  </div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500"><CalendarCheckIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">{{ formatDateTime(discount?.startedAt) }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500"><CalendarXIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">{{ formatDateTime(discount?.expiredAt) }}</div>
                </div>
              </td>
              <td class="p-3">
                <div class="w-24 px-2 py-1 text-sm text-center text-white rounded-full" 
                :class="discountStatusColor(discount?.startedAt, discount?.expiredAt)">
                  {{ discountStatus(discount?.startedAt, discount?.expiredAt) }}
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-start space-x-2">
                  <button @click="modalStore.openAddDiscountToProductModal(); selectedDiscountId=discount?.id" class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PlusIcon class="w-4 h-4" />
                  </button>
                  <button @click="modalStore.openRemoveDiscountInProductModal(); selectedDiscountId=discount?.id" class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <MinusIcon class="w-4 h-4" />
                  </button>
                  <button @click="modalStore.openEditDiscountModal(); discountStore.getSingleDiscount(discount?.id)" class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
                    <PencilDuotoneIcon class="w-4 h-4" />
                  </button>
                  <button @click="discountStore.deleteDiscount(discount?.id)" class="flex items-center justify-center p-2 text-white bg-red-500 rounded hover:bg-red-700">
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
  <!-- Create Discount Modal -->
  <div :class="{ 'hidden': !modalStore.isOpenAddDiscountModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full h-full max-w-2xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('addDiscount') }}</h3>
          <button type="button" @click="modalStore.closeAddDiscountModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-2">
          <div class="flex flex-col space-y-5">
            <label for="discountPercent">
              <p class="pb-2 font-medium text-slate-700">{{ $t('discountPercent') }}</p>
              <input type="number" id="discountPercent" min="0" v-model="discount.discountPercent"
                class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </label>
            <label for="started-at">
              <p class="pb-2 font-medium text-slate-700">{{ $t('startedAt') }}</p>
              <input type="datetime-local" id="started-at" v-model="discount.startedAt"
                class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </label>
            <label for="expired-at">
              <p class="pb-2 font-medium text-slate-700">{{ $t('expiredAt') }}</p>
              <input type="datetime-local" id="expired-at" v-model="discount.expiredAt"
                class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </label>
            <label for="name">
              <p class="pb-2 font-medium text-slate-700">{{ $t('name') }}</p>
              <input type="text" id="name" v-model="discount.name"
                class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </label>
            <label for="description">
              <p class="pb-2 font-medium text-slate-700">{{ $t('description') }}</p>
              <input type="text" id="description" v-model="discount.description"
                class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </label>
            <button @click="createDiscount()" class="inline-flex items-center justify-center w-full py-3 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
              {{ $t('createDiscount') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit Discount Modal -->
  <div :class="{ 'hidden': !modalStore.isOpenEditDiscountModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full h-full max-w-2xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('editDiscount') }}</h3>
          <button type="button" @click="modalStore.closeEditDiscountModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-2">
          <div class="flex flex-col space-y-5">
            <label for="edit-discountPercent">
              <p class="pb-2 font-medium text-slate-700">{{ $t('discountPercent') }}</p>
              <input v-model="editDiscount.discountPercent" type="number" id="edit-discountPercent" min="0" 
                class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </label>
            <label for="edit-started-at">
              <p class="pb-2 font-medium text-slate-700">{{ $t('startedAt') }}</p>
              <input v-model="editDiscount.startedAt" type="datetime-local" id="edit-started-at"
                class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </label>
            <label for="edit-expired-at">
              <p class="pb-2 font-medium text-slate-700">{{ $t('expiredAt') }}</p>
              <input v-model="editDiscount.expiredAt" type="datetime-local" id="edit-expired-at"
                class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </label>
            <label for="edit-name">
              <p class="pb-2 font-medium text-slate-700">{{ $t('name') }}</p>
              <input v-model="editDiscount.name" type="text" id="edit-name"
                class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </label>
            <label for="edit-description">
              <p class="pb-2 font-medium text-slate-700">{{ $t('description') }}</p>
              <input v-model="editDiscount.description" type="text" id="edit-description"
                class="block w-full px-5 py-3 mt-1 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
            </label>
            <button @click="submitEditDiscount()" class="inline-flex items-center justify-center w-full py-3 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
              {{ $t('save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Add Discount to Product Modal -->
  <div :class="{ 'hidden': !modalStore.isOpenAddDiscountToProductModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full h-full max-w-2xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('addDiscountToProduct') }}</h3>
          <button type="button" @click="modalStore.closeAddDiscountToProductModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-2">
          <div class="flex flex-col space-y-5">
            <MultiSelectForDiscount :id="'addDiscount'" :discountId="selectedDiscountId" />
            <button @click="discountStore.addDiscountToProduct({discountId: selectedDiscountId, productIds: productStore.multiselectProductIds})" class="inline-flex items-center justify-center w-full py-3 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
              {{ $t('save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Remove Discount in Product Modal -->
  <div :class="{ 'hidden': !modalStore.isOpenRemoveDiscountInProductModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full h-full max-w-2xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('removeDiscountInProduct') }}</h3>
          <button type="button" @click="modalStore.closeRemoveDiscountInProductModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-2">
          <div class="flex flex-col space-y-5">
            <MultiSelectForDiscount :id="'removeDiscount'" :discountId="selectedDiscountId" />
            <button @click="discountStore.removeDiscountInProduct(productStore.multiselectProductIds)" class="inline-flex items-center justify-center w-full py-3 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
              {{ $t('save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.discount:before {
    transform: rotate(30deg);
}
.discount:after {
    transform: rotate(60deg);
}
.discount:before, .discount:after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background: rgb(255, 217, 0);
}
</style>