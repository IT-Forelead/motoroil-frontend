
<script setup>
import { useProductStore } from '../../../stores/product.js'
import { useUserStore } from '../../../stores/user.js'
import { onMounted, reactive } from '@vue/runtime-core';
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import CalendarCheckIcon from '../../../assets/icons/CalendarCheckIcon.vue';
import CalendarXIcon from '../../../assets/icons/CalendarXIcon.vue';
import { formatDateTime } from '../../../mixins/utils.js';

const store = useProductStore()
const userStore = useUserStore()

const coupon = reactive({
  userId: '',
  startedAt: '',
  expiredAt: '',
  price: ''
})

const create = () => {
  if (coupon.userId === ''){
    notify.error({
			message: 'Please, select a user!',
			position: 'bottomRight'
		})
  } else if (coupon.price === ''){
    notify.error({
			message: 'Please, enter coupon price!',
			position: 'bottomRight'
		})
  } else if (coupon.startedAt === ''){
    notify.error({
			message: 'Please, enter coupon started at!',
			position: 'bottomRight'
		})
  } else if (coupon.expiredAt === ''){
    notify.error({
			message: 'Please, enter coupon expired at!',
			position: 'bottomRight'
		})
  } else {
    userStore.addCoupon(coupon).then(() => {
      coupon.userId = ''
      coupon.startedAt = ''
      coupon.expiredAt = ''
      coupon.price = ''
    })
  }
}

onMounted(() => {
    userStore.getCoupons()
    userStore.getUsers()
})

const couponStatus = (start, end) => {
  let now = new Date()
  if ((new Date(start).getTime()) <= now.getTime() && now.getTime() <= (new Date(end).getTime())) {
    return 'Active'
  } else if (now.getTime() <= (new Date(start).getTime())) {
    return 'Waiting'
  } else if (now.getTime() >= (new Date(end).getTime())) {
    return 'No active'
  }
}

const couponStatusColor = (start, end) => {
  let now = new Date()
  if ((new Date(start).getTime()) <= now.getTime() && now.getTime() <= (new Date(end).getTime())) {
    return 'bg-green-400'
  } else if (now.getTime() <= (new Date(start).getTime())) {
    return 'bg-yellow-300'
  } else if (now.getTime() >= (new Date(end).getTime())) {
    return 'bg-red-500'
  }
}

</script>

<template>
<div class="flex justify-center px-5 py-2 bg-white">
    <div class="container flex flex-col justify-center">
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div class="flex flex-col ml-3 md:col-span-2">
            <div class="p-3 overflow-x-auto overflow-y-hidden text-2xl font-semibold text-gray-700">{{ $t('addCoupon') }}</div>
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                <tr>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('user') }}</td>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('validityPeriod') }}</td>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('price') }}</td>
                  <td class="px-3 py-3 text-sm font-medium text-gray-700 uppercase">{{ $t('status') }}</td>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(coupon, idx) in userStore.coupons" :key="idx" class="align-middle">
                  <td class="p-3 text-sm text-gray-700">
                    <div class="font-medium text-gray-700 text-md">{{ coupon?.userName }}</div>
                    <div class="flex items-center text-gray-500">
                      <div class="mr-2 text-sm">Promo code:</div>
                      <div class="font-medium text-md">{{ coupon?.code }}</div>
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500"><CalendarCheckIcon class="w-4 h-4 mr-1"/></div>
                      <div class="font-medium text-gray-700 text-md">{{ formatDateTime(coupon?.startedAt) }}</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-1 text-sm text-gray-500"><CalendarXIcon class="w-4 h-4 mr-1"/></div>
                      <div class="font-medium text-gray-700 text-md">{{ formatDateTime(coupon?.expiredAt) }}</div>
                    </div>
                  </td>
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center">
                      <div class="mr-2 text-sm text-gray-500">{{ $t('minimumSpend') }}:</div>
                      <div class="font-medium text-gray-700 text-md">€{{ coupon?.minPrice }}</div>
                    </div>
                    <div class="flex items-center">
                      <div class="mr-2 text-sm text-gray-500">{{ $t('discountMoney') }}:</div>
                      <div class="font-medium text-gray-700 text-md">€{{ coupon?.price }}</div>
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="w-24 px-2 py-1 text-sm text-center text-white rounded-full"
                         :class="couponStatusColor(coupon?.startedAt, coupon?.expiredAt)">
                      {{ couponStatus(coupon?.startedAt, coupon?.expiredAt) }}
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="p-5 space-y-4 bg-white rounded shadow">
                <div class="p-3 font-medium text-gray-700 border-b text-md">{{ $t('addCoupon') }}</div>
                <div class="space-y-1">
                  <label for="user" class="text-gray-700 text-md">{{ $t('user') }}</label>
                    <select v-model="coupon.userId" id="user" class="block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="" selected>{{ $t('chooseAUser') }}</option>
                        <option v-for="(user, idx) in userStore.users" :key="idx" :value="user?.uuid">{{ user?.name }}</option>
                    </select>
                </div>
                <div class="space-y-1">
                    <label for="price" class="text-gray-700 text-md">{{ $t('price') }}</label>
                    <input v-model="coupon.price" id="price" type="number" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0">
                </div>
                <div class="space-y-1">
                    <label for="price" class="text-gray-700 text-md">{{ $t('startedAt') }}</label>
                    <input v-model="coupon.startedAt" id="price" type="datetime-local" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>
                <div class="space-y-1">
                    <label for="price" class="text-gray-700 text-md">{{ $t('expiredAt') }}</label>
                    <input v-model="coupon.expiredAt" id="price" type="datetime-local" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                </div>
                <button @click="create()" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  {{ $t('add') }}</button>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
</style>