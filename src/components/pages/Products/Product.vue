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
import { computed, onMounted, ref } from 'vue';
import { useProductStore } from '../../../stores/product.js'
import { formatDateTime } from '../../../mixins/utils.js';
import { Swiper, SwiperSlide } from "swiper/vue";
import UserIcon from '../../../assets/icons/UserIcon.vue';
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useProductStore()

const rating = ref(0)
const selectedImage = ref('')

function ratingCalc(rate) {
  if (rate) {
    rating.value = Number(rate);
  }
}

onMounted(() => {
  store.getSingleProduct(sessionStorage.getItem('sp_id'))
  store.getOemsAndSpecsByProductId(sessionStorage.getItem('sp_id'))
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

const setImageFull = (img) => selectedImage.value = img

const isActiveDesc = ref(true)
const isActiveRew = ref(false)

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
      <div class="grid grid-cols-4 gap-10">
        <Sidebar />
        <div class="col-span-3 px-3">
          <div class="grid grid-cols-2 gap-7">
            <div>
              <div class="relative h-[300px]">
                <img class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  :src="selectedImage ? `${API_URL}/image/${selectedImage}` : `${API_URL}/image/${store.singleProduct?.product?.imageUrl[0]}`"
                  title="Chicken swinesha" alt="Chicken swinesha">
              </div>
              <swiper :slidesPerView="4" :spaceBetween="20" :pagination="{ clickable: true }"
                :scrollbar="{ hide: true }" class="mt-5 mySwiper" style="height: 75px;">
                <swiper-slide v-for="(image, idx) in store.singleProduct?.product?.imageUrl" :key="idx"
                  @click="setImageFull(image)" class="relative border cursor-pointer"
                  :class="{ 'border-red-500': image === selectedImage }">
                  <img :src="`${API_URL}/image/${image}`" alt="Product Image"
                    class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                </swiper-slide>
              </swiper>
            </div>
            <div class="divide-y">
              <div class="py-3 text-2xl font-semibold text-gray-700">{{ store.singleProduct?.productGroup?.name + ' ' +
                store.singleProduct?.viscosityGrade?.name
                }}</div>
              <div>{{ ratingCalc(store.singleProduct?.product?.rating) }}</div>
              <div class="py-3">
                <ul class="flex items-center py-2">
                  <li v-for="r1 in rating" :key="r1">
                    <StarFillIcon class="text-yellow-300" />
                  </li>
                  <li v-for="r2 in (5 - rating)" :key="r2">
                    <StarFillIcon class="text-gray-300" />
                  </li>
                </ul>
                <div class="flex items-center py-2">
                  <div class="mb-2 mr-3 text-lg font-semibold text-red-500">€ {{
                    store.singleProduct?.product?.price.toLocaleString('en-US') + '.00'
                    }}</div>
                  <!-- <div class="mb-2 text-gray-500 line-through text-md">$50.00</div> -->
                </div>
                <div v-if="store.singleProduct?.product?.quantity !== 0"
                  class="flex items-center justify-center w-24 px-2 py-1 text-xs text-green-500 bg-green-100 rounded-full">
                  <CheckCircleFillIcon class="mr-1" /> in stock
                </div>
              </div>
              <div class="py-3">
                <ul class="flex flex-col p-2 space-y-1 border-l-4 border-red-500">
                  <li class="flex items-center space-x-2">
                    <span class="font-medium text-gray-700 text-md">Capacity:</span>
                    <span class="font-normal text-gray-700 text-md">{{
                      store.singleProduct?.product?.specTypeValue?.value
                      }}</span>
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
                  <div class="flex items-center p-3 space-x-3 border border-gray-300">
                    <input id="push-nothing" name="push-notifications" type="radio"
                      class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <OilerIcon class="w-5 h-5" />
                    <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                      <div class="font-medium text-md">Capacity (L): 2</div>
                      <div class="text-sm font-normal">$123.00</div>
                    </label>
                  </div>
                  <div class="flex items-center border border-gray-300 divide-x divide-gray-300">
                    <button class="flex justify-center w-1/4 p-3 text-gray-700 rounded-l hover:text-red-500">
                      <MinusIcon />
                    </button>
                    <div class="w-2/4 px-4 py-2 text-lg font-normal text-center">
                      123
                    </div>
                    <button class="flex justify-center w-1/4 p-3 text-gray-700 rounded-r hover:text-red-500">
                      <PlusIcon />
                    </button>
                  </div>
                  <button class="flex items-center justify-center w-full p-3 text-white bg-red-500 hover:bg-red-700">
                    <ShoppingCartFillIcon class="mr-2" />
                    Add to cart
                  </button>
                  <div v-for="i in 3" :key="i" class="flex items-center px-3 py-2 space-x-3 border border-gray-300">
                    <input id="push-nothing" name="push-notifications" type="radio"
                      class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500">
                    <OilerIcon class="w-5 h-5" />
                    <label for="push-nothing" class="block ml-3 text-sm font-medium text-gray-700">
                      <div class="font-medium text-md">Capacity (L): 2</div>
                      <div class="text-sm font-normal">$123.00</div>
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
                  <button
                    class="flex items-center justify-center px-5 py-2 text-blue-500 bg-white border border-blue-500 rounded hover:bg-gray-100">
                    <PdfFileIcon class="mr-1" />
                    Download PDF
                  </button>
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
              <li class="px-5 py-2 text-red-700 border border-b-0 border-red-500 rounded-t cursor-pointer">Description</li>
              <li class="px-3 py-2 text-gray-700 rounded-t cursor-pointer hover:text-red-700">Reviews</li>
            </ul>
            <div id="tab-contents" class="px-1 py-3">
              <div id="first" class="hidden text-gray-700 ">
                The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed specifically for the creative professional, this display provides more space for easier access to all the tools and palettes needed to edit, format and composite your work. Combine this display with a Mac Pro, MacBook Pro, or PowerMac G5 and there's no limit to what you can achieve.
                <br><br>
                The Cinema HD features an active-matrix liquid crystal display that produces flicker-free images that deliver twice the brightness, twice the sharpness and twice the contrast ratio of a typical CRT display. Unlike other flat panels, it's designed with a pure digital interface to deliver distortion-free images that never need adjusting. With over 4 million digital pixels, the display is uniquely suited for scientific and technical applications such as visualizing molecular structures or analyzing geological data.
                <br><br>
                Offering accurate, brilliant color performance, the Cinema HD delivers up to 16.7 million colors across a wide gamut allowing you to see subtle nuances between colors from soft pastels to rich jewel tones. A wide viewing angle ensures uniform color from edge to edge. Apple's ColorSync technology allows you to create custom profiles to maintain consistent color onscreen and in print. The result: You can confidently use this display in all your color-critical applications.
                <br><br>
                Housed in a new aluminum design, the display has a very thin bezel that enhances visual accuracy. Each display features two FireWire 400 ports and two USB 2.0 ports, making attachment of desktop peripherals, such as iSight, iPod, digital and still cameras, hard drives, printers and scanners, even more accessible and convenient. Taking advantage of the much thinner and lighter footprint of an LCD, the new displays support the VESA (Video Electronics Standards Association) mounting interface standard. Customers with the optional Cinema Display VESA Mount Adapter kit gain the flexibility to mount their display in locations most appropriate for their work environment.
                <br><br>
                30-inch (viewable) active-matrix liquid crystal display provides breathtaking image quality and vivid, richly saturated color.
                Support for 2560-by-1600 pixel resolution for display of high definition still and video imagery.
                Wide-format design for simultaneous display of two full pages of text and graphics.
                Industry standard DVI connector for direct attachment to Mac- and Windows-based desktops and notebooks
                Incredibly wide (170 degree) horizontal and vertical viewing angle for maximum visibility and color performance.
                Lightning-fast pixel response for full-motion digital video playback.
                Support for 16.7 million saturated colors, for use in all graphics-intensive applications.
                Simple setup and operation
              </div>
              <div id="second" class="space-y-2">
                <div class="pb-3 mb-3 border-b">
                  <div class="max-w-2xl space-y-1">
                    <label for="message" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-400">Write a review</label>
                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Your review..."></textarea>
                    <div class="flex items-center space-x-2">
                      <span class="text-sm text-gray-500">Rating:</span>
                      <ul class="flex items-center py-2">
                        <li v-for="r1 in rating" :key="r1">
                          <StarFillIcon class="text-yellow-300" />
                        </li>
                        <li v-for="r2 in (5 - rating)" :key="r2">
                          <StarFillIcon class="text-gray-300" />
                        </li>
                      </ul>
                    </div>
                    <button type="submit" class="block items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-500 rounded focus:ring-4 focus:ring-red-200 hover:bg-red-700">
                      Comment
                    </button>
                  </div>
                </div>
                <div class="flex items-start px-4 py-3 border rounded">
                  <div class="flex items-center justify-center w-12 h-12 mr-4 bg-red-500 rounded-full shadow">
                    <UserIcon class="w-8 h-8 text-white" />
                  </div>
                  <div class="w-full">
                    <div class="flex items-center justify-between">
                      <h2 class="-mt-1 text-lg font-semibold text-gray-900">Brad Adams</h2>
                      <ul class="flex items-center py-2">
                        <li v-for="r1 in rating" :key="r1">
                          <StarFillIcon class="text-yellow-300" />
                        </li>
                        <li v-for="r2 in (5 - rating)" :key="r2">
                          <StarFillIcon class="text-gray-300" />
                        </li>
                      </ul>
                    </div>
                    <p class="text-sm text-gray-500">22.08.2022 17:30</p>
                    <p class="mt-3 text-sm text-gray-700">
                      Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!
                    </p>
                  </div>
                </div>
                <div class="flex items-start px-4 py-3 border rounded">
                  <div class="flex items-center justify-center w-12 h-12 mr-4 bg-red-500 rounded-full shadow">
                    <UserIcon class="w-8 h-8 text-white" />
                  </div>
                  <div class="w-full">
                    <div class="flex items-center justify-between">
                      <h2 class="-mt-1 text-lg font-semibold text-gray-900">Brad Adams</h2>
                      <ul class="flex items-center py-2">
                        <li v-for="r1 in rating" :key="r1">
                          <StarFillIcon class="text-yellow-300" />
                        </li>
                        <li v-for="r2 in (5 - rating)" :key="r2">
                          <StarFillIcon class="text-gray-300" />
                        </li>
                      </ul>
                    </div>
                    <p class="text-sm text-gray-500">22.08.2022 17:30</p>
                    <p class="mt-3 text-sm text-gray-700">
                      Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!
                    </p>
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
</style>