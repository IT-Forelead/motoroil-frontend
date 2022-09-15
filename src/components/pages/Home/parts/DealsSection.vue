<script setup>
import Rating from '../../../Rating.vue';
import { onMounted } from '@vue/runtime-core';
import { Countdown } from 'vue3-flip-countdown'
import StarFillIcon from '../../../../assets/icons/StarFillIcon.vue';
import { useProductStore } from '../../../../stores/product.js';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper";

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useProductStore()
const modules = [Autoplay]

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
  <div class="hidden md:flex justify-center p-5 bg-gray-100 bg-[url('/bg/bg-deals-new.jpg')] bg-cover">
    <div class="container grid grid-cols-1 p-2 md:grid-cols-3 md:gap-20 md:p-5">
      <div class="relative col-span-2 p-5 bg-white">
        <div class="absolute top-0 py-2 font-medium text-white uppercase bg-red-500 rounded-b px-7 text-md deal">
          {{$t('dealOfTheDay')}}</div>
        <swiper :spaceBetween="30" :centeredSlides="true" :navigation="false" :loop="true" :modules="modules"
          :autoplay="{ delay: 5000, disableOnInteraction: false }" class="mySwiper">
          <swiper-slide v-for="(product, idx) in store.timerSpecialOffers" :key="idx" class="slide">
            <div class="block mt-4 mr-5 w-96 h-96">
              <router-link to="/product" @click="showProduct(product?.product?.id)">
                <img :src="API_URL + '/image/' + (product?.product?.imageUrl[0] ? product?.product?.imageUrl[0] : '')"
                  class="img-responsive" alt="product image">
              </router-link>
            </div>
            <div class="text-start">
              <router-link to="/product" @click="showProduct(product?.product?.id)" class="text-gray-900 text-md"
                target="_self">
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
                    €{{ (product?.product?.price - product?.product?.price * (product?.discount?.discountPercent /
                    100))}}
                  </div>
                  <div class="mb-2 text-gray-500 line-through text-md">€{{ product?.product?.price }}</div>
                </div>
              </div>
              <div class="mb-5 text-sm text-gray-500" v-html="product?.productGroup?.productGroup?.description"></div>
              <Countdown :deadlineDate="new Date(product?.discount?.expiredAt)" class="hidden float-left md:block"
                :flipAnimation="false" />
              <div class="clear-both"></div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="hidden md:block">
        <swiper :spaceBetween="30" :centeredSlides="true" :navigation="false" :loop="true" :modules="modules"
          :autoplay="{ delay: 5000, disableOnInteraction: false }" class="mySwiper">
          <swiper-slide v-for="(product, idx) in store.timerSpecialOffers" :key="idx" class="slide">
            <div>
              <router-link to="/product" @click="showProduct(product?.product?.id)">
                <img :src="API_URL + '/image/' + (product?.product?.imageUrl[0] ? product?.product?.imageUrl[0] : '')"
                  class="img-responsive" alt="product image">
              </router-link>
            </div>
          </swiper-slide>
        </swiper>
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