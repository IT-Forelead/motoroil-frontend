<script setup>
import PdfFileIcon from '../../../assets/icons/PdfFileIcon.vue'
import CalendarIcon from '../../../assets/icons/CalendarIcon.vue'
import { useOrderStore } from '../../../stores/order.js'
import { onMounted, ref } from '@vue/runtime-core'
import html2pdf from 'html2pdf.js'
import { onClickOutside } from '@vueuse/core'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const orderStore = useOrderStore()

const isOpenFilterDropDown = ref(false)
const filterDropDown = ref(null)
const toggleFilterDropDown = () => {
  isOpenFilterDropDown.value = !isOpenFilterDropDown.value
}
onClickOutside(filterDropDown, () => isOpenFilterDropDown.value = false)

const totalQuantity = () =>
  orderStore.accounting.map((p) => p?.quantity).reduce((q, a) => q + a, 0)

const totalPrice = () =>
  orderStore.accounting
    .map((p) => p?.quantity * p?.price)
    .reduce((q, a) => q + a, 0)

const fromDate = ref('')
const toDate = ref('')

onMounted(() => {
  orderStore.getAccounting(fromDate.value, toDate.value)
})

function exportToPDF() {
  let elem = document.getElementById('pdf')
  let opt = {
    filename: 'sold_products.pdf',
    image: { type: 'jpeg' },
    html2canvas: { useCORS: true, scale: 2 }
  }
  html2pdf().from(elem).set(opt).save()
}

const getAccountingByDate = () => {
  orderStore.getAccounting(fromDate.value, toDate.value).then(() => {
    fromDate.value = ''
    toDate.value = ''
  })
} 
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">
          {{ $t('accounting') }}
        </div>
        <div class="flex items-center space-x-3">
          <div class="relative">
            <button @click="toggleFilterDropDown()" class="flex items-center justify-center px-5 py-2 text-blue-500 bg-white border border-blue-500 rounded hover:bg-gray-100">
              <CalendarIcon class="mr-1" />
              {{ $t('filterDate') }}
            </button>
            <div :class="{ 'hidden': !isOpenFilterDropDown }" ref="dropdown" class="absolute right-0 z-10 p-2 space-y-2 bg-white rounded shadow w-72 top-12">
              <div class="relative">
                <div aria-hidden="true" class="absolute inset-y-0 flex items-center px-4 text-sm text-gray-400 uppercase pointer-events-none">
                  {{ $t('from') }}</div>
                <input type="date" v-model="fromDate" class="block w-full p-2 pl-16 mt-1 text-sm bg-white border-gray-300 rounded shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div class="relative">
                <div aria-hidden="true" class="absolute inset-y-0 flex items-center px-4 text-gray-400 uppercase pointer-events-none">{{ $t('to') }}</div>
                <input type="date" v-model="toDate" class="block w-full p-2 pl-16 mt-1 bg-white border-gray-300 rounded shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <button @click="getAccountingByDate()"
                class="w-full p-2 text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
                {{ $t('filter') }}
              </button>
            </div>
          </div>
          <button @click="exportToPDF()" class="flex items-center justify-center px-5 py-2 text-blue-500 bg-white border border-blue-500 rounded cursor-pointer hover:bg-gray-100">
            <PdfFileIcon class="mr-1" />
            {{ $t('downloadPDF') }}
          </button>
        </div>
      </div>
      <div class="space-y-5">
        <table class="min-w-full divide-y divide-gray-300" id="pdf">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">
                {{ $t('product') }}
              </td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">
                {{ $t('count') }}
              </td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">
                {{ $t('unitPrice') }}
              </td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">
                {{ $t('price') }}
              </td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(accounting, idx) in orderStore.accounting"
              :key="idx"
              class="align-middle"
            >
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-2">
                  <div>
                    <img
                      :src="
                        accounting?.imageUrls[0]
                          ? `${API_URL}/image/${accounting?.imageUrls[0]}`
                          : ''
                      "
                      class="w-full h-12"
                      alt="Product image"
                    />
                  </div>
                  <div class="font-medium text-gray-700 text-md">
                    {{ accounting?.productName }}
                  </div>
                </div>
              </td>
              <td class="p-3 font-medium text-gray-700 text-md">
                {{ accounting?.quantity }}
              </td>
              <td class="p-3 font-medium text-gray-700 text-md">
                ${{ accounting?.price }}
              </td>
              <td class="p-3 font-medium text-gray-700 text-md">
                ${{ accounting?.price * accounting?.quantity }}
              </td>
            </tr>
            <tr class="align-middle">
              <td class="p-3 font-medium text-gray-700 text-md">
                {{ $t('total') }}:
              </td>
              <td class="p-3 font-medium text-gray-700 text-md">
                {{ totalQuantity() }}
              </td>
              <td class="p-3 font-medium text-gray-700 text-md"></td>
              <td class="p-3 font-medium text-gray-700 text-md">
                ${{ totalPrice() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
