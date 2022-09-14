<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue';
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import MinusIcon from '../../../assets/icons/MinusIcon.vue';
import PlusIcon from '../../../assets/icons/PlusIcon.vue';
import GiftIcon from '../../../assets/icons/GiftIcon.vue';
import CalendarIcon from '../../../assets/icons/CalendarIcon.vue';
import { formatDateTime } from '../../../mixins/utils.js';
import { useOrderStore } from '../../../stores/order.js';
import { onMounted } from '@vue/runtime-core';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

const orderStore = useOrderStore()

onMounted(() => {
  orderStore.getOrdersForAdmins()
})
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">{{$t('orders')}}</div>
      <div class="space-y-5 overflow-x-auto overflow-y-hidden">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{$t('product')}}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{$t('order')}}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{$t('receiver')}}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{$t('address')}}</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{$t('price')}}</td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(order, idx) in orderStore.ordersForAdmins" :key="idx" class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-2">
                  <div>
                    <img :src="order?.product?.imageUrl[0] ? `${API_URL}/image/${order?.product?.imageUrl[0]}` : ''" class="w-full h-12" alt="Product image"/>
                  </div>
                  <div>
                    <div class="font-medium text-gray-700 text-md">{{ order?.productGroup?.name }}</div>
                    <div class="text-sm text-gray-500">
                      {{ order?.productSpecType?.name + ': ' + order?.productSpecTypeValue?.value }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('ordered')}}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userName }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500"><CalendarIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">{{ formatDateTime(order?.orders?.createdAt) }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('order')}} ID:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.orders?.id }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('status')}}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.orders?.status }}</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('name')}}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddressWithRegion?.receiverFullName }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('phone')}}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddressWithRegion?.receiverPhone }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('postalCode')}}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddressWithRegion?.postalCode }}</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('country')}}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddressWithRegion?.country }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('region')}}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddressWithRegion?.region }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">City:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddressWithRegion?.city }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('street')}}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddressWithRegion?.street }}</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('total')}}:</div>
                  <div class="font-medium text-gray-700 text-md">${{ order?.orderItem?.totalPrice }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('unit')}}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.orderItem?.totalPrice }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">{{$t('quantity')}}:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.orderItem?.quantity }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<style scoped>
</style>