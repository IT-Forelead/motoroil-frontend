<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue';
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue';
import MapPinIcon from '../../../assets/icons/MapPinIcon.vue';
import { useUserStore } from '../../../stores/user.js';
import { onMounted, reactive, watch } from '@vue/runtime-core';

const userStore = useUserStore()

const address = reactive({
  country: '',
  regionId: '',
  cityId: '',
  street: ''
})

onMounted(() => {
  userStore.getUserAddresses()
})

watch(
  () => address.country,
  () => {
    userStore.getRegions(address.country)
  },
  { deep: true }
)

watch(
  () => address.country,
  () => {
    userStore.getCities(address.country)
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
        <li class="text-gray-700">Addresses</li>
      </ul>
    </div>
    <div class="grid grid-cols-4 gap-3">
      <Sidebar />
      <div class="col-span-3">
        <div class="grid grid-cols-3 gap-3">
          <div class="col-span-2 ml-3">
            <div class="grid grid-cols-2 gap-3">
              <div v-for="(address, idx) in userStore.addresses" :key="idx" class="p-3 space-y-3 bg-white rounded shadow">
                <div class="flex items-center justify-between pb-2 text-lg font-medium text-gray-700 border-b">
                  <div class="flex items-center">
                    <MapPinIcon class="w-6 h-6 mr-2"/>
                    Address
                  </div>
                  <div class="flex items-center space-x-2">
                    <PencilDuotoneIcon class="w-5 h-5 text-blue-700"/>
                    <TrashIcon class="w-5 h-5 text-red-500"/>
                  </div>
                </div>
                <ul class="space-y-1">
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">Receiver:</div>
                    <div class="text-gray-800 text-md">{{ address?.receiverFullName }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">Receiver phone:</div>
                    <div class="text-gray-800 text-md">{{ address?.receiverPhone }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">Country:</div>
                    <div class="text-gray-800 text-md">{{ address?.country }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">Region:</div>
                    <div class="text-gray-800 text-md">{{ address?.region }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">City:</div>
                    <div class="text-gray-800 text-md">{{ address?.city }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">Street:</div>
                    <div class="text-gray-800 text-md">{{ address?.street }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">Postal Code:</div>
                    <div class="text-gray-800 text-md">{{ address?.postalCode }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="p-3 space-y-3 bg-white rounded shadow">
            <div class="pb-2 font-medium text-gray-700 border-b text-md">Add address</div>
            <div class="space-y-1">
              <label for="receiver-fullname" class="text-sm text-gray-700">Receiver fullname</label>
              <input id="receiver-fullname" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter your fullname">
            </div>
            <div class="space-y-1">
              <label for="receiver-phone" class="text-sm text-gray-700">Receiver phone</label>
              <input id="receiver-phone" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter your phone">
            </div>
            <div class="space-y-1">
              <label for="country" class="text-sm text-gray-700">Country</label>
              <select v-model="address.country" id="country" class="block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option value="" selected>Choose a country</option>
                <option value="uz">Uzbekistan</option>
                <option value="de">Germany</option>
              </select>
            </div>
            <div class="space-y-1" v-if="userStore.regions.length > 0">
              <label for="region" class="text-sm text-gray-700">Region</label>
              <select id="country" class="block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option selected>Choose a region</option>
                <option v-for="(region, idx) in userStore.regions" :key="idx" :value="region?.id">{{ region?.name }}</option>
              </select>
            </div>
            <div class="space-y-1" v-if="userStore.cities.length > 0 && userStore.regions.length > 0 && address.country.length > 0">
              <label for="city" class="text-sm text-gray-700">City</label>
              <select id="country" class="block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option selected>Choose a city</option>
                <option v-for="(city, idx) in userStore.cities" :key="idx" :value="city?.id">{{ city?.name }}</option>
              </select>
            </div>
            <div class="space-y-1">
              <label for="street" class="text-sm text-gray-700">Street</label>
              <input id="street" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter your street">
            </div>
            <div class="space-y-1">
              <label for="postal-code" class="text-sm text-gray-700">ZIP/Postal code</label>
              <input id="postal-code" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter your postal code">
            </div>
            <button class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">{{ $t('save') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>