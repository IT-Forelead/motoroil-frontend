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
        <div class="w-full h-[200px] relative overflow-hidden">
            <router-link to="/blog" @click="readMore(blog.id)" class="absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <img :src="API_URL + '/image/' + blog.imageUrl" alt="#"/>
            </router-link>
        </div>
        <div class="py-3">
            <div class="flex items-center justify-between mb-2 text-xs text-gray-400">
                <div>{{ formatDateTime(blog.createdAt) }}</div>
                <div>{{ $t('author') }} {{ blog.userName }}</div>
            </div>
            <router-link to="/blog" @click="readMore(blog.id)">
                <h5 class="h-12 mb-2 overflow-hidden font-semibold text-gray-900 text-md">{{ blog.title }}</h5>
            </router-link>
            <p class="h-24 mb-3 overflow-hidden font-normal text-gray-700" v-html="blog.text"></p>
          <router-link to="/blog" @click="readMore(blog.id)"
                       class="px-5 py-2 text-sm text-center text-white uppercase bg-gray-900 rounded hover:bg-red-500 focus:ring-0">
            {{ $t('readMore') }}
          </router-link>
        </div>
    </div>
</template>