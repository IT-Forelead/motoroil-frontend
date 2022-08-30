<script setup>
import ListIcon from '../../../../assets/icons/ListIcon.vue';
import CaretRightIcon from '../../../../assets/icons/CaretRightIcon.vue';
import { onMounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router';
import { useBrandStore } from '../../../../stores/brand.js';
import { useAuthStore } from '../../../../stores/auth.js';

const store = useBrandStore()
const authStore = useAuthStore()

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
  store.getAllBrands()
  if (authStore.isLogin) {
    authStore.getUser()
  }
})

</script>

<template>
  <div class="flex justify-center px-5 pt-5 bg-white border-b-2 border-red-500">
    <div class="container grid items-center grid-cols-4 gap-x-3">
      <div class="relative">
        <button @click="toggleDropDown()"
          class="flex items-center justify-between w-full px-5 py-2 uppercase border-0 from-gray-50 via-gray-100 to-gray-300 bg-gradient-to-t rounded-t-md text-md hover:from-red-200 hover:via-red-400 hover:to-red-600">
          ALL CATEGORIES
          <ListIcon class="mr-1" />
        </button>
        <div v-if="store.brands.length > 0" :class="{ 'hidden': !isOpenMainDropDown }" ref="dropdown"
          class="absolute left-0 z-10 w-full px-4 py-2 bg-white border border-t-0 border-gray-100 rounded-b-lg shadow top-10">
          <ul class="divide-y divide-gray-300">
            <li v-for="(brand, idx) in store.brands" :key="idx"
              class="flex justify-between p-2 text-gray-700 cursor-pointer text-md hover:text-red-500">
              <div>{{ brand?.name }}</div>
              <CaretRightIcon />
            </li>
          </ul>
        </div>
      </div>
      <ul class="flex items-center col-span-3 space-x-1">
        <li
          class="px-4 py-2 m-0 font-medium uppercase cursor-pointer text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/' }" @click="router.push('/')">
          Home
        </li>
        <li
          class="px-4 py-2 font-medium uppercase cursor-pointer text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/products' || $router.currentRoute.value.path === '/product' }"
          @click="router.push('/products')">
          Products
        </li>
        <li
          class="px-4 py-2 font-medium uppercase cursor-pointer text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/blogs' || $router.currentRoute.value.path === '/blog' }"
          @click="router.push('/blogs')">
          Blogs
        </li>
        <li v-if="authStore?.user?.role === 'admin'"
          class="relative px-4 py-2 font-medium uppercase cursor-pointer text-md rounded-t-md hover:bg-red-500 hover:text-white"
          :class="{ 'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/store' || $router.currentRoute.value.path === '/admin/orders' || $router.currentRoute.value.path === '/admin/discount' }"
          @click="toggleAdminMenus()">
          Admin Access
          <div :class="{ 'hidden': !isOpenAdminMenus }" ref="menus"
            class="absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded shadow top-12 w-44">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-400">
              <li>
                <router-link to="/admin/store" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/store'}"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">Store</router-link>
              </li>
              <li>
                <router-link to="/admin/orders" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/orders'}"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">Orders</router-link>
              </li>
              <li>
                <router-link to="/admin/discount" :class="{'bg-red-500 text-white': $router.currentRoute.value.path === '/admin/discount'}"
                  class="block px-4 py-2 capitalize hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white">Discount</router-link>
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