<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue'
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue'
import TrashIcon from '../../../assets/icons/TrashIcon.vue'
import MinusIcon from '../../../assets/icons/MinusIcon.vue'
import PlusIcon from '../../../assets/icons/PlusIcon.vue'
import StackIcon from '../../../assets/icons/StackIcon.vue'
import GiftIcon from '../../../assets/icons/GiftIcon.vue'
import Sidebar from '../../layout/Sidebar/Sidebar.vue'
import { useUserStore } from '../../../stores/user.js'
import { useModalStore } from '../../../stores/modal.js'
import { uuid } from 'vue-uuid';
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { onMounted, reactive, ref, watch } from '@vue/runtime-core'
import CloseIcon from '../../../assets/icons/CloseIcon.vue'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

const userStore = useUserStore()
const modalStore = useModalStore()

const selectedCouponId = ref('')
const selectedUserAddressId = ref('')
const couponMinPrice = ref('')
const orderData = ref([])

const addressForm = reactive({
  userId: uuid.v4(),
  receiverFullName: '',
  receiverPhone: '',
  countryId: '',
  regionId: '',
  cityId: '',
  street: '',
  postalCode: ''
})

onMounted(() => {
  userStore.getCart()
  userStore.getCoupons()
  userStore.getUserAddresses()
  userStore.getCountries()
})

const addUserAddress = () => {
  userStore.addUserAddress(addressForm)
  modalStore.closeAddAddressModal()
  addressForm.userId = ''
  addressForm.receiverFullName = ''
  addressForm.receiverPhone = ''
  addressForm.countryId = ''
  addressForm.regionId = ''
  addressForm.cityId = ''
  addressForm.street = ''
  addressForm.postalCode = ''
}

const submitOrderData = () => {
  if (selectedUserAddressId.value === ''){
    notify.error({
			message: 'Please, select address!',
			position: 'bottomRight'
		})
  } else {
    userStore.buy(selectedCouponId.value, orderData.value)
  }
}

const plusMinus = (id, productCount, quantity, action) => {
  if (action === '-') {
    if (quantity > 1) userStore.changeCartItemsQuantityMinus(id)
  } else {
    if (quantity < productCount) userStore.changeCartItemsQuantityPlus(id)
  }
}

watch(
  () => userStore.cart,
  () => {
    orderData.value = userStore.cart?.map((i) => {
      return {
        cartItemId: i?.id,
        productId: i?.productId,
        cartId: i?.id,
        userAddressId: selectedUserAddressId,
        quantity: i?.quantity,
        totalPrice: userStore.cartSum
      }
    })
  },
  { deep: true }
)

watch(
  () => addressForm.countryId,
  () => {
    userStore.getRegions(addressForm.countryId).then(() => {
      selectedCouponId.value = ''
      selectedUserAddressId.value = ''
      couponMinPrice.value = ''
      orderData.value = []
    })
  },
  { deep: true }
)

watch(
  () => addressForm.regionId,
  () => {
    userStore.getCities(addressForm.regionId)
  },
  { deep: true }
)

watch(
  () => selectedCouponId,
  () => {
    couponMinPrice.value = userStore.coupons.filter(
      (c) => c.id === selectedCouponId.value
    )[0]?.minPrice
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
          <li class="text-gray-700">{{ $t('cart') }}</li>
        </ul>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Sidebar />
        <div class="col-span-3 ml-3">
          <div class="p-3 mb-2 text-2xl font-semibold text-gray-700">
            {{ $t('myCart') }}
          </div>
          <div class="space-y-5 overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-3 text-sm font-medium text-left text-gray-700 uppercase">
                    {{ $t('product') }}
                  </th>
                  <th scope="col" class="px-3 py-3 text-sm font-medium text-center text-gray-700 uppercase">
                    {{ $t('price') }}
                  </th>
                  <th scope="col" class="px-3 py-3 text-sm font-medium text-center text-gray-700 uppercase">
                    {{ $t('quantity') }}
                  </th>
                  <th scope="col" class="px-3 py-3 text-sm font-medium text-center text-gray-700 uppercase">
                    {{ $t('actions') }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(product, idx) in userStore.cart" :key="idx" class="align-middle">
                  <td class="p-3 text-sm text-gray-700">
                    <div class="flex items-center space-x-2">
                      <div>
                        <img :src="
                          product?.productImageUrl[0]
                            ? `${API_URL}/image/${product?.productImageUrl[0]}`
                            : ''
                        " class="w-full h-12" alt="Product image" />
                      </div>
                      <div>
                        <div class="font-medium text-gray-700 text-md">
                          {{ product?.productName }}
                        </div>
                        <div class="flex items-center text-sm text-gray-500">
                          <StackIcon class="mr-1" />
                          {{ product?.productCategoryName }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3 text-sm font-medium text-center text-gray-700">
                    €{{ product?.productPrice }}
                  </td>
                  <td class="p-3">
                    <div class="grid items-center w-1/2 grid-cols-3 gap-1 px-1.5 py-1 mx-auto rounded-full shadow">
                      <button @click="
                        plusMinus(
                          product?.id,
                          product?.productCount,
                          product?.quantity,
                          '-'
                        )
                      " class="flex justify-center text-gray-700 rounded-l hover:text-red-500">
                        <MinusIcon class="w-4 h-4" />
                      </button>
                      <div class="text-lg font-normal text-center">
                        {{ product?.quantity }}
                      </div>
                      <button @click="
                        plusMinus(
                          product?.id,
                          product?.productCount,
                          product?.quantity,
                          '+'
                        )
                      " class="flex justify-center text-gray-700 rounded-r hover:text-red-500">
                        <PlusIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td class="p-3">
                    <button @click="userStore.deleteCartItem(product?.id)"
                      class="flex items-center justify-center p-2 mx-auto text-white bg-red-500 rounded hover:bg-red-700">
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="grid grid-cols-2 gap-7">
              <div>
                <div
                  class="flex items-center justify-between py-3.5 font-normal text-gray-700 uppercase bg-gray-50 rounded-full pl-7 pr-4 text-md">
                  {{ $t('selectAddress') }}
                  <button @click="modalStore.openAddAddressModal()" type="submit"
                    class="flex items-center px-3 py-2 text-sm text-white bg-red-500 rounded-full hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                    <PlusIcon class="w-5 h-5 mr-1" />
                    {{ $t('addAddress') }}
                  </button>
                </div>
                <div class="p-3 text-gray-800">
                  {{ $t('selectTheAddressRecipient') }}
                </div>
                <ul class="divide-y">
                  <li v-for="(address, idx) in userStore.addresses" :key="idx"
                    class="flex items-center px-3 py-2 space-x-3">
                    <input v-model="selectedUserAddressId" :value="address?.id" :id="address?.id" name="push-notifications" type="radio"
                      class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                    <label :for="address?.id" class="block ml-3 text-sm font-medium text-gray-700">
                      <div class="font-normal text-md">
                        {{ address?.receiverFullName }},
                        {{ address?.receiverPhone }}
                      </div>
                      <div class="font-normal text-md">
                        {{ address?.postalCode }}, {{ address?.street }}
                      </div>
                      <div class="font-normal text-md">
                        {{ address?.city }}, {{ address?.region }},
                        {{ address?.country }}
                      </div>
                    </label>
                  </li>
                </ul>
                <div class="py-5 font-normal text-gray-700 uppercase rounded-full px-7 text-md bg-gray-50">
                  {{ $t('couponCode') }}
                </div>
                <div class="p-3 text-gray-800">
                  {{ $t('toUseThisCoupon') + ' €' + couponMinPrice }}
                </div>
                <div class="relative">
                  <select v-model="selectedCouponId"
                    class="block w-full px-5 py-3 text-gray-900 border border-gray-300 rounded-full text-md bg-gray-50 focus:ring-red-500 focus:border-red-500">
                    <option value="" selected>{{ $t('chooseACoupon') }}</option>
                    <option v-for="(coupon, idx) in userStore.coupons" :key="idx" :value="coupon?.id">
                      {{ coupon?.code }}
                    </option>
                  </select>
                  <button type="submit"
                    class="absolute flex items-center px-4 py-2 text-sm font-medium text-white -translate-y-1/2 bg-red-500 rounded-full right-2 top-1/2 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                    <GiftIcon class="w-5 h-5 mr-1" />
                    <p>{{ $t('applyCoupon') }}</p>
                  </button>
                </div>
              </div>
              <div>
                <div class="py-5 font-normal text-gray-700 uppercase rounded-full bg-gray-50 px-7 text-md">
                  {{ $t('orderSummary') }}
                </div>
                <div class="p-3 text-gray-800">
                  {{ $t('shippingAndAdditionalCosts') }}
                </div>
                <ul class="px-5 my-3 divide-y">
                  <li class="flex items-center justify-between py-3 font-medium">
                    <span class="text-gray-600">{{ $t('orderSubtotal') }}</span>
                    <span class="text-gray-900">€{{ userStore.cartSum }}</span>
                  </li>
                  <li class="flex items-center justify-between py-3 font-medium">
                    <span class="text-gray-700">{{
                    $t('shippingAndHandling')
                    }}</span>
                    <span class="text-gray-900">€0</span>
                  </li>
                  <li class="flex items-center justify-between py-3 font-medium">
                    <span class="text-gray-700">{{ $t('taxi') }}</span>
                    <span class="text-gray-900">€0</span>
                  </li>
                  <li class="flex items-center justify-between py-3 font-medium">
                    <span class="text-gray-600">{{ $t('total') }}</span>
                    <span class="text-gray-900">€{{ userStore.cartSum }}</span>
                  </li>
                </ul>
                <button @click="submitOrderData()"
                  class="w-1/2 py-2 mx-3 text-lg text-white bg-red-500 rounded-full hover:bg-red-700">
                  {{ $t('buy') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Add Address Modal -->
  <div :class="{ hidden: !modalStore.isOpenAddAddressModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
    <div class="relative w-full h-full max-w-2xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('addAddress') }}</h3>
          <button type="button" @click="modalStore.closeAddAddressModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal">
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-2">
          <div class="flex flex-col space-y-5">
            <label for="receiver-fullname">
              <p class="pb-2 font-medium text-slate-700">{{ $t('receiverFullname') }}</p>
              <input type="text" v-model="addressForm.receiverFullName" id="receiver-fullname"
                class="block w-full px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter your fullname" />
            </label>
            <label for="receiver-phone">
              <p class="pb-2 font-medium text-slate-700">{{ $t('receiverPhone') }}</p>
              <input type="text" v-model="addressForm.receiverPhone" id="receiver-phone"
                class="block w-full px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter your phone" />
            </label>
            <label for="country">
              <p class="pb-2 font-medium text-slate-700">{{ $t('country') }}</p>
              <select v-model="addressForm.countryId" id="country"
                class="block w-full p-2 px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-red-500 focus:border-red-500">
                <option value="" selected>{{ $t('chooseACountry') }}</option>
                <option v-for="(country, idx) in userStore.countries" :key="idx" :value="country?.id">{{ country?.name
                }}</option>
              </select>
            </label>
            <label for="region" v-if="userStore.regions.length > 0">
              <p class="pb-2 font-medium text-slate-700">{{ $t('region') }}</p>
              <select v-model="addressForm.regionId" id="region"
                class="block w-full p-2 px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-red-500 focus:border-red-500">
                <option value="" selected>{{ $t('chooseARegion') }}</option>
                <option v-for="(region, idx) in userStore.regions" :key="idx" :value="region?.id">{{ region?.name }}
                </option>
              </select>
            </label>
            <label for="city" v-if="userStore.cities.length > 0">
              <p class="pb-2 font-medium text-slate-700">{{ $t('city') }}</p>
              <select v-model="addressForm.cityId" id="city"
                class="block w-full p-2 px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-red-500 focus:border-red-500">
                <option value="" selected>{{ $t('chooseACity') }}</option>
                <option v-for="(city, idx) in userStore.cities" :key="idx" :value="city?.id">{{ city?.name }}</option>
              </select>
            </label>
            <label for="street">
              <p class="pb-2 font-medium text-slate-700">{{ $t('street') }}</p>
              <input type="text" v-model="addressForm.street" id="street"
                class="block w-full px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter your your street" />
            </label>
            <label for="postal-code">
              <p class="pb-2 font-medium text-slate-700">{{ $t('zipPostalCode') }}</p>
              <input type="text" v-model="addressForm.postalCode" id="postal-code"
                class="block w-full px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Enter your postal code" />
            </label>
            <button @click="addUserAddress()"
              class="inline-flex items-center justify-center w-full py-3 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
              {{ $t('save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
