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
          <li class="text-gray-700">Cart</li>
        </ul>
      </div>
      <div class="grid grid-cols-4 gap-3">
        <Sidebar />
        <div class="col-span-3">
          <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">My orders</div>
          <div class="space-y-5">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Product</td>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Created at</td>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Order</td>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">Details</td>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr class="align-middle">
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center space-x-2">
                      <div>
                        <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="w-full h-12" alt="#">
                      </div>
                      <div>
                        <div class="font-medium text-gray-700 text-md">Prista Extra W10-50</div>
                        <div class="flex items-center text-sm text-gray-500">
                          <StackIcon class="mr-1"/>
                          Automotivation
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center">
                      <CalendarIcon class="w-4 h-4 mr-1"/>
                      28.08.2022 17:30
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Order ID:</div>
                      <div class="font-medium text-gray-700 text-md">#1232421</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Status:</div>
                      <div class="font-medium text-gray-700 text-md">Shipped</div>
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Total:</div>
                      <div class="font-medium text-gray-700 text-md">$246</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Unit:</div>
                      <div class="font-medium text-gray-700 text-md">$123</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Quantity:</div>
                      <div class="font-medium text-gray-700 text-md">2</div>
                    </div>
                  </td>
                </tr>
                <tr class="align-middle">
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center space-x-2">
                      <div>
                        <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="w-full h-12" alt="#">
                      </div>
                      <div>
                        <div class="font-medium text-gray-700 text-md">Prista Extra W10-50</div>
                        <div class="flex items-center text-sm text-gray-500">
                          <StackIcon class="mr-1"/>
                          Automotivation
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center">
                      <CalendarIcon class="w-4 h-4 mr-1"/>
                      28.08.2022 17:30
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Order ID:</div>
                      <div class="font-medium text-gray-700 text-md">#1232421</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Status:</div>
                      <div class="font-medium text-gray-700 text-md">Shipped</div>
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Total:</div>
                      <div class="font-medium text-gray-700 text-md">$246</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Unit:</div>
                      <div class="font-medium text-gray-700 text-md">$123</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Quantity:</div>
                      <div class="font-medium text-gray-700 text-md">2</div>
                    </div>
                  </td>
                </tr>
                <tr class="align-middle">
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center space-x-2">
                      <div>
                        <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="w-full h-12" alt="#">
                      </div>
                      <div>
                        <div class="font-medium text-gray-700 text-md">Prista Extra W10-50</div>
                        <div class="flex items-center text-sm text-gray-500">
                          <StackIcon class="mr-1"/>
                          Automotivation
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center">
                      <CalendarIcon class="w-4 h-4 mr-1"/>
                      28.08.2022 17:30
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Order ID:</div>
                      <div class="font-medium text-gray-700 text-md">#1232421</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Status:</div>
                      <div class="font-medium text-gray-700 text-md">Shipped</div>
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Total:</div>
                      <div class="font-medium text-gray-700 text-md">$246</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Unit:</div>
                      <div class="font-medium text-gray-700 text-md">$123</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500">Quantity:</div>
                      <div class="font-medium text-gray-700 text-md">2</div>
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