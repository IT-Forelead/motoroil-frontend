<script setup>
import HouseIcon from '../../../assets/icons/HouseIcon.vue';
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import TrashIcon from '../../../assets/icons/TrashIcon.vue';
import PencilDuotoneIcon from '../../../assets/icons/PencilDuotoneIcon.vue';
import MapPinIcon from '../../../assets/icons/MapPinIcon.vue';
import { useUserStore } from '../../../stores/user.js';
import { useModalStore } from '../../../stores/modal.js';
import { onMounted, reactive, watch } from '@vue/runtime-core';
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { uuid } from 'vue-uuid';
import CloseIcon from '../../../assets/icons/CloseIcon.vue';

const userStore = useUserStore()
const modalStore = useModalStore()

const address = reactive({
  userId: uuid.v4(),
  receiverFullName: '',
  receiverPhone: '',
  countryId: '',
  regionId: '',
  cityId: '',
  street: '',
  postalCode: ''
})

const editAddress = reactive({
  id: '',
  userId: '',
  receiverFullName: '',
  receiverPhone: '',
  countryId: '',
  regionId: '',
  cityId: '',
  street: '',
  postalCode: ''
})

watch(
  () => userStore.singleAddress,
  () => {
    editAddress.id = userStore.getAddressId
    editAddress.userId = userStore.getAddressUserId
    editAddress.receiverFullName = userStore.getAddressReceiverFullName
    editAddress.receiverPhone = userStore.getAddressReceiverPhone
    editAddress.countryId = userStore.getAddressCountryId
    editAddress.regionId = userStore.getAddressRegionId
    editAddress.cityId = userStore.getAddressCityId
    editAddress.street = userStore.getAddressStreet
    editAddress.postalCode = userStore.getAddressPostalCode
  },
  { deep: true }
)

onMounted(() => {
  userStore.getUserAddresses()
  userStore.getCountries()
})

const addUserAddress = () => {
  if (address.receiverFullName === ''){
    notify.error({              
			message: 'Please, enter receiver\'s fullname!',
			position: 'bottomRight'
		})
  } else if(address.receiverPhone === '') {
    notify.error({              
			message: 'Please, enter receiver\'s phone!',
			position: 'bottomRight'
		})
  } else if(address.countryId === '') {
    notify.error({              
			message: 'Please, select a country!',
			position: 'bottomRight'
		})
  } else if(address.regionId === '') {
    notify.error({              
			message: 'Please, select a region!',
			position: 'bottomRight'
		})
  } else if(address.cityId === '') {
    notify.error({              
			message: 'Please, select a city!',
			position: 'bottomRight'
		})
  } else if(address.street === '') {
    notify.error({              
			message: 'Please, enter street!',
			position: 'bottomRight'
		})
  } else if(address.postalCode === '') {
    notify.error({              
			message: 'Please, enter postal code!',
			position: 'bottomRight'
		})
  } else {
    userStore.addUserAddress(address).then(() => {
      address.receiverFullName = ''
      address.receiverPhone = ''
      address.countryId = ''
      address.regionId = ''
      address.cityId = ''
      address.street = ''
      address.postalCode = ''
    })
  }
}

const editUserAddress = () => {
  if (editAddress.receiverFullName === ''){
    notify.error({              
			message: 'Please, enter receiver\'s fullname!',
			position: 'bottomRight'
		})
  } else if(editAddress.receiverPhone === '') {
    notify.error({              
			message: 'Please, enter receiver\'s phone!',
			position: 'bottomRight'
		})
  } else if(editAddress.countryId === '') {
    notify.error({              
			message: 'Please, select a country!',
			position: 'bottomRight'
		})
  } else if(editAddress.regionId === '') {
    notify.error({              
			message: 'Please, select a region!',
			position: 'bottomRight'
		})
  } else if(editAddress.cityId === '') {
    notify.error({              
			message: 'Please, select a city!',
			position: 'bottomRight'
		})
  } else if(editAddress.street === '') {
    notify.error({              
			message: 'Please, enter street!',
			position: 'bottomRight'
		})
  } else if(editAddress.postalCode === '') {
    notify.error({              
			message: 'Please, enter postal code!',
			position: 'bottomRight'
		})
  } else {
    userStore.editUserAddress(editAddress).then(() => {
      editAddress.id = ''
      editAddress.userId = ''
      editAddress.receiverFullName = ''
      editAddress.receiverPhone = ''
      editAddress.countryId = ''
      editAddress.regionId = ''
      editAddress.cityId = ''
      editAddress.street = ''
      editAddress.postalCode = ''
    })
  }
}

watch(
  () => address.countryId,
  () => {
    userStore.getRegions(address.countryId)
  },
  { deep: true }
)

watch(
  () => address.regionId,
  () => {
    userStore.getCities(address.regionId)
  },
  { deep: true }
)

watch(
  () => editAddress.countryId,
  () => {
    userStore.getRegions(editAddress.countryId)
  },
  { deep: true }
)

watch(
  () => editAddress.regionId,
  () => {
    userStore.getCities(editAddress.regionId)
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
        <li class="text-gray-700">{{ $t('addresses') }}</li>
      </ul>
    </div>
    <div class="grid grid-cols-1 gap-3 md:grid-cols-4">
      <Sidebar />
      <div class="col-span-3">
        <div class="grid grid-cols-3 gap-3">
          <div class="col-span-2 ml-3">
            <div class="grid grid-cols-2 gap-3">
              <div v-for="(address, idx) in userStore.addresses" :key="idx" class="p-3 space-y-3 bg-white rounded shadow">
                <div class="flex items-center justify-between pb-2 text-lg font-medium text-gray-700 border-b">
                  <div class="flex items-center">
                    <MapPinIcon class="w-6 h-6 mr-2"/>
                    {{ $t('address') }}
                  </div>
                  <div class="flex items-center space-x-2">
                    <div @click="modalStore.openEditAddressModal(); userStore.getSingleUserAddress(address?.id)" class="cursor-pointer">
                      <PencilDuotoneIcon class="w-5 h-5 text-blue-700"/>
                    </div>
                    <div @click="userStore.deleteUserAddress(address?.id)" class="cursor-pointer">
                      <TrashIcon class="w-5 h-5 text-red-500"/>
                    </div>
                  </div>
                </div>
                <ul class="space-y-1">
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">{{ $t('receiver') }}:</div>
                    <div class="text-gray-800 text-md">{{ address?.receiverFullName }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">{{ $t('receiverPhone') }}:</div>
                    <div class="text-gray-800 text-md">{{ address?.receiverPhone }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">{{ $t('country') }}:</div>
                    <div class="text-gray-800 text-md">{{ address?.country }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">{{ $t('region') }}:</div>
                    <div class="text-gray-800 text-md">{{ address?.region }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">{{ $t('city') }}:</div>
                    <div class="text-gray-800 text-md">{{ address?.city }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">{{ $t('street') }}:</div>
                    <div class="text-gray-800 text-md">{{ address?.street }}</div>
                  </li>
                  <li class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">{{ $t('postalCode') }}:</div>
                    <div class="text-gray-800 text-md">{{ address?.postalCode }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="p-3 space-y-3 bg-white rounded shadow">
            <div class="pb-2 font-medium text-gray-700 border-b text-md">{{ $t('addAddress') }}</div>
            <div class="space-y-1">
              <label for="receiver-fullname" class="text-sm text-gray-700">{{$t('receiverFullname')}}</label>
              <input v-model="address.receiverFullName" id="receiver-fullname" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter your fullname">
            </div>
            <div class="space-y-1">
              <label for="receiver-phone" class="text-sm text-gray-700">{{ $t('receiverPhone') }}</label>
              <input v-model="address.receiverPhone" id="receiver-phone" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter your phone">
            </div>
            <div class="space-y-1">
              <label for="country" class="text-sm text-gray-700">{{ $t('country') }}</label>
              <select v-model="address.countryId" id="country" class="block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option value="" selected>{{ $t('chooseACountry') }}</option>
                <option v-for="(country, idx) in userStore.countries" :key="idx" :value="country?.id">{{ country?.name }}</option>
              </select>
            </div>
            <div class="space-y-1" v-if="userStore.regions.length > 0">
              <label for="region" class="text-sm text-gray-700">{{ $t('region') }}</label>
              <select v-model="address.regionId" id="region" class="block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option value="" selected>{{ $t('chooseARegion') }}</option>
                <option v-for="(region, idx) in userStore.regions" :key="idx" :value="region?.id">{{ region?.name }}</option>
              </select>
            </div>
            <div class="space-y-1" v-if="userStore.cities.length > 0">
              <label for="city" class="text-sm text-gray-700">{{ $t('city') }}</label>
              <select v-model="address.cityId" id="city" class="block w-full p-2 border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option value="" selected>{{ $t('chooseACity') }}</option>
                <option v-for="(city, idx) in userStore.cities" :key="idx" :value="city?.id">{{ city?.name }}</option>
              </select>
            </div>
            <div class="space-y-1">
              <label for="street" class="text-sm text-gray-700">{{ $t('street') }}</label>
              <input v-model="address.street" id="street" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter your street">
            </div>
            <div class="space-y-1">
              <label for="postal-code" class="text-sm text-gray-700">{{ $t('zipPostalCode') }}</label>
              <input v-model="address.postalCode" id="postal-code" type="text" class="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter your postal code">
            </div>
            <button @click="addUserAddress()" class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">{{ $t('save') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Edit Address Modal -->
<div :class="{ hidden: !modalStore.isOpenEditAddressModal }" class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50">
  <div class="relative w-full h-full max-w-2xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2">
    <div class="relative bg-white rounded shadow dark:bg-gray-700">
      <div class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edit address</h3>
        <button
          type="button"
          @click="modalStore.closeEditAddressModal()"
          class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
          data-modal-toggle="defaultModal">
          <CloseIcon />
          <span class="sr-only">{{ $t('closeModal') }}</span>
        </button>
      </div>
      <div class="px-6 py-2">
        <div class="flex flex-col space-y-5">
          <label for="edit-receiver-fullname">
            <p class="pb-2 font-medium text-slate-700">{{ $t('receiverFullname') }}</p>
            <input
              type="text"
              v-model="editAddress.receiverFullName"
              id="edit-receiver-fullname"
              class="block w-full px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter your fullname"
            />
          </label>
          <label for="edit-receiver-phone">
            <p class="pb-2 font-medium text-slate-700">{{ $t('receiverPhone') }}</p>
            <input
              type="text"
              v-model="editAddress.receiverPhone"
              id="edit-receiver-phone"
              class="block w-full px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter your phone"
            />
          </label>
          <label for="edit-country">
            <p class="pb-2 font-medium text-slate-700">{{ $t('country') }}</p>
            <select v-model="editAddress.countryId" id="edit-country" class="block w-full p-2 px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-red-500 focus:border-red-500">
              <option value="" selected>{{ $t('chooseACountry') }}</option>
              <option v-for="(country, idx) in userStore.countries" :key="idx" :value="country?.id">{{ country?.name }}</option>
            </select>
          </label>
          <label for="edit-region" v-if="userStore.regions.length > 0">
            <p class="pb-2 font-medium text-slate-700">{{ $t('region') }}</p>
            <select v-model="editAddress.regionId" id="edit-region" class="block w-full p-2 px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-red-500 focus:border-red-500">
              <option value="" selected>{{ $t('chooseARegion') }}</option>
              <option v-for="(region, idx) in userStore.regions" :key="idx" :value="region?.id">{{ region?.name }}</option>
            </select>
          </label>
          <label for="edit-city" v-if="userStore.cities.length > 0">
            <p class="pb-2 font-medium text-slate-700">{{ $t('city') }}</p>
            <select v-model="editAddress.cityId" id="edit-city" class="block w-full p-2 px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-red-500 focus:border-red-500">
              <option value="" selected>{{ $t('chooseACity') }}</option>
              <option v-for="(city, idx) in userStore.cities" :key="idx" :value="city?.id">{{ city?.name }}</option>
            </select>
          </label>
          <label for="edit-street">
            <p class="pb-2 font-medium text-slate-700">{{ $t('street') }}</p>
            <input
              type="text"
              v-model="editAddress.street"
              id="edit-street"
              class="block w-full px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter your your street"
            />
          </label>
          <label for="edit-postal-code">
            <p class="pb-2 font-medium text-slate-700">{{ $t('zipPostalCode') }}</p>
            <input
              type="text"
              v-model="editAddress.postalCode"
              id="edit-postal-code"
              class="block w-full px-5 py-3 mt-1 bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter your postal code"
            />
          </label>
          <button @click="editUserAddress()" class="inline-flex items-center justify-center w-full py-3 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow">
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