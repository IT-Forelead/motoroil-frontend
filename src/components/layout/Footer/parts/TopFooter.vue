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
          <div class="font-medium uppercase text-md">Free shipping</div>
          <div class="text-sm text-gray-400">On all orders over $99.00</div>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <div class="p-3 bg-white border border-gray-200 rounded-full shadow">
          <ArrowsClockwiseIcon class="w-10 h-10 text-red-500" />
        </div>
        <div>
          <div class="font-medium uppercase text-md">30 days return</div>
          <div class="text-sm text-gray-400">You have 30 days to return</div>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <div class="p-3 bg-white border border-gray-200 rounded-full shadow">
          <KeyholeIcon class="w-10 h-10 text-red-500" />
        </div>
        <div>
          <div class="font-medium uppercase text-md">Safe Shopping</div>
          <div class="text-sm text-gray-400">Payment 100% secure</div>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <div class="p-3 bg-white border border-gray-200 rounded-full shadow">
          <UsersIcon class="w-10 h-10 text-red-500" />
        </div>
        <div>
          <div class="font-medium uppercase text-md">Online support</div>
          <div class="text-sm text-gray-400">Contact us 24 hours a day</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>