<script setup>
import TrashIcon from '../assets/icons/TrashIcon.vue';
import DotsThreeVerticalFillIcon from '../assets/icons/DotsThreeVerticalFillIcon.vue';
import {ref, toRefs } from 'vue'
import $ from 'jquery'
import { onClickOutside } from '@vueuse/core';
import { useUserStore } from '../stores/user.js';

const userStore = useUserStore()

const props = defineProps({
    options: Object,
    productId: String,
    wishlistId: String
})

const { options, productId, wishlistId } = toRefs(props)

const drop = ref(null)

const toggle = () => {
    $(`#${wishlistId.value}`).toggle('fast')
}

onClickOutside(drop, () => $(`#${wishlistId.value}`).hide('fast'))

</script>

<template>
    <div class="relative" ref="drop">
        <div clas="cursor-pointer" @click="toggle()">
            <div class="absolute z-10 p-1 font-normal text-center text-gray-900 rounded cursor-pointer hover:bg-gray-100 top-2 right-1">
                <DotsThreeVerticalFillIcon class="w-5 h-5"/>
            </div>
        </div>
        <ul v-for="(option, idx) in options" :key="idx"  :id="wishlistId" class="absolute z-10 hidden w-32 py-1 text-sm text-gray-700 bg-white rounded shadow right-1 top-9">
            <li @click="userStore.deleteWishlist({
                wishlistId: wishlistId,
                productId: productId
                })" class="flex items-center px-4 py-2 capitalize cursor-pointer hover:bg-gray-100">
                <TrashIcon class="w-5 h-5 mr-2"/>
                {{ option }}
            </li>
        </ul>
</div>
</template>

<style scoped>
</style>