<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue';
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import MinusIcon from '../../../assets/icons/MinusIcon.vue';
import PlusIcon from '../../../assets/icons/PlusIcon.vue';
import GiftIcon from '../../../assets/icons/GiftIcon.vue';
import CalendarIcon from '../../../assets/icons/CalendarIcon.vue';
import { useOrderStore } from '../../../stores/order.js';
import { onMounted } from '@vue/runtime-core';

const orderStore = useOrderStore()

onMounted(() => {
  orderStore.getOrdersForAdmins()
})
</script>

<template>
  <div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">Orders</div>
      <div class="space-y-5">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Product</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Order</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Receiver</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Address</td>
              <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Price</td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(order, idx) in orderStore.ordersForAdmins" :key="idx" class="align-middle">
              <td class="p-3 text-sm text-gray-700">
                <div class="flex items-center space-x-2">
                  <div>
                    <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="w-full h-12" alt="#">
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
                  <div class="mr-1 text-sm text-gray-500">Ordered:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userName }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500"><CalendarIcon class="w-4 h-4 mr-1"/></div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.orders?.createdAt }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Order ID:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.orders?.id }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Status:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.orders?.status }}</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Name:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddress?.receiverFullName }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Phone:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddress?.receiverPhone }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Postal code:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddress?.postalCode }}</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Country:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddress?.country }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Region:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddress?.regionId }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Street:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.userAddress?.cityId }}</div>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Total:</div>
                  <div class="font-medium text-gray-700 text-md">${{ order?.orderItem?.totalPrice }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Unit:</div>
                  <div class="font-medium text-gray-700 text-md">{{ order?.orderItem?.totalPrice }}</div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 text-sm text-gray-500">Quantity:</div>
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