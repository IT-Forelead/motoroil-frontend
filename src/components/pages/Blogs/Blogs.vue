<script setup>
import BlogItem from './parts/BlogItem.vue'
import Sidebar from '../../layout/Sidebar/Sidebar.vue'
import { useBlogStore } from '../../../stores/blog.js'
import { onMounted, ref } from '@vue/runtime-core'
import HouseIcon from '../../../assets/icons/HouseIcon.vue'
import CaretRightIcon from '../../../assets/icons/CaretRightIcon.vue'
import { useAuthStore } from '../../../stores/auth.js'
import { useModalStore } from '../../../stores/modal.js'
import { useAnalyticsStore } from '../../../stores/analytics.js'
import CloseIcon from '../../../assets/icons/CloseIcon.vue'
import $ from 'jquery'

const store = useBlogStore()
const authStore = useAuthStore()
const analyticsStore = useAnalyticsStore()

const blogTitle = ref('')
const blogImage = ref('')

onMounted(() => {
  store.getAllBlogs()

let eventData = {}
if (authStore.userId) {
  eventData = {
    name: 'pageVisited',
    visitorId:
      localStorage.getItem('visitorId') || analyticsStore.visitorId,
    userId: authStore.userId,
    page: 'blogs',
  }
} else {
  eventData = {
    name: 'pageVisited',
    visitorId:
      localStorage.getItem('visitorId') || analyticsStore.visitorId,
    page: 'blogs',
  }
}
analyticsStore.saveEvent(eventData)
})

function getImage(e) {
  if (e?.target?.files[0].type.includes('image')) {
    blogImage.value = e?.target?.files[0]
  }
}

const submitBlogData = () => {
  const formData = new FormData()
  formData.append('blogTitle', blogTitle.value)
  formData.append('blogText', $('#blog-text .ql-editor').html())
  formData.append('blogImage', blogImage.value)
  store.createBlog(formData)
}
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
            <a href="/blogs" class="text-red-600">{{ $t('ourBlog') }}</a>
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Sidebar />
        <div class="col-span-3 ml-3">
          <div class="flex items-center justify-between">
            <div class="p-3 text-2xl font-semibold text-gray-700">
              {{ $t('ourBlog') }}
            </div>
            <button
              v-if="useAuthStore().user?.role === 'admin'"
              @click="useModalStore().openAddBlogModal()"
              class="px-3 py-2 text-white bg-red-500 rounded shadow"
            >
              {{ $t('addBlog') }}
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            <BlogItem
              v-for="(blog, idx) in store.blogs"
              :key="idx"
              :blog="blog"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Add Blog Modal -->
  <div
    :class="{ hidden: !useModalStore().isOpenAddBlogModal }"
    class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full backdrop-blur bg-gray-900/50"
  >
    <div
      class="relative w-full h-full max-w-3xl p-4 -translate-x-1/2 -translate-y-1/2 md:h-auto top-1/2 left-1/2"
    >
      <div class="relative bg-white rounded shadow dark:bg-gray-700">
        <div
          class="flex items-start justify-between px-6 py-3 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{$t('addBlog')}}
          </h3>
          <button
            type="button"
            @click="useModalStore().closeAddBlogModal()"
            class="inline-flex items-center p-1 ml-auto text-sm text-gray-400 bg-transparent rounded hover:bg-gray-200 hover:text-gray-900"
            data-modal-toggle="defaultModal"
          >
            <CloseIcon />
            <span class="sr-only">{{ $t('closeModal') }}</span>
          </button>
        </div>
        <div class="px-6 py-3 space-y-6">
          <form class="my-3">
            <div class="flex flex-col space-y-5">
              <label for="blog-title">
                <p class="pb-2 font-medium text-slate-700">{{ $t('blogTitle') }}</p>
                <input
                  id="blog-title"
                  type="text"
                  v-model="blogTitle"
                  class="w-full px-3 py-3 border rounded border-slate-200 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter blog title"
                />
              </label>
              <label for="blog-text">
                <p class="mt-2 font-medium text-slate-700">{{ $t('blogContent') }}</p>
                <QuillEditor theme="snow" id="blog-text" />
              </label>
              <label for="blog-text">
                <p class="mt-2 font-medium text-slate-700">{{ $t('blogImage') }}</p>
                <input
                  type="file"
                  class="w-full px-3 py-3"
                  @change="getImage"
                />
              </label>
              <button
                @click.prevent="submitBlogData()"
                class="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-red-500 border-red-500 rounded hover:bg-red-400 hover:shadow"
              >
                <span>{{$t('addBlog')}}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
