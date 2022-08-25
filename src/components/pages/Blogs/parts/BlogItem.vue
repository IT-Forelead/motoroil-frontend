<script setup>
import { toRefs } from 'vue'
import { useBlogStore } from '../../../../stores/blog.js'
import { formatDateTime } from '../../../../mixins/utils.js'
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useBlogStore()

const props = defineProps({
    blog: Object
})
const { blog } = toRefs(props)

const readMore = (id) => {
    store.getSingleBlog(id)
    sessionStorage.removeItem('sb_id')
    sessionStorage.setItem('sb_id', id)
}
</script>
<template>
    <div class="max-w-sm">
        <router-link to="/blog" @click="readMore(blog.id)">
            <img :src="API_URL + '/image/' + blog.imageUrl" alt="#" class="object-cover object-center" />
        </router-link>
        <div class="py-3">
            <div class="flex items-center justify-between mb-2 text-xs text-gray-400">
                <div>{{ formatDateTime(blog.createdAt) }}</div>
                <div>Post by {{ blog.userName }}</div>
            </div>
            <router-link to="/blog" @click="readMore(blog.id)">
                <h5 class="mb-2 font-semibold text-gray-900 text-md">{{ blog.title }}</h5>
            </router-link>
            <p class="mb-3 font-normal text-gray-700" v-html="blog.text"></p>
            <router-link to="/blog" @click="readMore(blog.id)"
                class="px-5 py-2 text-sm text-center text-white uppercase bg-gray-900 rounded hover:bg-red-500 focus:ring-0">
                Read More</router-link>
        </div>
    </div>
</template>