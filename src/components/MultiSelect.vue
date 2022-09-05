<script setup>
import { reactive, ref, toRefs } from 'vue'
import StarFillIcon from '../assets/icons/StarFillIcon.vue';
import OutlineCircleIcon from '../assets/icons/OutlineCircleIcon.vue';
import CheckCircleOutlineIcon from '../assets/icons/CheckCircleOutlineIcon.vue';
import $ from 'jquery'
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
    options: Object
})

const { options } = toRefs(props)

const multiselect = ref(null)

const toggleMultiSelect = () => {
    $('#multiselect').slideToggle('fast')
}
onClickOutside(multiselect, () => $('#multiselect').slideUp('fast'))

const ms = reactive({
    ids: []
})
const addSelectedOEMids = (id) => {
    ms.ids.push(id)
}
</script>

<template>
    <div class="relative" ref="multiselect">
        <p class="w-full p-2 text-center text-white bg-red-500 rounded cursor-pointer" @click="toggleMultiSelect()">
            Select</p>
        <div class="absolute hidden w-full p-3 mt-1 overflow-y-auto bg-white border divide-y rounded shadow h-60"
            id="multiselect">
            <div v-for="(option, idx) in options" :key="idx" @click="addSelectedOEMids(option.id)"
                class="flex items-center justify-start p-1 py-2 rounded cursor-pointer hover:bg-slate-100">
                <OutlineCircleIcon class="w-5 h-5 mr-1" v-if="!ms.ids.includes(option.id)" />
                <CheckCircleOutlineIcon v-else class="w-5 h-5 mr-1 text-green-500" />{{ option?.name }}
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>