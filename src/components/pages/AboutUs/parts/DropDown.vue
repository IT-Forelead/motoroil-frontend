<script setup>
import {ref, toRefs } from 'vue'
import $ from 'jquery'
import { onClickOutside } from '@vueuse/core';
import { useAboutUsStore } from '../../../../stores/aboutUs.js';
import TrashIcon from '../../../../assets/icons/TrashIcon.vue';
import DotsThreeVerticalFillIcon from '../../../../assets/icons/DotsThreeVerticalFillIcon.vue';
import PencilDuotoneIcon from '../../../../assets/icons/PencilDuotoneIcon.vue';

const aboutUsStore = useAboutUsStore()

const props = defineProps({
    id: String
})

const { id } = toRefs(props)

const drop = ref(null)

const toggle = () => {
    $(`#${id.value}`).toggle('fast')
}

onClickOutside(drop, () => $(`#${id.value}`).hide('fast'))

</script>

<template>
<div class="relative" ref="drop">
    <div clas="cursor-pointer" @click="toggle()">
        <div class="absolute top-0 z-10 font-normal text-center text-gray-900 rounded cursor-pointer hover:bg-gray-100 right-1">
            <DotsThreeVerticalFillIcon class="w-5 h-5"/>
        </div>
    </div>
    <ul :id="id" class="absolute z-10 hidden w-32 py-1 text-sm text-gray-700 bg-white rounded shadow right-1 top-9">
        <li class="flex items-center px-4 py-2 capitalize cursor-pointer hover:bg-gray-100">
            <PencilDuotoneIcon class="w-5 h-5 mr-2"/>
            <span>Edit</span>
        </li>
        <li @click="aboutUsStore.deleteInformation(id)" class="flex items-center px-4 py-2 capitalize cursor-pointer hover:bg-gray-100">
            <TrashIcon class="w-5 h-5 mr-2"/>
            <span>Delete</span>
        </li>
    </ul>
</div>
</template>

<style scoped>
</style>