<script setup>
import { toRefs } from 'vue'
import { useBlogStore } from '../../../../stores/blog.js'
import { getMonthName } from '../../../../mixins/utils.js'
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
    <div class="blog-item col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <div class="clearfix blog-item-inner">
            <div class="clearfix overflow-hidden itemBlogImg h-80">
                <div class="article-image">
                    <router-link to="/blog" @click="readMore(blog.id)" class="popup-gallery">
                        <img :src="API_URL + '/image/' + blog.imageUrl" alt="#" class="object-cover object-center" />
                    </router-link>
                    <div class="article-date">
                        <div class="date">
                            <span class="article-date"><b>{{ (new Date(blog.createdAt)).getDate() }}</b> {{
                                    getMonthName(blog.createdAt)
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix itemBlogContent">
                <div class="blog-content">
                    <div class="h-24 overflow-hidden article-title font-title">
                        <h4>
                            <router-link to="/blog" @click="readMore(blog.id)">{{ blog.title }}</router-link>
                        </h4>
                    </div>
                    <div class="blog-meta">
                        <span class="author">
                            <i class="fa fa-user"></i> Post by {{ blog.userName }}
                        </span>
                    </div>
                    <p class="overflow-hidden article-description h-52" v-html="blog.text">
                    </p>
                    <div class="readmore">
                        <router-link to="/blog" @click="readMore(blog.id)" class="btn-readmore font-title"><i
                                class="fa fa-caret-right"></i>Read More</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>