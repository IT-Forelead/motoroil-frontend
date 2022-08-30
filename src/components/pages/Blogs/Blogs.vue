
<script setup>
import BlogItem from './parts/BlogItem.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import { useBlogStore } from '../../../stores/blog.js'
import { onMounted } from '@vue/runtime-core';
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue';

const store = useBlogStore()

onMounted(() => {
    store.getAllBlogs()
})
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
                    <li class="flex items-center">
                        <a href="/blogs" class="text-red-600">Our Blog</a>
                    </li>
                </ul>
            </div>
            <div class="grid grid-cols-4 gap-3">
                <Sidebar />
                <div class="col-span-3 ml-3">
                    <div class="p-3 text-2xl font-semibold text-gray-700">Our Blog</div>
                    <div class="grid grid-cols-4 gap-7">
                        <BlogItem v-for="(blog, idx) in store.blogs" :key="idx" :blog="blog" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>