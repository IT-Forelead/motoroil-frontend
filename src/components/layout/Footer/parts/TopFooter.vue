<script setup>
import CarIcon from '../../../../assets/icons/CarIcon.vue';
import ArrowsClockwiseIcon from '../../../../assets/icons/ArrowsClockwiseIcon.vue';
import KeyholeIcon from '../../../../assets/icons/KeyholeIcon.vue';
import UsersIcon from '../../../../assets/icons/UsersIcon.vue';

</script>

<template>
  <div class="flex justify-center p-5 bg-gray-100">
    <div class="container grid grid-cols-4 gap-5">    
      <div class="flex items-center space-x-3">
        <div class="p-3 bg-white border border-gray-200 rounded-full shadow">
          <CarIcon class="w-10 h-10 text-red-500" />
        </div>
        <div>
          <div class="font-medium uppercase text-md">{{ $t('freeShipping') }}</div>
          <div class="text-sm text-gray-400">{{ $t('onAllOrdersOver') }}</div>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <div class="p-3 bg-white border border-gray-200 rounded-full shadow">
          <ArrowsClockwiseIcon class="w-10 h-10 text-red-500" />
        </div>
        <div>
          <div class="font-medium uppercase text-md">{{ $t('daysReturn') }}</div>
          <div class="text-sm text-gray-400">{{ $t('youHaveDaysToReturn') }}</div>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <div class="p-3 bg-white border border-gray-200 rounded-full shadow">
          <KeyholeIcon class="w-10 h-10 text-red-500" />
        </div>
        <div>
          <div class="font-medium uppercase text-md">{{ $t('safeShopping') }}</div>
          <div class="text-sm text-gray-400">{{ $t('paymentSecure') }}</div>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <div class="p-3 bg-white border border-gray-200 rounded-full shadow">
          <UsersIcon class="w-10 h-10 text-red-500" />
        </div>
        <div>
          <div class="font-medium uppercase text-md">{{ $t('onlineSupport') }}</div>
          <div class="text-sm text-gray-400">{{ $t('contactUsHoursDay') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>