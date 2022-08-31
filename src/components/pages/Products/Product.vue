<script setup>
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import UserFillIcon from '../../../assets/icons/UserFillIcon.vue';
import CalendarFillIcon from '../../../assets/icons/CalendarFillIcon.vue';
import StarFillIcon from '../../../assets/icons/StarFillIcon.vue';
import OilerIcon from '../../../assets/icons/OilerIcon.vue';
import MinusIcon from '../../../assets/icons/MinusIcon.vue';
import PlusIcon from '../../../assets/icons/PlusIcon.vue';
import ShoppingCartFillIcon from '../../../assets/icons/ShoppingCartFillIcon.vue';
import PdfFileIcon from '../../../assets/icons/PdfFileIcon.vue';
import CheckCircleFillIcon from '../../../assets/icons/CheckCircleFillIcon.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { useProductStore } from '../../../stores/product.js'
import { useModalStore } from '../../../stores/modal.js'
import { useUserStore } from '../../../stores/user.js';
import { useAuthStore } from '../../../stores/auth.js';
import { formatDateTime } from '../../../mixins/utils.js';
import { Swiper, SwiperSlide } from "swiper/vue";
import UserIcon from '../../../assets/icons/UserIcon.vue';
import Rating from '../../Rating.vue';
import { uuid } from 'vue-uuid';
import $ from 'jquery';
import HeartFillIcon from '../../../assets/icons/HeartFillIcon.vue';
import router from '../../../router';
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useProductStore()
const authStore = useAuthStore()
const modalStore = useModalStore()
const userStore = useUserStore()

const selectedImage = ref('')
const currentRating = ref(5)

const showProduct = (id) => {
  store.getSingleProduct(id)
  router.go('/product')
  sessionStorage.removeItem('sp_id')
  sessionStorage.setItem('sp_id', id)
}

onMounted(() => {
  store.getSingleProduct(sessionStorage.getItem('sp_id'))
  store.getCommentsByProductId(sessionStorage.getItem('sp_id'))
  store.getOemsAndSpecsByProductId(sessionStorage.getItem('sp_id'))
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

const setImageFull = (img) => selectedImage.value = img

const isActiveDesc = ref(true)
const isActiveRew = ref(false)

const likeFunction = () => {
  if (authStore.user) {
    userStore.addWishlist(
      {
        userId: uuid.v4(),
        productId: sessionStorage.getItem('sp_id')
      }
    )
  } else {
    modalStore.openModal()
  }
}

const comment = reactive({
  userId: uuid.v4(),
  productId: sessionStorage.getItem('sp_id'),
  message: '',
  rating: 5
})

const changeActiveTab = (tab) => {
  if (tab === 'desc') {
    isActiveDesc.value = true
    isActiveRew.value = false
  }
  else {
    isActiveRew.value = true
    isActiveDesc.value = false
  }
}

const addComment = () => {
  store.createComment(comment)
  comment.message = ''
  comment.rating = 5
}
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
          <li class="flex items-center">
            <a href="/products" class="text-gray-700">Products</a>
            <CaretRightIcon class="mx-3 text-gray-500" />
          </li>
          <li class="text-gray-700">{{ store.singleProduct?.productGroup?.name + ' ' +
              store.singleProduct?.viscosityGrade?.name
          }}</li>
        </ul>
      </div>
      <div class="grid grid-cols-4 gap-3">
        <Sidebar />
        <div class="col-span-3 px-3">
          <div class="grid grid-cols-2 gap-7">
            <div>
              <div class="relative h-[300px] overflow-hidden">
                <div v-if="store.singleProduct?.discount" class="absolute top-5 left-5">
                  <div class="relative z-10 flex items-center justify-center w-10 h-10 font-semibold bg-yellow-300 discount">
                    <span class="text-xl">-{{ store.singleProduct?.discount?.discountPercent }}</span>
                    <span class="text-xs">%</span>
                  </div>
                </div>
                <img v-if="store.singleProduct?.product?.imageUrl[0]"
                  class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  :src="selectedImage ? `${API_URL}/image/${selectedImage}` : `${API_URL}/image/${store.singleProduct?.product?.imageUrl[0]}`"
                  alt="Product image">
                <img v-else class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  :src="store.singleProduct?.product?.imageUrl[0] ? `${API_URL}/image/${store.singleProduct?.product?.imageUrl[0]}` : ''"
                  alt="Product image">
              </div>
              <swiper :slidesPerView="4" :spaceBetween="20" :pagination="{ clickable: true }"
                :scrollbar="{ hide: true }" class="mt-5 mySwiper" style="height: 75px;">
                <swiper-slide v-for="(image, idx) in store.singleProduct?.product?.imageUrl" :key="idx"
                  @click="setImageFull(image)" class="relative border cursor-pointer"
                  :class="{ 'border-red-500': image === selectedImage }">
                  <img :src="`${API_URL}/image/${image}`" alt="Product Image">
                </swiper-slide>
              </swiper>
            </div>
            <div class="divide-y">
              <div class="py-3 text-2xl font-semibold text-gray-700">
                {{ store.singleProduct?.productGroup?.name + ' ' + store.singleProduct?.viscosityGrade?.name }}
              </div>
              <div class="py-3">
                <Rating :rating="store.singleProduct?.product?.rating" />
                <div class="flex items-center">
                  <div v-if="!store.singleProduct?.discount" class="mb-2 mr-3 text-lg font-semibold text-red-500">€
                    {{ store.singleProduct?.product?.price }}</div>
                  <div v-else class="flex items-center justify-center">
                    <div class="mb-2 mr-3 text-lg font-semibold text-red-500">€ {{ (store.singleProduct?.product?.price -
                        store.singleProduct?.product?.price * (store.singleProduct?.discount?.discountPercent / 100))
                    }}</div>
                    <div class="mb-2 text-gray-500 line-through text-md">€ {{ store.singleProduct?.product?.price }}</div>
                  </div>
                </div>
                <div v-if="store.singleProduct?.product?.quantity !== 0"
                  class="flex items-center justify-center w-24 px-2 py-1 text-xs text-green-500 bg-green-100 rounded-full">
                  <CheckCircleFillIcon class="mr-1" /> in stock
                </div>
              </div>
              <div class="py-3">
                <ul class="flex flex-col p-2 space-y-1 border-l-4 border-red-500">
                  <li class="flex items-center space-x-2">
                    <span class="font-medium text-gray-700 text-md">{{ store.singleProduct?.specType?.name }}:</span>
                    <span class="font-normal text-gray-700 text-md">{{ store.singleProduct?.specTypeValue?.value }}</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <span class="font-medium text-gray-700 text-md">Viscosity Grade:</span>
                    <span class="font-normal text-gray-700 text-md">{{ store.singleProduct?.viscosityGrade?.name
                    }}</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <span class="font-medium text-gray-700 text-md">Brand:</span>
                    <span class="font-normal text-gray-700 text-md">{{ store.singleProduct?.brand?.name }}</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <span class="font-medium text-gray-700 text-md">OEM-Freigabe:</span>
                    <span class="font-normal text-gray-700 text-md">{{ store.oemsAndSpecsByProductId?.oems?.map(o =>
                        o.name).join(', ')
                    }}</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <span class="font-medium text-gray-700 text-md">Spectification:</span>
                    <span class="font-normal text-gray-700 text-md">{{
                        store.oemsAndSpecsByProductId?.specifications?.map(o => o.name).join(', ')
                    }}</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <span class="font-medium text-gray-700 text-md">View:</span>
                    <span class="font-normal text-gray-700 text-md">{{ store.singleProduct?.product?.views }}</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <span class="font-medium text-gray-700 text-md">Likes:</span>
                    <span class="font-normal text-gray-700 text-md">{{ store.singleProduct?.product?.likes }}</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <span class="font-medium text-gray-700 text-md">Orders:</span>
                    <span class="font-normal text-gray-700 text-md">{{ store.singleProduct?.product?.orders }}</span>
                  </li>
                </ul>
              </div>
              <div class="py-3">
                <div class="space-y-2 w-72">
                  <div class="flex items-center px-3 py-1.5 space-x-3 border border-gray-300">
                    <input id="lll" name="push-notifications" type="radio"
                      class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" checked>
                    <OilerIcon class="w-5 h-5" />
                    <label for="lll" class="block ml-3 text-sm font-medium text-gray-700">
                      <div class="font-medium text-md">{{ store.singleProduct?.specType?.name + ': ' + store.singleProduct?.specTypeValue?.value }}</div>
                      <div class="text-sm font-normal">
                        <div v-if="!store.singleProduct?.discount" class="text-red-500">
                          € {{ store.singleProduct?.product?.price }}
                        </div>
                        <div v-else class="flex items-center justify-center">
                          <div class="mr-2 text-red-500">
                            € {{ (store.singleProduct?.product?.price - store.singleProduct?.product?.price * (store.singleProduct?.discount?.discountPercent / 100)) }}
                          </div>
                          <div class="text-gray-500 line-through text-md">€ {{ store.singleProduct?.product?.price }}</div>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div class="flex items-center border border-gray-300 divide-x divide-gray-300">
                    <button class="flex justify-center w-1/4 p-3 text-gray-700 rounded-l hover:text-red-500">
                      <MinusIcon />
                    </button>
                    <div class="w-2/4 px-4 py-2 text-lg font-normal text-center">
                      0
                    </div>
                    <button class="flex justify-center w-1/4 p-3 text-gray-700 rounded-r hover:text-red-500">
                      <PlusIcon />
                    </button>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button @click="likeFunction()" class="flex items-center justify-center p-3.5 text-white bg-red-500 hover:bg-red-700">
                      <HeartFillIcon class="w-5 h-5" />
                    </button>
                    <button class="flex items-center justify-center w-full p-3 text-white bg-red-500 hover:bg-red-700">
                      <ShoppingCartFillIcon class="mr-2" />
                      Add to cart
                    </button>
                  </div>
                  <div v-for="(product, idx) in store.productsByGroupId.filter(p => p?.product?.id !== store.singleProduct?.product?.id)" :key="idx" class="flex items-center px-3 py-1 space-x-3 border border-gray-300">
                    <input @click="showProduct(product?.product?.id)" :id="`cp-${product?.product?.id}`" name="push-notifications" type="radio"
                      class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <OilerIcon class="w-5 h-5" />
                    <label @click="showProduct(product?.product?.id)" :for="`cp-${product?.product?.id}`" class="block ml-3 text-sm font-medium text-gray-700">
                      <div class="font-medium text-md">
                        {{ product?.specType?.name + ': ' + product?.specTypeValue?.value }}
                      </div>
                      <div class="text-sm font-normal">
                        <div v-if="!product?.discount" class="text-red-500">
                          € {{ product?.product?.price }}
                        </div>
                        <div v-else class="flex items-center justify-center">
                          <div class="mr-2 text-red-500">
                            € {{ (product?.product?.price - product?.product?.price * (product?.discount?.discountPercent / 100)) }}
                          </div>
                          <div class="text-gray-500 line-through text-md">€ {{ product?.product?.price }}</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div class="py-3 space-y-2">
                <div class="flex items-center space-x-2">
                  <span class="font-normal text-gray-700 text-md">Category:</span>
                  <span class="font-medium text-gray-700 text-md">Automotive</span>
                </div>
                <div class="flex items-center space-x-3">
                  <a :href="`${API_URL}/image/${store.singleProduct?.productGroup?.pdfUrl}`" download
                    class="flex items-center justify-center px-5 py-2 text-blue-500 bg-white border border-blue-500 rounded hover:bg-gray-100">
                    <PdfFileIcon class="mr-1" />
                    Download PDF
                  </a>
                  <button
                    class="flex items-center justify-center px-5 py-2 text-red-500 bg-white border border-red-500 rounded hover:bg-gray-100">
                    <PdfFileIcon class="mr-1" />
                    Upload PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5">
            <ul class="flex items-center space-x-3 border-b border-red-500">
              <li class="px-5 py-2 text-gray-700 cursor-pointer hover:text-red-700"
                :class="{ 'text-red-700 border border-b-0 border-red-500 rounded-t': isActiveDesc }"
                @click="changeActiveTab('desc')">Description</li>
              <li class="px-3 py-2 text-gray-700 cursor-pointer hover:text-red-700"
                :class="{ 'text-red-700 border border-b-0 border-red-500 rounded-t': isActiveRew }"
                @click="changeActiveTab('rew')">Reviews</li>
            </ul>
            <div id="tab-contents" class="px-1 py-3">
              <div id="desc" class="text-gray-700" v-if="isActiveDesc"
                v-html="store.singleProduct?.productGroup?.description"></div>
              <div id="review" class="space-y-2" v-else>
                <div class="pb-3 mb-3 border-b">
                  <div class="max-w-2xl space-y-1">
                    <label for="message" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-400">Write a
                      review</label>
                    <textarea id="message" rows="4" v-model="comment.message"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your review..."></textarea>
                    <div class="flex items-center space-x-2">
                      <span class="text-sm text-gray-500">Rating:</span>
                      <ul class="flex items-center py-2">
                        <li v-for="i in 5" :key="i" @click="comment.rating = i; currentRating = comment.rating" class="cursor-pointer">
                          <StarFillIcon :class="i <= currentRating ? 'text-yellow-300' : 'text-gray-300'" />
                        </li>
                      </ul>
                    </div>
                    <button @click="addComment()"
                      class="block items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-500 rounded focus:ring-4 focus:ring-red-200 hover:bg-red-700">
                      Comment
                    </button>
                  </div>
                </div>
                <div v-for="(comment, idx) in store.comments" :key="idx" class="flex items-start px-4 py-3 border rounded">
                  <div class="flex items-center justify-center w-12 h-12 mr-4 bg-red-500 rounded-full shadow">
                    <UserIcon class="w-8 h-8 text-white" />
                  </div>
                  <div class="w-full">
                    <div class="flex items-center justify-between">
                      <h2 class="-mt-1 text-lg font-semibold text-gray-900">{{ comment?.userName }}</h2>
                      <Rating :rating="comment?.comment?.rating" class="py-2" />
                    </div>
                    <p class="text-sm text-gray-500">{{ formatDateTime(comment?.comment?.createdAt) }}</p>
                    <p class="mt-3 text-sm text-gray-700" v-text="comment?.comment?.message"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .discount:before {
      transform: rotate(30deg);
  }
  .discount:after {
      transform: rotate(60deg);
  }
  .discount:before, .discount:after {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      background: rgb(255, 217, 0);
  }
</style>