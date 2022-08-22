<script setup>
import { onMounted } from 'vue';
import router from '../../../../../router';
import { useBlogStore } from '../../../../../stores/blog.js'
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
  <div class="module so-latest-blog blog-home">
    <div class="pre_text">Our recent posts</div>
    <h3 class="modtitle"><span>Latest blogs</span></h3>
    <div class="clearfix modcontent">
      <div class="so-blog-external buttom-type1 button-type1">
        <div class="blog-external yt-content-slider row">
          <div class="col-md-3" v-for="(blog, idx) in store.latestBlogs" :key="idx">
            <div class="media">
              <div class="item head-button">
                <div class="">
                  <a class="imag" href="#"><img :src="`${API_URL}/image/${blog.imageUrl}`" alt="image"
                      class="object-cover w-full duration-500 h-96" /></a>
                </div>
                <div class="media-body">
                  <div class="media-content so-block">
                    <div class="infos"><span class="media-date-added"> {{ blog.createdAt }}</span>By <span
                        class="media-author">{{ blog.userName }}</span></div>
                    <h4 class="media-heading font-title head-item">
                      <router-link to="/blog" @click="readMore(blog.id)" :title="blog.title" target="_self"
                        class="block h-16 overflow-hidden">{{ blog.title }}</router-link>
                      <div class="h-40 mt-4 overflow-hidden leading-10" v-html="blog.text"></div>
                    </h4>
                    <div class="readmore font-title" @click="readMore(blog.id)">
                      <router-link to="/blog" target="_self"><span>Read more</span></router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>