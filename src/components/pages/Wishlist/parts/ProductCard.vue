<script setup>
import { toRefs, ref, onMounted, computed } from 'vue'
import { useProductStore } from '../../../../stores/product.js'
import StarFillIcon from '../../../../assets/icons/StarFillIcon.vue';
import DotsThreeVerticalFillIcon from '../../../../assets/icons/DotsThreeVerticalFillIcon.vue';
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

const rating = ref(0)
const store = useProductStore()

const props = defineProps({
  product: Object
})
const { product } = toRefs(props)

const ratingCalc = (rate) => {
  rating.value = Number(rate)
}

const showProduct = (id) => {
  store.getSingleProduct(id)
  sessionStorage.removeItem('sp_id')
  sessionStorage.setItem('sp_id', id)
}
</script>
<template>
  <div class="relative max-w-sm border border-gray-200">
    <div class="absolute font-normal text-center text-white top-4 sale">-10%</div>
    <div class="absolute z-10 p-1 font-normal text-center uppercase hover:text-red-700 right-1 top-3">
      <DotsThreeVerticalFillIcon class="w-5 h-5"/>
    </div>
    <div class="relative h-[200px] border-b">
      <router-link to="/product" @click="showProduct(product?.product?.id)" class="absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <img :src="API_URL + '/image/' + (product?.product?.imageUrl[0] ? product?.product?.imageUrl[0] : '')" alt="product image">
      </router-link>
    </div>
    <div class="p-5 py-3 text-center">
      <router-link to="/product" class="text-gray-900 text-md" @click="showProduct(product?.product?.id)"
        :title="product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name"
        target="_self">
        {{ product?.productGroup?.productGroup?.name + ' ' + product?.productGroup?.viscosityGrade?.name }}
      </router-link>
      <div>{{ ratingCalc(product?.product?.rating) }}</div>
      <div class="flex items-center justify-center py-2">
        <ul class="flex">
          <li v-for="r1 in rating" :key="r1">
            <StarFillIcon class="text-yellow-300" />
          </li>
          <li v-for="r2 in (5 - rating)" :key="r2">
            <StarFillIcon class="text-gray-300" />
          </li>
        </ul>
      </div>
      <div class="flex items-center justify-center">
        <div class="mb-2 mr-3 text-lg font-semibold text-red-500">
          € {{ product?.product?.price.toLocaleString('en-US') + '.00' }}
        </div>
        <!-- <div class="mb-2 text-gray-500 line-through text-md">$50.00</div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>