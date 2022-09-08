<script setup>
import ListIcon from '../../../../assets/icons/ListIcon.vue';
import HouseIcon from '../../../../assets/icons/HouseIcon.vue';
import AppsIcon from '../../../../assets/icons/AppsIcon.vue';
import BlogsIcon from '../../../../assets/icons/BlogsIcon.vue';
import CaretRightIcon from '../../../../assets/icons/CaretRightIcon.vue';
import OrderIcon from '../../../../assets/icons/OrderIcon.vue';
import MenuIcon from '../../../../assets/icons/MenuIcon.vue';
import { onMounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../../../stores/auth.js';
import { useProductStore } from '../../../../stores/product.js';
import { useMainSearchStore } from '../../../../stores/mainSearch.js';

const authStore = useAuthStore()
const productStore = useProductStore()
const mainSearchStore = useMainSearchStore()

const router = useRouter()
const isOpenMainDropDown = ref(false)
const isOpenAdminMenus = ref(false)
const dropdown = ref(null)
const menus = ref(null)

const toggleDropDown = () => {
  isOpenMainDropDown.value = !isOpenMainDropDown.value
}
const toggleAdminMenus = () => {
  isOpenAdminMenus.value = !isOpenAdminMenus.value
}

onClickOutside(dropdown, () => isOpenMainDropDown.value = false)
onClickOutside(menus, () => isOpenAdminMenus.value = false)

onMounted(() => {
  productStore.getBrands()
})

</script>

<template>
  <div class="md:flex justify-center px-5 pt-5 bg-white border-b-2 border-red-500 hidden">
    <div class="container grid items-center grid-cols-4 gap-x-3">
      <div class="relative">
        <button @click="toggleDropDown()"
          class="flex items-center justify-between w-full px-5 py-2 uppercase border-0 from-gray-50 via-gray-100 to-gray-300 bg-gradient-to-t rounded-t-md text-md hover:from-red-200 hover:via-red-400 hover:to-red-600">
          {{ $t('allCategories') }}
          <ListIcon class="mr-1" />
        </button>
        <div v-if="productStore.brands.length > 0" :class="{ 'hidden': !isOpenMainDropDown }" ref="dropdown"
          class="absolute left-0 z-10 w-full px-4 py-2 bg-white border border-t-0 border-gray-100 rounded-b-lg shadow top-10">
          <ul class="divide-y divide-gray-300">
            <li v-for="(brand, idx) in productStore.brands" :key="idx"
              class="flex justify-between p-2 text-gray-700 cursor-pointer text-md hover:text-red-500">
              <div>{{  brand?.name  }}</div>
              <CaretRightIcon />
            </li>
          </ul>
        </div>
      </div>
      <ul class="flex items-center col-span-3 space-x-1">
        <li
          class="px-4 py-2 m-0 font-medium uppercase cursor-pointer text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/' }" 
          @click="router.push('/'); mainSearchStore.clearMainSearchResults()">
          {{ $t('homePage') }}
        </li>
        <li
          class="px-4 py-2 font-medium uppercase cursor-pointer text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/products' || $router.currentRoute.value.path === '/product' }"
          @click="router.push('/products'); productStore.setSearchString(''); productStore.getAllProducts()">
          {{ $t('products') }}
        </li>
        <li
          class="px-4 py-2 font-medium uppercase cursor-pointer text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/blogs' || $router.currentRoute.value.path === '/blog' }"
          @click="router.push('/blogs')">
          {{ $t('blogs') }}
        </li>
        <li v-if="authStore?.user?.role === 'user'" class="px-4 py-2 font-medium uppercase cursor-pointer text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/orders' || $router.currentRoute.value.path === '/orders' }"
          @click="router.push('/orders')">
          {{ $t('orders') }}
        </li>
        <li v-if="authStore?.user?.role === 'admin'"
          class="relative px-4 py-2 font-medium uppercase cursor-pointer text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/store' || $router.currentRoute.value.path === '/admin/orders' || $router.currentRoute.value.path === '/admin/discount' || $router.currentRoute.value.path === '/admin/accounting' || $router.currentRoute.value.path === '/admin/product-models' || $router.currentRoute.value.path === '/admin/spec-type' || $router.currentRoute.value.path === '/admin/product-groups'}"
          @click="toggleAdminMenus()">
          {{ $t('adminAccess') }}
          <div :class="{ 'hidden': !isOpenAdminMenus }" ref="menus"
            class="absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded shadow top-12 w-44">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-400">
              <li>
                <router-link to="/admin/store"
                  :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/store' }"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('store') }}
                </router-link>
              </li>
              <li>
                <router-link to="/admin/product-groups" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/product-groups'}"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('productGroups')}}</router-link>
              </li>
              <li>
                <router-link to="/admin/orders" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/orders'}"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('orders') }}</router-link>
              </li>
              <li>
                <router-link to="/admin/discount" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/discount'}"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('discounts') }}</router-link>
              </li>
              <li>
                <router-link to="/admin/coupon" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/coupon'}"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">Coupons</router-link>
              </li>
              <li>
                <router-link to="/admin/accounting" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/accounting'}"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('accounting') }}</router-link>
              </li>
              <li>
                <router-link to="/admin/product-models" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/product-models'}"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('productModels') }}</router-link>
              </li>
              <li>
                <router-link to="/admin/spec-type" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/spec-types'}"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('specTypes') }}</router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
<!-- Mobile Navbar -->
  <div class="flex justify-center bg-gray-900 w-full p-2 border-t-2 border-red-500 fixed z-30 bottom-0 md:hidden">
    <div class="flex justify-center w-full container items-center text-white">
      <ul class="grid items-center grid-cols-3 justify-center gap-4" :class="{'grid-cols-4':authStore.user}">
        <li
          class="p-2 m-0 font-medium uppercase cursor-pointer text-md rounded-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/' }"
          @click="router.push('/'); mainSearchStore.clearMainSearchResults()">
          <HouseIcon class="w-8 h-8 mx-auto"/>
        </li>
        <li
          class="p-2 m-0 font-medium uppercase cursor-pointer text-md rounded-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/products' || $router.currentRoute.value.path === '/product' }"
          @click="router.push('/products'); productStore.setSearchString(''); productStore.getAllProducts()">
          <AppsIcon class="w-8 h-8 mx-auto"/>
        </li>
        <li
          class="p-2 m-0 font-medium uppercase cursor-pointer text-md rounded-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/blogs' || $router.currentRoute.value.path === '/blog' }"
          @click="router.push('/blogs')">
          <BlogsIcon class="w-9 h-9 mx-auto"/>
        </li>
        <li v-if="authStore?.user?.role === 'user'"
            class="p-2 m-0 font-medium uppercase cursor-pointer text-md rounded-md hover:bg-red-500 hover:text-white"
            :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/orders' || $router.currentRoute.value.path === '/orders' }"
            @click="router.push('/orders')">
           <OrderIcon class="w-9 h-9 mx-auto"/>
        </li>
        <li v-if="authStore?.user?.role === 'admin'"
            class="relative p-2 m-0 font-medium uppercase cursor-pointer text-md rounded-md hover:bg-red-500 hover:text-white"
            :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/store' || $router.currentRoute.value.path === '/admin/orders' || $router.currentRoute.value.path === '/admin/discount' || $router.currentRoute.value.path === '/admin/accounting' || $router.currentRoute.value.path === '/admin/product-models' || $router.currentRoute.value.path === '/admin/spec-type' || $router.currentRoute.value.path === '/admin/product-groups'}"
            @click="toggleAdminMenus()">
          <MenuIcon class="w-9 h-9 mx-auto"/>

          <div :class="{ 'hidden': !isOpenAdminMenus }" ref="menus"
               class="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded bottom-16 shadow w-44">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-400">
              <li>
                <router-link to="/admin/store"
                             :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/store' }"
                             class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('store') }}
                </router-link>
              </li>
              <li>
                <router-link to="/admin/product-groups" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/product-groups'}"
                             class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('productGroups')}}</router-link>
              </li>
              <li>
                <router-link to="/admin/orders" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/orders'}"
                             class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('orders') }}</router-link>
              </li>
              <li>
                <router-link to="/admin/discount" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/discount'}"
                             class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('discounts') }}</router-link>
              </li>
              <li>
                <router-link to="/admin/coupon" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/coupon'}"
                             class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">Coupons</router-link>
              </li>
              <li>
                <router-link to="/admin/accounting" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/accounting'}"
                             class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('accounting') }}</router-link>
              </li>
              <li>
                <router-link to="/admin/product-models" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/product-models'}"
                             class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('productModels') }}</router-link>
              </li>
              <li>
                <router-link to="/admin/spec-type" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/spec-types'}"
                             class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t('specTypes') }}</router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
</style>