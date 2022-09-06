<script setup>
import { onMounted } from '@vue/runtime-core';
import { Countdown } from 'vue3-flip-countdown'
import StarFillIcon from '../../../../assets/icons/StarFillIcon.vue';
import { useProductStore } from '../../../../stores/product.js';
import Rating from '../../../Rating.vue';

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useProductStore()

const showProduct = (id) => {
  store.getSingleProduct(id)
  sessionStorage.removeItem('sp_id')
  sessionStorage.setItem('sp_id', id)
}

onMounted(() => {
  store.getTimerSpecialOffers()
})

</script>

<template>
  <div class="flex justify-center p-5 bg-gray-100 bg-[url('/bg/bg-deals-new.jpg')] bg-cover">
    <div class="container grid grid-cols-3 gap-20 p-5">
      <div class="relative col-span-2 p-5 bg-white">
        <div class="absolute top-0 py-2 font-medium text-white uppercase bg-red-500 rounded-b px-7 text-md deal">{{$t('dealOfTheDay')}}</div>
        <div v-for="(product, idx) in store.timerSpecialOffers" :key="idx" class="flex items-center justify-center h-full p-3 space-x-5">
          <div class="w-36">
            <router-link to="/product" @click="showProduct(product?.product?.id)">
              <img :src="API_URL + '/image/' + (product?.product?.imageUrl[0] ? product?.product?.imageUrl[0] : '')" class="img-responsive" alt="product image">
            </router-link>
          </div>
          <div>
            <router-link to="/product" @click="showProduct(product?.product?.id)" class="text-gray-900 text-md" target="_self">
              {{ product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name }}
            </router-link>
            <div class="flex items-center py-2">
              <Rating :rating="product?.product?.rating" />
            </div>
            <div class="flex items-center">
              <div v-if="!product?.discount" class="mb-2 mr-3 text-lg font-semibold text-red-500">
                €{{ product?.product?.price }}
              </div>
              <div v-else class="flex items-center justify-center">
                <div class="mb-2 mr-3 text-lg font-semibold text-red-500">
                  €{{ (product?.product?.price - product?.product?.price * (product?.discount?.discountPercent / 100)) }}
                </div>
                <div class="mb-2 text-gray-500 line-through text-md">€{{ product?.product?.price }}</div>
              </div>
            </div>
            <div class="text-sm text-gray-500" v-html="product?.productGroup?.productGroup?.description"></div>
            <Countdown class="float-left" :flipAnimation="false" />
            <div class="clear-both"></div>
          </div>
        </div>
      </div>
      <div>
        <img src="https://flowbite.com/docs/images/blog/image-1.jpg" class="img-responsive" alt="image1">
      </div>
    </div>
  </div>
</template>

<style scoped>
.deal {
  margin: -9px 40px 0;
  z-index: 2;
}

.deal:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: auto;
  left: -22px;
  right: auto;
  border-bottom: 0 solid transparent;
  border-top: 9px solid transparent;
  border-right: 10px solid #c60009;
  border-left: 12px solid transparent;
}

.deal:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: auto;
  left: auto;
  right: -22px;
  border-bottom: 0 solid transparent;
  border-top: 9px solid transparent;
  border-left: 10px solid #c60009;
  border-right: 12px solid transparent;
}
</style>