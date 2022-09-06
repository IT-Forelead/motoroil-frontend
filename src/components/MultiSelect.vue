<script setup>
import { reactive, ref, toRefs } from 'vue'
import OutlineCircleIcon from '../assets/icons/OutlineCircleIcon.vue';
import CheckCircleOutlineIcon from '../assets/icons/CheckCircleOutlineIcon.vue';
import $ from 'jquery'
import { onClickOutside } from '@vueuse/core';
import { useProductStore } from '../stores/product.js';

const store = useProductStore()

const props = defineProps({
    options: Object,
    id: String
})

const { options, id } = toRefs(props)

const multiselect = ref(null)

const toggleMultiSelect = () => {
    $(`#${id.value}`).slideToggle('fast')
}
onClickOutside(multiselect, () => $(`#${id.value}`).slideUp('fast'))

const addSelectedOEMids = (selectedid) => {
    if (id.value.includes('Oem')) {
        store.setSelectedId(selectedid)
    } else {
        store.setSelectedSpecId(selectedid)
    }
}
</script>

<template>
    <div class="relative" ref="multiselect">
        <p class="w-full p-2 text-center border border-red-500 rounded cursor-pointer" @click="toggleMultiSelect()">
            Select</p>
        <div class="absolute z-10 hidden w-full p-3 mt-1 overflow-y-auto bg-white border divide-y rounded shadow h-60"
            :id="id">
            <div v-for="(option, idx) in options" :key="idx" @click="addSelectedOEMids(option.id)">
                <div v-if="id.includes('Oem')"
                    class="flex items-center justify-start p-1 py-2 rounded cursor-pointer hover:bg-slate-100">
                    <OutlineCircleIcon class="w-5 h-5 mr-1" v-if="!store.multiselectOEMids.includes(option.id)" />
                    <CheckCircleOutlineIcon v-else class="w-5 h-5 mr-1 text-green-500" />{{ option?.name }}
                </div>
                <div v-else class="flex items-center justify-start p-1 py-2 rounded cursor-pointer hover:bg-slate-100">
                    <OutlineCircleIcon class="w-5 h-5 mr-1" v-if="!store.multiselectSpecids.includes(option.id)" />
                    <CheckCircleOutlineIcon v-else class="w-5 h-5 mr-1 text-green-500" />{{ option?.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>