<script setup>
import { toRefs } from 'vue'
import StarFillIcon from '../assets/icons/StarFillIcon.vue';

const props = defineProps({
    rating: Number
})

const { rating } = toRefs(props)
</script>

<template>
<ul class="flex">
    <li v-for="r1 in 5" :key="r1">
        <StarFillIcon :class="r1 <= rating ? 'text-yellow-300' : 'text-gray-300'" />
    </li>
</ul>
</template>

<style scoped>
</style>