
<script setup>
import BlogItem from './parts/BlogItem.vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import { useBlogStore } from '../../../stores/blog.js'
import { onMounted } from '@vue/runtime-core';
const store = useBlogStore()

onMounted(() => {
    store.getAllBlogs()
})
</script>
<template>
    <div class="container main-container">
        <ul class="breadcrumb">
            <li>
                <router-link to="/"><i class="fa fa-home"></i></router-link>
            </li>
            <li>
                <router-link to="/blogs">Blogs</router-link>
            </li>
        </ul>
        <div class="row">
            <Sidebar />
            <div id="content" class="col-md-9 col-sm-8">
                <div class="blog-header">
                    <h3>Our Blog</h3>
                </div>
                <div class="clearfix blog-category">
                    <div class="blog-listitem row">
                        <BlogItem v-for="(blog, idx) in store.blogs" :key="idx" :blog="blog"/>
                    </div>
                    <div class="clearfix product-filter product-filter-bottom filters-panel">
                        <div class="row">
                            <div class="col-md-12">
                                <div></div>
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