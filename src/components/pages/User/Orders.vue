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
import CalendarIcon from '../../../assets/icons/CalendarIcon.vue';
import { formatDateTime } from '../../../mixins/utils.js';
import { useOrderStore } from '../../../stores/order.js';
import { onMounted } from '@vue/runtime-core';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

const orderStore = useOrderStore()

onMounted(() => {
  orderStore.getOrdersForUsers()
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
          <li class="text-gray-700">{{$t('orders')}}</li>
        </ul>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Sidebar />
        <div class="col-span-3">
          <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">{{$t('myOrders')}}</div>
          <div class="space-y-5 overflow-x-auto overflow-y-hidden">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{$t('product')}}</td>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{$t('createdAt')}}</td>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{$t('price')}}</td>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(order, idx) in orderStore.ordersForUsers" :key="idx" class="align-middle">
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center space-x-2">
                      <div>
                        <img :src="order?.imageUrls[0] ? `${API_URL}/image/${order?.imageUrls[0]}` : ''" class="w-full h-12" alt="Product image"/>
                      </div>
                      <div>
                        <div class="font-medium text-gray-700 text-md">{{ order?.productName }}</div>
                        <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">{{$t('quantity')}}:</div>
                      <div class="font-medium text-gray-700 text-md">{{ order?.quantity }}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center">
                      <CalendarIcon class="w-4 h-4 mr-1"/>
                      {{ formatDateTime(order?.createdAt) }}
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">{{$t('total')}}:</div>
                      <div class="font-medium text-gray-700 text-md">€{{ order?.totalPrice * order?.quantity }}</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">{{$t('unit')}}:</div>
                      <div class="font-medium text-gray-700 text-md">€{{ order?.totalPrice }}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>