<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue';
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import MinusIcon from '../../../assets/icons/MinusIcon.vue';
import PlusIcon from '../../../assets/icons/PlusIcon.vue';
import StackIcon from '../../../assets/icons/StackIcon.vue';
import GiftIcon from '../../../assets/icons/GiftIcon.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue'
import { useUserStore } from '../../../stores/user.js';
import { onMounted, reactive, watch } from '@vue/runtime-core';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

const userStore = useUserStore()

const addressForm = reactive({
  country: '',
  regionId: '',
  cityId: '',
  street: ''
})

onMounted(() => {
  userStore.getCart()
  userStore.getUserAddresses()
})

const plusMinus = (id, productCount, quantity, action) => {
  if (action === '-') {
    if (quantity > 1) userStore.changeCartItemsQuantityMinus(id)
  } else {
    if (quantity < productCount) userStore.changeCartItemsQuantityPlus(id)
  }
}

watch(
  () => addressForm.country,
  () => {
    userStore.getRegions(addressForm.country)
  },
  { deep: true }
)

watch(
  () => addressForm.country,
  () => {
    userStore.getCities(addressForm.country)
  },
  { deep: true }
)
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
          <li class="text-gray-700">{{ $t('cart') }}</li>
        </ul>
      </div>
      <div class="grid grid-cols-4 gap-10">
        <Sidebar />
        <div class="col-span-3">
          <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">{{ $t('myCart') }}</div>
          <div class="space-y-5">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-3 text-sm font-medium text-left text-gray-700 uppercase">{{ $t('product') }}</th>
                  <th scope="col" class="px-3 py-3 text-sm font-medium text-center text-gray-700 uppercase">{{ $t('price') }}</th>
                  <th scope="col" class="px-3 py-3 text-sm font-medium text-center text-gray-700 uppercase">{{ $t('quantity') }}</th>
                  <th scope="col" class="px-3 py-3 text-sm font-medium text-center text-gray-700 uppercase">{{ $t('actions') }}</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(product, idx) in userStore.cart" :key="idx" class="align-middle">
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center space-x-2">
                      <div>
                        <img :src=" product?.productImageUrl[0] ? `${API_URL}/image/${product?.productImageUrl[0]}` : '' " class="w-full h-12" alt="Product image" />
                      </div>
                      <div>
                        <div class="font-medium text-gray-700 text-md">{{ product?.productName }}</div>
                        <div class="flex items-center text-sm text-gray-500">
                          <StackIcon class="mr-1"/>
                          {{ product?.productCategoryName }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3 text-sm font-medium text-center text-gray-700">${{ product?.productPrice }}</td>
                  <td class="p-3">
                    <div class="grid items-center w-1/2 grid-cols-3 gap-1 px-1.5 py-1 mx-auto rounded-full shadow">
                      <button @click="plusMinus(product?.id, product?.productCount, product?.quantity, '-')" class="flex justify-center text-gray-700 rounded-l hover:text-red-500">
                        <MinusIcon class="w-4 h-4" />
                      </button>
                      <div class="text-lg font-normal text-center">{{ product?.quantity }}</div>
                      <button @click="plusMinus(product?.id, product?.productCount, product?.quantity, '+')" class="flex justify-center text-gray-700 rounded-r hover:text-red-500">
                        <PlusIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td class="p-3">
                    <button class="flex items-center justify-center p-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="grid grid-cols-2 gap-7">
              <div>
                <div class="flex items-center justify-between py-3.5 font-normal text-gray-700 uppercase bg-gray-50 rounded-full pl-7 pr-4 text-md">
                  {{ $t('selectAdress') }}
                  <button type="submit" class="flex items-center px-3 py-2 text-sm text-white bg-red-500 rounded-full hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                    <PlusIcon class="w-5 h-5 mr-1" />
                    {{ $t('addAdress') }}
                  </button>
                </div>
                <div class="p-3 text-gray-800">{{ $t('selectTheAddressRecipient') }}</div>
                <ul class="divide-y">
                  <li v-for="(address, idx) in userStore.addresses" :key="idx" class="flex items-center px-3 py-2 space-x-3">
                    <input id="push-nothing" name="push-notifications" type="radio" class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                      <div class="font-normal text-md">{{ address?.receiverFullName }}, {{ address?.receiverPhone }}</div>
                      <div class="font-normal text-md">{{ address?.postalCode }}, {{ address?.street }}</div>
                      <div class="font-normal text-md">{{ address?.city }}, {{ address?.region }}, {{ address?.country }}</div>
                    </label>
                  </li>
                </ul>
                <div class="py-5 font-normal text-gray-700 uppercase rounded-full px-7 text-md bg-gray-50">{{ $t('couponCode')}}</div>
                <div class="p-3 text-gray-800">{{ $t('toUseThisCoupon')}}</div>
                <div class="relative">
                  <input type="text" class="block w-full px-5 py-3 text-gray-900 border border-gray-300 rounded-full text-md bg-gray-50 focus:ring-red-500 focus:border-red-500" placeholder="Enter coupon code...">
                  <button type="submit" class="absolute flex items-center px-4 py-2 text-sm font-medium text-white -translate-y-1/2 bg-red-500 rounded-full right-2 top-1/2 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                    <GiftIcon class="w-5 h-5 mr-1" />
                    <p>{{ $t('applyCoupon')}}</p>
                  </button>
                </div>
              </div>
              <div>
                <div class="py-5 font-normal text-gray-700 uppercase rounded-full bg-gray-50 px-7 text-md">{{ $t('orderSummary')}}</div>
                <div class="p-3 text-gray-800">
                  {{ $t('shippingAndAdditionalCosts')}}
                </div>
                <ul class="px-5 my-3 divide-y">
                  <li class="flex items-center justify-between py-3 font-medium">
                    <span class="text-gray-600">{{ $t('orderSubtotal')}}</span>
                    <span class="text-gray-900">$123.90</span>
                  </li>
                  <li class="flex items-center justify-between py-3 font-medium">
                    <span class="text-gray-700">{{ $t('shippingAndHandling')}}</span>
                    <span class="text-gray-900">$0</span>
                  </li>
                  <li class="flex items-center justify-between py-3 font-medium">
                    <span class="text-gray-700">{{ $t('taxi')}}</span>
                    <span class="text-gray-900">$0</span>
                  </li>
                  <li class="flex items-center justify-between py-3 font-medium">
                    <span class="text-gray-600">{{ $t('total')}}</span>
                    <span class="text-gray-900">$123.90</span>
                  </li>
                </ul>
                <button class="w-1/2 py-2 mx-3 text-lg text-white bg-red-500 rounded-full hover:bg-red-700">
                  {{ $t('buy') }}
                </button>
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