<script setup>
import HeartFillIcon from '../../../../assets/icons/HeartFillIcon.vue';
import ShoppingCartFillIcon from '../../../../assets/icons/ShoppingCartFillIcon.vue';
import SearchIcon from '../../../../assets/icons/SearchIcon.vue';
import { ref } from '@vue/reactivity';
import { useProductStore } from '../../../../stores/product.js';
import { useAuthStore } from '../../../../stores/auth.js';
import { useModalStore } from '../../../../stores/modal.js';
import { useUserStore } from '../../../../stores/user.js';

const store = useProductStore()
const authStore = useAuthStore()
const modalStore = useModalStore()
const userStore = useUserStore()

const search = ref('')

const searchProducts = () => {
  store.setSearchString(search.value)
  store.getProductsSearchByName(search.value)
}
</script>

<template>
  <div class="flex justify-center h-20 p-2 bg-white md:mb-5">
    <div class="flex items-center justify-center gap-3 md:container md:grid md:grid-cols-4">
      <div class="relative hidden h-24 overflow-hidden md:block">
        <router-link to="/"><img src="/logo.png" alt="Motoroil" class="absolute w-auto h-24 -translate-y-1/2 top-1/2" /></router-link>
      </div>
      <div class="md:col-span-2">
        <div class="flex items-center rounded bg-white lg:w-[30rem]">
          <input type="search" v-model="search"
            class="w-full px-4 text-gray-900 bg-transparent border border-gray-300 rounded-l outline-none focus:outline-none"
            :placeholder="$t('search...')" />
          <router-link to="/products" @click="searchProducts()" class="px-4 py-2 text-white bg-red-500 rounded-r">
            <SearchIcon class="w-6 h-6" />
          </router-link>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <router-link to="/wishlist" v-if="authStore.user?.role === 'user'" class="flex items-center justify-center p-3 text-gray-700 border rounded hover:text-red-500">
          <HeartFillIcon />
        </router-link>
        <button v-else-if="authStore.user?.role === 'admin'" class="hidden"></button>
        <button @click="modalStore.openModal()" v-else class="flex items-center justify-center p-3 text-gray-700 border rounded hover:text-red-500">
          <HeartFillIcon />
        </button>
        <router-link to="/cart" v-if="authStore.user?.role === 'user'" class="inline-flex items-center text-gray-700 border rounded hover:text-red-500">
          <div class="relative flex items-center justify-center p-2">
            <ShoppingCartFillIcon />
            <div class="absolute -top-3 -right-2 px-1.5 py-0.5 text-xs text-white bg-red-500 rounded-full">{{ userStore.cart.length }}</div>
          </div>
          <div class="items-center justify-center hidden px-4 py-2 border-l md:flex">
            {{ $t('myCart') }}:
            <span class="ml-1 font-medium text-red-500">€{{ userStore.cartSum }}</span>
          </div>
        </router-link>
        <button v-else-if="authStore.user?.role === 'admin'" class="hidden"></button>
        <button v-else @click="modalStore.openModal()" class="inline-flex items-center text-gray-700 border rounded hover:text-red-500">
          <div class="relative flex items-center justify-center p-3 md:p-2">
            <ShoppingCartFillIcon />
          </div>
          <div class="items-center justify-center hidden px-4 py-2 border-l md:flex">
            {{ $t('myCart') }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>