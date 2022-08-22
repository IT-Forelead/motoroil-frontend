<script setup>
import { onMounted } from 'vue';
import Sidebar from '../../layout/Sidebar/Sidebar.vue';
import { useBlogStore } from '../../../stores/blog.js'
import { formatDateTime } from '../../../mixins/utils.js';
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE
const store = useBlogStore()

onMounted(() => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
	store.getSingleBlog(sessionStorage.getItem('sb_id'))
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
			<li><a href="#">{{ store.singleBlog.title }}</a></li>
		</ul>

		<div class="row">
			<Sidebar />

			<div id="content" class="col-md-9 col-sm-8">
				<div class="article-info">
					<div class="blog-header">
						<h3>{{ store.singleBlog.title }}</h3>
					</div>
					<div class="article-sub-title">
						<span class="article-author">Post by: <a href="#"> {{ store.singleBlog.userName }}</a></span>
						<span class="article-date">Created Date: {{ formatDateTime(store.singleBlog.createdAt) }}</span>
						<span class="article-comment">0 Comments</span>
					</div>
					<div class="overflow-hidden form-group">
						<a href="#" class="image-popup">
							<img :src="API_URL + '/image/' + store.singleBlog.imageUrl" class="object-fill" alt="#">
						</a>
					</div>
					<div class="article-description" v-html="store.singleBlog.text"></div>
					<div class="panel panel-default related-comment">
						<div class="panel-body">
							<div class="form-group">
								<div id="comments" class="blog-comment-info">
									<h3 id="review-title">Leave your comment </h3>
									<input type="hidden" name="blog_article_reply_id" value="0" id="blog-reply-id">
									<div class="comment-left contacts-form row">
										<div class="col-md-6">
											<b>Your Name:</b>
											<br>
											<input type="text" name="name" value="" class="form-control">
											<br>
										</div>
										<div class="col-md-12">
											<b>Your Comment:</b>
											<br>
											<textarea rows="6" cols="50" name="text" class="form-control"></textarea>
											<span style="font-size: 11px;">Note: HTML is not translated!</span>
											<br>
										</div>
									</div>
									<br>
									<div class="text-left"><a id="button-comment" class="btn buttonGray"><span>Submit</span></a>
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