<script setup>
import { onMounted } from 'vue';
import router from '../../../../../router';
import { useBlogStore } from '../../../../../stores/blog.js'
import { formatDateTime } from '../../../../../mixins/utils';
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useBlogStore()

const readMore = (id) => {
  store.getSingleBlog(id)
  sessionStorage.removeItem('sb_id')
  sessionStorage.setItem('sb_id', id)
}

onMounted(() => {
  store.getAllLatestBlogs()
})
</script>
<template>
  <div class="flex justify-center p-5 bg-white">
    <div class="container flex flex-col justify-center">
      <div class="py-5 text-center">
        <div class="space-x-2 text-red-500 uppercase text-md">{{$t('ourRecentPosts')}}</div>
        <div class="flex items-center justify-center">
          <div class="w-2 h-2 bg-red-500 rounded-full"></div>
          <div class="mx-3 text-3xl font-bold uppercase">{{$t('latestBlogs')}}</div>
          <div class="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
        <div v-for="(blog, idx) in store.latestBlogs" :key="idx" class="max-w-sm">
          <div class="w-full h-[250px] relative overflow-hidden">
            <router-link to="/blog" @click="readMore(blog.id)"
              class="absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <img :src="API_URL + '/image/' + blog.imageUrl" alt="#" />
            </router-link>
          </div>
          <div class="py-3">
            <div class="flex items-center justify-between mb-2 text-xs text-gray-400">
              <div>{{ formatDateTime(blog.createdAt) }}</div>
              <div>Post by {{ blog.userName }}</div>
            </div>
            <router-link to="/blog" @click="readMore(blog.id)">
              <h5 class="h-12 mb-2 overflow-hidden font-semibold text-gray-900 text-md">{{ blog.title }}</h5>
            </router-link>
            <p class="h-24 mb-3 overflow-hidden font-normal text-gray-700" v-html="blog.text"></p>
            <router-link to="/blog" @click="readMore(blog.id)"
              class="px-5 py-2 text-sm text-center text-white uppercase bg-gray-900 rounded hover:bg-red-500 focus:ring-0">
              {{ $t('readMore') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>