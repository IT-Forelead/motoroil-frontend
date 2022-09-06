<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue'
import OutlineCircleIcon from '../assets/icons/OutlineCircleIcon.vue';
import CheckCircleOutlineIcon from '../assets/icons/CheckCircleOutlineIcon.vue';
import $ from 'jquery'
import { onClickOutside } from '@vueuse/core';
import { useProductStore } from '../stores/product.js';
import { filter } from 'dom7';

const store = useProductStore()

const props = defineProps({
    id: String,
    discountId: String
})

const { id, discountId } = toRefs(props)

const multiselect = ref(null)

const toggleMultiSelect = () => {
    $(`#${id.value}`).slideToggle('fast')
}
onClickOutside(multiselect, () => $(`#${id.value}`).slideUp('fast'))

const addDiscountToProduct = (selectedid) => {
    store.setSelectedProductId(selectedid)
}

onMounted(() => {
    store.getAllProducts()
})
</script>

<template>
    <div class="relative" ref="multiselect">
        <p class="w-full p-2 text-center border border-red-500 rounded cursor-pointer" @click="toggleMultiSelect()">Select</p>
        <div class="absolute z-10 hidden w-full p-3 mt-1 overflow-y-auto bg-white border divide-y rounded shadow max-h-60" :id="id">
            <div v-for="(product, idx) in id === 'addDiscount' ? store.products.filter(p => p?.product?.discountId !== discountId) : store.products.filter(p => p?.product?.discountId === discountId)" :key="idx" @click="addDiscountToProduct(product?.product?.id)">
                <div class="flex items-center justify-start p-1 py-2 rounded cursor-pointer hover:bg-slate-100">
                    <OutlineCircleIcon class="w-5 h-5 mr-1" v-if="!store.multiselectProductIds.includes(product?.product?.id)" />
                    <CheckCircleOutlineIcon v-else class="w-5 h-5 mr-1 text-green-500" />
                    {{ product?.productGroup?.productGroup?.name + ' / ' + product?.specType?.name + ': ' + product?.specTypeValue?.value }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>